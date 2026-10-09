\set ON_ERROR_STOP on
begin;
insert into public.customers (name, phone) values ('CI customer', 'ci-rawaj-001');
insert into public.operational_projects (customer_id, title, estimated_total)
select id, 'CI project', 100 from public.customers where phone = 'ci-rawaj-001';
insert into public.project_costs (project_id, description, quantity, unit_cost)
select id, 'CI material', 2, 5 from public.operational_projects where title = 'CI project';
do $$
begin
  if (select actual_cost from public.operational_projects where title = 'CI project') <> 10 then
    raise exception 'Project cost trigger did not recalculate the project total.';
  end if;
end $$;

insert into public.inventory_items (sku, name, quantity, average_unit_cost)
values ('CI-RAW-001', 'CI stock item', 0, 0);
insert into public.inventory_movements (inventory_item_id, movement_type, quantity, unit_cost)
select id, 'receipt', 10, 3 from public.inventory_items where sku = 'CI-RAW-001';
insert into public.inventory_movements (inventory_item_id, movement_type, quantity, unit_cost)
select id, 'issue', 2, 3 from public.inventory_items where sku = 'CI-RAW-001';
do $$
begin
  if (select quantity from public.inventory_items where sku = 'CI-RAW-001') <> 8 then
    raise exception 'Inventory movement trigger did not update the stock balance.';
  end if;
  if (select average_unit_cost from public.inventory_items where sku = 'CI-RAW-001') <> 3 then
    raise exception 'Inventory receipt did not update the weighted average unit cost.';
  end if;
end $$;

insert into public.invoices (customer_id, subtotal)
select id, 100 from public.customers where phone = 'ci-rawaj-001';
insert into public.payments (invoice_id, amount)
select id, 30 from public.invoices where customer_id = (select id from public.customers where phone = 'ci-rawaj-001');
do $$
begin
  if (select status from public.invoices where customer_id = (select id from public.customers where phone = 'ci-rawaj-001')) <> 'partially_paid' then
    raise exception 'Invoice status trigger did not mark partial payment.';
  end if;
end $$;
insert into public.payments (invoice_id, amount)
select id, 70 from public.invoices where customer_id = (select id from public.customers where phone = 'ci-rawaj-001');
do $$
begin
  if (select status from public.invoices where customer_id = (select id from public.customers where phone = 'ci-rawaj-001')) <> 'paid' then
    raise exception 'Invoice status trigger did not mark full payment.';
  end if;
  if not exists (select 1 from public.audit_events where entity_table = 'customers' and action = 'INSERT') then
    raise exception 'Audit trigger did not record the customer insert.';
  end if;
end $$;
rollback;
