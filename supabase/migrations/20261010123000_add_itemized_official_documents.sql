begin;

alter table public.invoices
  add column if not exists line_items jsonb not null default '[]'::jsonb,
  add column if not exists terms text;

alter table public.commercial_quotes
  add column if not exists document_notes text;

grant select, insert on public.document_signatures to authenticated;

commit;
