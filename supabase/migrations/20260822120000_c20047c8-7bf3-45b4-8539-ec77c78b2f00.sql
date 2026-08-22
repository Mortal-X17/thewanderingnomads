-- ============================================================================
-- Scalable company model: Hosts → Trips (journeys) → Batches → Customers
--
-- This adds the first-class "Host" entity and splits reusable Trip information
-- (public.journeys) from individual departures (public.trip_batches), with a
-- many-to-many host assignment per batch (Lead Host / Co-Host).
--
-- The existing `public.journeys` table is intentionally kept as the Trip entity
-- so no existing public page, admin screen, or RLS policy needs to be rewritten.
-- ============================================================================

-- ============ hosts ============
create table public.hosts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  photo_url text,
  short_bio text,
  bio text,
  home_location text,
  languages text[] not null default '{}',
  specializations text[] not null default '{}',
  certifications text[] not null default '{}',
  years_active integer,
  instagram_url text,
  youtube_url text,
  linkedin_url text,
  sort_order integer not null default 0,
  status public.content_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.hosts to anon;
grant select, insert, update, delete on public.hosts to authenticated;
grant all on public.hosts to service_role;
alter table public.hosts enable row level security;
create policy "hosts public read" on public.hosts for select to anon, authenticated using (status = 'published');
create policy "hosts admin write" on public.hosts for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger hosts_updated before update on public.hosts for each row execute function public.update_updated_at_column();

-- ============ trip batches (departures) ============
create table public.trip_batches (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.journeys(id) on delete cascade,
  start_date date not null,
  end_date date,
  capacity integer,
  seats_remaining integer,
  batch_type text,
  status public.content_status not null default 'draft',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.trip_batches to anon;
grant select, insert, update, delete on public.trip_batches to authenticated;
grant all on public.trip_batches to service_role;
alter table public.trip_batches enable row level security;
create policy "batches public read" on public.trip_batches for select to anon, authenticated using (status = 'published');
create policy "batches admin write" on public.trip_batches for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger trip_batches_updated before update on public.trip_batches for each row execute function public.update_updated_at_column();

-- ============ batch <-> host assignment (many-to-many) ============
create table public.trip_batch_hosts (
  id uuid primary key default gen_random_uuid(),
  batch_id uuid not null references public.trip_batches(id) on delete cascade,
  host_id uuid not null references public.hosts(id) on delete cascade,
  role text not null default 'lead' check (role in ('lead','co_host')),
  created_at timestamptz not null default now(),
  unique (batch_id, host_id, role)
);
grant select on public.trip_batch_hosts to anon;
grant select, insert, update, delete on public.trip_batch_hosts to authenticated;
grant all on public.trip_batch_hosts to service_role;
alter table public.trip_batch_hosts enable row level security;
create policy "batch hosts public read" on public.trip_batch_hosts for select to anon, authenticated using (true);
create policy "batch hosts admin write" on public.trip_batch_hosts for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- ============ seed: Krish as Host #1 ============
-- Only confirmed data is seeded. Add more hosts from the CMS as they onboard.
insert into public.hosts (slug, name, short_bio, home_location, languages, specializations, certifications, status, sort_order) values
 ('krish',
  'Krishnakant Yadav',
  'Founder of The Wandering Nomads and an expedition lead who has explored 24+ Indian states, Nepal and Bhutan.',
  'Jaipur, Rajasthan',
  '{"Hindi","English"}',
  '{"Expedition Leader","Travel Content Creator","Explorer"}',
  '{"Ethical Hacker","Cybersecurity Professional"}',
  'published',
  1);
