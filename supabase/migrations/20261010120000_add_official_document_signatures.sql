begin;

create table if not exists public.document_signatures (
  id uuid primary key default gen_random_uuid(),
  document_type text not null check (document_type in ('quote','invoice')),
  quote_id uuid references public.commercial_quotes(id) on delete restrict,
  invoice_id uuid references public.invoices(id) on delete restrict,
  signer_name text not null check (length(btrim(signer_name)) > 0),
  signer_title text not null check (length(btrim(signer_title)) > 0),
  signer_party text not null check (signer_party in ('customer','rawaj')),
  signature_data_url text not null check (signature_data_url like 'data:image/png;base64,%'),
  document_snapshot jsonb not null,
  signed_by uuid references auth.users(id) on delete set null default auth.uid(),
  signed_at timestamptz not null default now(),
  constraint document_signatures_document_match check (
    (document_type = 'quote' and quote_id is not null and invoice_id is null)
    or (document_type = 'invoice' and invoice_id is not null and quote_id is null)
  )
);

create index if not exists document_signatures_quote_signed_idx
  on public.document_signatures(quote_id, signed_at desc) where quote_id is not null;
create index if not exists document_signatures_invoice_signed_idx
  on public.document_signatures(invoice_id, signed_at desc) where invoice_id is not null;

alter table public.document_signatures enable row level security;

drop policy if exists document_signatures_staff_read on public.document_signatures;
create policy document_signatures_staff_read on public.document_signatures
  for select to authenticated
  using (private.has_any_role(array['owner','admin','sales']));

drop policy if exists document_signatures_staff_insert on public.document_signatures;
create policy document_signatures_staff_insert on public.document_signatures
  for insert to authenticated
  with check (
    private.has_any_role(array['owner','admin','sales'])
    and signed_by = auth.uid()
  );

drop policy if exists document_signatures_immutable on public.document_signatures;
create policy document_signatures_immutable on public.document_signatures
  for update to authenticated using (false) with check (false);

drop policy if exists document_signatures_no_delete on public.document_signatures;
create policy document_signatures_no_delete on public.document_signatures
  for delete to authenticated using (false);

commit;
