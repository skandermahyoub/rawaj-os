create table if not exists public.owner_bootstrap_tokens (
  token_hash text primary key,
  created_at timestamptz not null default now(),
  consumed_at timestamptz
);

alter table public.owner_bootstrap_tokens enable row level security;
