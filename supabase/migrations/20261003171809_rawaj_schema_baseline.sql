-- Rawaj OS Supabase baseline.
-- Idempotent: safe to apply to an existing Rawaj database and suitable for fresh environments.

create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to anon, authenticated;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text,
  role text not null default 'customer' check (role in ('owner','admin','editor','sales','designer','customer')),
  avatar_url text,
  phone text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function private.has_any_role(allowed_roles text[])
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select (select auth.uid()) is not null
    and exists (
      select 1
      from public.profiles p
      where p.id = (select auth.uid())
        and p.is_active = true
        and p.role = any(allowed_roles)
    );
$$;
revoke all on function private.has_any_role(text[]) from public;
grant execute on function private.has_any_role(text[]) to anon, authenticated;

create or replace function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
revoke all on function private.set_updated_at() from public;

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'full_name', split_part(coalesce(new.email,''), '@', 1)),
    new.email,
    'customer'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;
revoke all on function private.handle_new_user() from public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function private.handle_new_user();

create table if not exists public.departments (
  id text primary key,
  name_ar text not null,
  name_en text not null default '',
  slug text not null unique,
  icon text not null default '',
  description_ar text not null default '',
  hero_image text not null default '',
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id text primary key,
  department_id text not null references public.departments(id) on delete cascade,
  name_ar text not null,
  name_en text not null default '',
  slug text not null,
  description_ar text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(department_id, slug)
);

create table if not exists public.subcategories (
  id text primary key,
  category_id text not null references public.categories(id) on delete cascade,
  name_ar text not null,
  name_en text not null default '',
  slug text not null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(category_id, slug)
);

create table if not exists public.industry_sectors (
  id text primary key,
  name_ar text not null,
  name_en text not null default '',
  slug text not null unique,
  icon text not null default '',
  tagline_ar text not null default '',
  description_ar text not null default '',
  hero_image text not null default '',
  color_accent text,
  service_ids text[] not null default '{}',
  package_ids text[] not null default '{}',
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.templates (
  id text primary key,
  name_ar text not null,
  name_en text not null default '',
  code text not null default '',
  description_ar text not null default '',
  department_id text references public.departments(id) on delete set null,
  specification_groups jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id text primary key,
  name_ar text not null,
  name_en text not null default '',
  slug text not null unique,
  department_id text references public.departments(id) on delete set null,
  category_id text references public.categories(id) on delete set null,
  subcategory_id text references public.subcategories(id) on delete set null,
  industry_sector_ids text[] not null default '{}',
  is_international_sourcing boolean not null default false,
  short_description_ar text not null default '',
  full_description_ar text not null default '',
  hero_image text not null default '',
  gallery jsonb not null default '[]'::jsonb,
  badge text,
  service_status text not null default 'draft' check (service_status in ('published','draft','research','ready_for_review','archived')),
  execution_model text not null default 'not_decided' check (execution_model in ('in_house','local_partner','international_sourcing','mixed','not_decided')),
  featured boolean not null default false,
  most_requested boolean not null default false,
  sort_order integer not null default 0,
  seo_title text,
  seo_description text,
  highlights jsonb not null default '[]'::jsonb,
  faq jsonb not null default '[]'::jsonb,
  prepress_rules jsonb,
  specification_groups jsonb not null default '[]'::jsonb,
  related_service_ids text[] not null default '{}',
  related_package_ids text[] not null default '{}',
  template_id text references public.templates(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.packages (
  id text primary key,
  title_ar text not null,
  title_en text not null default '',
  slug text not null unique,
  tagline_ar text not null default '',
  description_ar text not null default '',
  hero_image text not null default '',
  badge text,
  featured boolean not null default false,
  service_ids text[] not null default '{}',
  benefits_ar jsonb not null default '[]'::jsonb,
  sort_order integer not null default 0,
  sector_key text,
  target_sector_ar text,
  ideal_for_ar text,
  turnaround_time_ar text,
  items_breakdown jsonb not null default '[]'::jsonb,
  key_advantages_ar jsonb not null default '[]'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio (
  id text primary key,
  title_ar text not null,
  title_en text,
  client_type_ar text not null default '',
  industry text not null default '',
  year text not null default '',
  city text not null default '',
  short_description_ar text not null default '',
  challenge_ar text,
  solution_ar text,
  services_used_ids text[] not null default '{}',
  images jsonb not null default '[]'::jsonb,
  featured boolean not null default false,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog (
  id text primary key,
  title_ar text not null,
  slug text not null unique,
  category_ar text not null default '',
  read_time_minutes integer not null default 1 check (read_time_minutes > 0),
  publish_date date,
  hero_image text not null default '',
  excerpt_ar text not null default '',
  content_markdown_ar text not null default '',
  published boolean not null default false,
  tags_ar text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.media (
  id text primary key,
  name text not null,
  url text not null,
  storage_path text,
  size_kb integer not null default 0,
  mime_type text,
  category text not null default 'عام',
  alt_ar text,
  uploaded_by uuid references auth.users(id) on delete set null,
  uploaded_at timestamptz not null default now()
);

create table if not exists public.home_slides (
  id text primary key,
  title_ar text not null,
  subtitle_ar text not null default '',
  badge_ar text,
  image_url text not null default '',
  button_text_ar text not null default '',
  secondary_button_text_ar text,
  target_view text not null default 'services',
  secondary_target_view text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.marquee (
  id text primary key,
  text_ar text not null,
  category text not null default 'general',
  badge_ar text,
  icon text,
  link_view text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.features (
  id text primary key,
  title_ar text not null,
  description_ar text not null default '',
  icon text not null default '',
  card_type text,
  counter_value text,
  badge_ar text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.client_logos (
  id text primary key,
  name_ar text not null,
  logo_url text not null default '',
  industry_ar text,
  rating numeric(2,1) check (rating is null or (rating >= 0 and rating <= 5)),
  testimonial_snippet text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id text primary key,
  client_name_ar text not null,
  client_title_ar text not null default '',
  client_company_ar text not null default '',
  client_avatar_url text,
  comment_ar text not null,
  rating integer not null check (rating between 1 and 5),
  project_type_ar text,
  status text not null default 'pending' check (status in ('approved','pending','rejected')),
  sort_order integer not null default 0,
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.faq (
  id text primary key,
  category_ar text not null default '',
  question_ar text not null,
  answer_ar text not null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id text primary key,
  name text not null,
  email text,
  phone text not null,
  service_interest text,
  message text not null,
  status text not null default 'unread' check (status in ('unread','read','replied')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.quotes (
  id text primary key,
  reference_number text not null unique,
  customer jsonb not null,
  items jsonb not null default '[]'::jsonb,
  deadline_date date,
  general_notes text,
  status text not null default 'new' check (status in ('new','reviewing','need_more_info','pricing','sent','negotiation','won','lost','archived')),
  assigned_to uuid references public.profiles(id) on delete set null,
  internal_notes text,
  supplier_notes text,
  timeline jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.design_tasks (
  id text primary key,
  title_ar text not null,
  client_name text not null,
  client_phone text,
  quote_id text references public.quotes(id) on delete set null,
  service_id text references public.services(id) on delete set null,
  department_id text references public.departments(id) on delete set null,
  designer_id uuid references public.profiles(id) on delete set null,
  designer_name text,
  deadline date,
  priority text not null default 'normal' check (priority in ('low','normal','high','urgent')),
  status text not null default 'new' check (status in ('new','assigned','in_progress','proof_submitted','feedback_requested','approved','sent_to_print','completed')),
  description_ar text not null default '',
  dimensions_notes text,
  required_format text,
  brief_file_url text,
  proof_versions jsonb not null default '[]'::jsonb,
  comments jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_by uuid references public.profiles(id) on delete set null,
  updated_at timestamptz not null default now()
);

create table if not exists public.owner_bootstrap_tokens (
  token_hash text primary key,
  created_at timestamptz not null default now(),
  consumed_at timestamptz
);

create index if not exists idx_categories_department_sort on public.categories(department_id, sort_order);
create index if not exists idx_subcategories_category_sort on public.subcategories(category_id, sort_order);
create index if not exists idx_services_department_status_sort on public.services(department_id, service_status, sort_order);
create index if not exists idx_services_category_status_sort on public.services(category_id, service_status, sort_order);
create index if not exists idx_services_featured on public.services(featured, sort_order) where service_status = 'published';
create index if not exists idx_packages_featured_sort on public.packages(featured, sort_order);
create index if not exists idx_portfolio_featured_sort on public.portfolio(featured, sort_order);
create index if not exists idx_blog_published_date on public.blog(published, publish_date desc);
create index if not exists idx_media_category on public.media(category);
create index if not exists idx_testimonials_status_active_sort on public.testimonials(status, is_active, sort_order);
create index if not exists idx_contact_messages_status_created on public.contact_messages(status, created_at desc);
create index if not exists idx_quotes_status_created on public.quotes(status, created_at desc);
create index if not exists idx_quotes_assigned_to on public.quotes(assigned_to);
create index if not exists idx_design_tasks_status_deadline on public.design_tasks(status, deadline);
create index if not exists idx_design_tasks_designer on public.design_tasks(designer_id);
create index if not exists idx_design_tasks_department_id on public.design_tasks(department_id);
create index if not exists idx_design_tasks_quote_id on public.design_tasks(quote_id);
create index if not exists idx_design_tasks_service_id on public.design_tasks(service_id);
create index if not exists idx_media_uploaded_by on public.media(uploaded_by);
create index if not exists idx_services_subcategory_id on public.services(subcategory_id);
create index if not exists idx_services_template_id on public.services(template_id);
create index if not exists idx_settings_updated_by on public.settings(updated_by);
create index if not exists idx_templates_department_id on public.templates(department_id);

do $$
declare t text;
begin
  foreach t in array array[
    'departments','categories','subcategories','industry_sectors','templates','services','packages',
    'portfolio','blog','home_slides','marquee','features','client_logos','testimonials','faq',
    'contact_messages','quotes','design_tasks'
  ]
  loop
    execute format('drop trigger if exists %I on public.%I', t || '_set_updated_at', t);
    execute format('create trigger %I before update on public.%I for each row execute function private.set_updated_at()', t || '_set_updated_at', t);
  end loop;
end $$;

alter table public.profiles enable row level security;
alter table public.departments enable row level security;
alter table public.categories enable row level security;
alter table public.subcategories enable row level security;
alter table public.industry_sectors enable row level security;
alter table public.templates enable row level security;
alter table public.services enable row level security;
alter table public.packages enable row level security;
alter table public.portfolio enable row level security;
alter table public.blog enable row level security;
alter table public.media enable row level security;
alter table public.home_slides enable row level security;
alter table public.marquee enable row level security;
alter table public.features enable row level security;
alter table public.client_logos enable row level security;
alter table public.testimonials enable row level security;
alter table public.faq enable row level security;
alter table public.contact_messages enable row level security;
alter table public.quotes enable row level security;
alter table public.design_tasks enable row level security;
alter table public.settings enable row level security;
alter table public.owner_bootstrap_tokens enable row level security;

grant select on public.departments, public.categories, public.subcategories, public.industry_sectors, public.templates, public.services, public.packages, public.portfolio, public.blog, public.media, public.home_slides, public.marquee, public.features, public.client_logos, public.testimonials, public.faq, public.settings to anon, authenticated;
grant insert on public.testimonials, public.contact_messages, public.quotes to anon, authenticated;
grant select, insert, update, delete on all tables in schema public to authenticated;
revoke all on public.owner_bootstrap_tokens from anon, authenticated;

drop policy if exists profiles_read_self on public.profiles;
drop policy if exists profiles_staff_read on public.profiles;
drop policy if exists profiles_select on public.profiles;
drop policy if exists profiles_admin_update on public.profiles;
create policy profiles_select on public.profiles for select to authenticated
using (id = (select auth.uid()) or private.has_any_role(array['owner','admin']));
create policy profiles_admin_update on public.profiles for update to authenticated
using (private.has_any_role(array['owner','admin']))
with check (private.has_any_role(array['owner','admin']));

do $$
declare t text;
begin
  foreach t in array array['departments','categories','subcategories','industry_sectors','templates','services','packages','portfolio','blog','media','home_slides','marquee','features','client_logos','faq','settings']
  loop
    execute format('drop policy if exists %I on public.%I', t || '_staff_write', t);
    execute format('drop policy if exists %I on public.%I', t || '_staff_insert', t);
    execute format('drop policy if exists %I on public.%I', t || '_staff_update', t);
    execute format('drop policy if exists %I on public.%I', t || '_staff_delete', t);
    execute format(
      'create policy %I on public.%I for insert to authenticated with check (private.has_any_role(array[''owner'',''admin'',''editor'']))',
      t || '_staff_insert', t
    );
    execute format(
      'create policy %I on public.%I for update to authenticated using (private.has_any_role(array[''owner'',''admin'',''editor''])) with check (private.has_any_role(array[''owner'',''admin'',''editor'']))',
      t || '_staff_update', t
    );
    execute format(
      'create policy %I on public.%I for delete to authenticated using (private.has_any_role(array[''owner'',''admin'',''editor'']))',
      t || '_staff_delete', t
    );
  end loop;
end $$;

drop policy if exists departments_public_read on public.departments;
create policy departments_public_read on public.departments for select to anon, authenticated
using (is_active = true or private.has_any_role(array['owner','admin','editor']));

drop policy if exists categories_public_read on public.categories;
create policy categories_public_read on public.categories for select to anon, authenticated
using (is_active = true or private.has_any_role(array['owner','admin','editor']));

drop policy if exists subcategories_public_read on public.subcategories;
create policy subcategories_public_read on public.subcategories for select to anon, authenticated
using (is_active = true or private.has_any_role(array['owner','admin','editor']));

drop policy if exists industry_sectors_public_read on public.industry_sectors;
create policy industry_sectors_public_read on public.industry_sectors for select to anon, authenticated
using (is_active = true or private.has_any_role(array['owner','admin','editor']));

drop policy if exists templates_public_read on public.templates;
create policy templates_public_read on public.templates for select to anon, authenticated using (true);

drop policy if exists services_public_read on public.services;
create policy services_public_read on public.services for select to anon, authenticated
using (service_status = 'published' or private.has_any_role(array['owner','admin','editor','sales','designer']));

drop policy if exists packages_public_read on public.packages;
create policy packages_public_read on public.packages for select to anon, authenticated
using (is_active = true or private.has_any_role(array['owner','admin','editor']));

drop policy if exists portfolio_public_read on public.portfolio;
create policy portfolio_public_read on public.portfolio for select to anon, authenticated
using (is_active = true or private.has_any_role(array['owner','admin','editor']));

drop policy if exists blog_public_read on public.blog;
create policy blog_public_read on public.blog for select to anon, authenticated
using (published = true or private.has_any_role(array['owner','admin','editor']));

drop policy if exists media_public_read on public.media;
create policy media_public_read on public.media for select to anon, authenticated using (true);

drop policy if exists home_slides_public_read on public.home_slides;
create policy home_slides_public_read on public.home_slides for select to anon, authenticated
using (is_active = true or private.has_any_role(array['owner','admin','editor']));

drop policy if exists marquee_public_read on public.marquee;
create policy marquee_public_read on public.marquee for select to anon, authenticated
using (is_active = true or private.has_any_role(array['owner','admin','editor']));

drop policy if exists features_public_read on public.features;
create policy features_public_read on public.features for select to anon, authenticated
using (is_active = true or private.has_any_role(array['owner','admin','editor']));

drop policy if exists client_logos_public_read on public.client_logos;
create policy client_logos_public_read on public.client_logos for select to anon, authenticated
using (is_active = true or private.has_any_role(array['owner','admin','editor']));

drop policy if exists testimonials_public_read on public.testimonials;
drop policy if exists testimonials_public_insert on public.testimonials;
drop policy if exists testimonials_anon_insert on public.testimonials;
drop policy if exists testimonials_authenticated_insert on public.testimonials;
drop policy if exists testimonials_staff_write on public.testimonials;
drop policy if exists testimonials_staff_update on public.testimonials;
drop policy if exists testimonials_staff_delete on public.testimonials;
create policy testimonials_public_read on public.testimonials for select to anon, authenticated
using ((status = 'approved' and is_active = true) or private.has_any_role(array['owner','admin','editor']));
create policy testimonials_anon_insert on public.testimonials for insert to anon
with check (status = 'pending' and is_active = false);
create policy testimonials_authenticated_insert on public.testimonials for insert to authenticated
with check ((status = 'pending' and is_active = false) or private.has_any_role(array['owner','admin','editor']));
create policy testimonials_staff_update on public.testimonials for update to authenticated
using (private.has_any_role(array['owner','admin','editor']))
with check (private.has_any_role(array['owner','admin','editor']));
create policy testimonials_staff_delete on public.testimonials for delete to authenticated
using (private.has_any_role(array['owner','admin','editor']));

drop policy if exists faq_public_read on public.faq;
create policy faq_public_read on public.faq for select to anon, authenticated
using (is_active = true or private.has_any_role(array['owner','admin','editor']));

drop policy if exists contact_public_insert on public.contact_messages;
drop policy if exists contact_staff_read on public.contact_messages;
drop policy if exists contact_staff_update on public.contact_messages;
drop policy if exists contact_admin_delete on public.contact_messages;
create policy contact_public_insert on public.contact_messages for insert to anon, authenticated
with check (status = 'unread');
create policy contact_staff_read on public.contact_messages for select to authenticated
using (private.has_any_role(array['owner','admin','sales']));
create policy contact_staff_update on public.contact_messages for update to authenticated
using (private.has_any_role(array['owner','admin','sales']))
with check (private.has_any_role(array['owner','admin','sales']));
create policy contact_admin_delete on public.contact_messages for delete to authenticated
using (private.has_any_role(array['owner','admin']));

drop policy if exists quotes_public_insert on public.quotes;
drop policy if exists quotes_staff_read on public.quotes;
drop policy if exists quotes_staff_update on public.quotes;
drop policy if exists quotes_admin_delete on public.quotes;
create policy quotes_public_insert on public.quotes for insert to anon, authenticated
with check (status = 'new');
create policy quotes_staff_read on public.quotes for select to authenticated
using (private.has_any_role(array['owner','admin','sales','designer']));
create policy quotes_staff_update on public.quotes for update to authenticated
using (private.has_any_role(array['owner','admin','sales']))
with check (private.has_any_role(array['owner','admin','sales']));
create policy quotes_admin_delete on public.quotes for delete to authenticated
using (private.has_any_role(array['owner','admin']));

drop policy if exists design_tasks_staff_read on public.design_tasks;
drop policy if exists design_tasks_staff_insert on public.design_tasks;
drop policy if exists design_tasks_staff_update on public.design_tasks;
drop policy if exists design_tasks_admin_delete on public.design_tasks;
create policy design_tasks_staff_read on public.design_tasks for select to authenticated
using (private.has_any_role(array['owner','admin','sales']) or designer_id = (select auth.uid()));
create policy design_tasks_staff_insert on public.design_tasks for insert to authenticated
with check (private.has_any_role(array['owner','admin','sales']));
create policy design_tasks_staff_update on public.design_tasks for update to authenticated
using (private.has_any_role(array['owner','admin','sales']) or designer_id = (select auth.uid()))
with check (private.has_any_role(array['owner','admin','sales']) or designer_id = (select auth.uid()));
create policy design_tasks_admin_delete on public.design_tasks for delete to authenticated
using (private.has_any_role(array['owner','admin']));

drop policy if exists settings_public_read on public.settings;
create policy settings_public_read on public.settings for select to anon, authenticated using (true);

insert into storage.buckets (id, name, public)
values ('rawaj-media', 'rawaj-media', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists rawaj_media_public_read on storage.objects;
drop policy if exists rawaj_media_staff_insert on storage.objects;
drop policy if exists rawaj_media_staff_update on storage.objects;
drop policy if exists rawaj_media_staff_delete on storage.objects;

create policy rawaj_media_public_read on storage.objects
for select to anon, authenticated
using (bucket_id = 'rawaj-media');

create policy rawaj_media_staff_insert on storage.objects
for insert to authenticated
with check (bucket_id = 'rawaj-media' and private.has_any_role(array['owner','admin','editor']));

create policy rawaj_media_staff_update on storage.objects
for update to authenticated
using (bucket_id = 'rawaj-media' and private.has_any_role(array['owner','admin','editor']))
with check (bucket_id = 'rawaj-media' and private.has_any_role(array['owner','admin','editor']));

create policy rawaj_media_staff_delete on storage.objects
for delete to authenticated
using (bucket_id = 'rawaj-media' and private.has_any_role(array['owner','admin','editor']));

do $$
declare t text;
begin
  foreach t in array array[
    'departments','categories','subcategories','industry_sectors','templates','services','packages',
    'portfolio','blog','media','home_slides','marquee','features','client_logos','testimonials','faq',
    'contact_messages','quotes','design_tasks','settings'
  ]
  loop
    if not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = t
    ) then
      execute format('alter publication supabase_realtime add table public.%I', t);
    end if;
  end loop;
end $$;
