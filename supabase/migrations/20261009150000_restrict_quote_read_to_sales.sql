begin;

-- Quote records include private sales notes and supplier/cost information.
-- Designers work from assigned design_tasks and should not read the full sales quote table.
drop policy if exists quotes_staff_read on public.quotes;

create policy quotes_staff_read
on public.quotes
for select
to authenticated
using (private.has_any_role(array['owner', 'admin', 'sales']));

commit;
