-- The legacy client-logo record points to an unverified generic upload.
-- Keep the client record and show the neutral placeholder until staff uploads an approved logo.
update public.client_logos
set logo_url = ''
where id = 'cli-1'
  and logo_url like '%/1000045198.webp';
