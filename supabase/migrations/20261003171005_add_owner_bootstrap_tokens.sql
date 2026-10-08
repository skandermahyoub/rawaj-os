-- Create the one-time owner bootstrap token store before the full Rawaj schema baseline.
-- The baseline also keeps this table idempotently for fresh and existing environments.

create table if not exists public.owner_bootstrap_tokens (
  token_hash text primary key,
  created_at timestamptz not null default now(),
  consumed_at timestamptz
);
