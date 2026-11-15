-- Dhanraj Granite — Supabase schema
-- Paste this whole file into Supabase → SQL Editor → New query, and press Run.
-- Safe to run more than once.

create extension if not exists pgcrypto;

-- ------------------------------------------------------------------ tables

-- Every catalogue item (products, gallery, testimonials, …) lives here.
-- `collection` says which list it belongs to; `data` holds its fields, so new
-- fields can be added from the admin code without changing the database.
create table if not exists public.content (
  id          uuid primary key default gen_random_uuid(),
  collection  text not null check (collection in
                ('products','capabilities','gallery','milestones','testimonials','outlets','resources')),
  data        jsonb not null default '{}'::jsonb,
  sort        integer not null default 100,
  visible     boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists content_collection_sort on public.content (collection, sort);

-- Site-wide text and contact details (a single row).
create table if not exists public.settings (
  id          integer primary key default 1 check (id = 1),
  data        jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now()
);

-- Quote requests from the Contact page.
create table if not exists public.inquiries (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  status        text not null default 'new' check (status in ('new','contacted','quoted','closed')),
  name          text not null check (char_length(name) between 1 and 120),
  phone         text not null check (char_length(phone) between 5 and 30),
  email         text check (char_length(email) <= 160),
  product       text check (char_length(product) <= 160),
  project_type  text check (char_length(project_type) <= 80),
  finish        text check (char_length(finish) <= 80),
  sqft          text check (char_length(sqft) <= 20),
  quantity      text check (char_length(quantity) <= 20),
  location      text check (char_length(location) <= 120),
  message       text check (char_length(message) <= 2000)
);

-- Who may edit the site. Add your login email here (see README).
create table if not exists public.admins (
  email text primary key
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;
grant execute on function public.is_admin() to anon, authenticated;

-- ---------------------------------------------------------- row security

alter table public.content   enable row level security;
alter table public.settings  enable row level security;
alter table public.inquiries enable row level security;
alter table public.admins    enable row level security;

drop policy if exists "content: public reads visible" on public.content;
create policy "content: public reads visible" on public.content
  for select using (visible or public.is_admin());

drop policy if exists "content: admins write" on public.content;
create policy "content: admins write" on public.content
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "settings: public reads" on public.settings;
create policy "settings: public reads" on public.settings
  for select using (true);

drop policy if exists "settings: admins write" on public.settings;
create policy "settings: admins write" on public.settings
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Visitors can send an inquiry but can never read, change or delete any.
drop policy if exists "inquiries: anyone submits" on public.inquiries;
create policy "inquiries: anyone submits" on public.inquiries
  for insert to anon, authenticated with check (status = 'new');

drop policy if exists "inquiries: admins manage" on public.inquiries;
create policy "inquiries: admins manage" on public.inquiries
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins: admins read" on public.admins;
create policy "admins: admins read" on public.admins
  for select to authenticated using (public.is_admin());

-- -------------------------------------------------------- image storage

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 10485760, array['image/jpeg','image/png','image/webp','image/gif','image/svg+xml'])
on conflict (id) do update set public = true;

drop policy if exists "media: public read" on storage.objects;
create policy "media: public read" on storage.objects
  for select using (bucket_id = 'media');

drop policy if exists "media: admins upload" on storage.objects;
create policy "media: admins upload" on storage.objects
  for insert to authenticated with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "media: admins change" on storage.objects;
create policy "media: admins change" on storage.objects
  for update to authenticated using (bucket_id = 'media' and public.is_admin());

drop policy if exists "media: admins delete" on storage.objects;
create policy "media: admins delete" on storage.objects
  for delete to authenticated using (bucket_id = 'media' and public.is_admin());

-- ---------------------------------------------- live updates on the site

do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    begin alter publication supabase_realtime add table public.content;  exception when duplicate_object then null; end;
    begin alter publication supabase_realtime add table public.settings; exception when duplicate_object then null; end;
  end if;
end $$;

-- ------------------------------------------------------------ last step
-- After creating your user in Authentication → Users, run (with your email):
--   insert into public.admins (email) values ('you@example.com');
