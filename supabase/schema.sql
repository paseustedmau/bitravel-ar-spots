-- ============================================================
-- Bitravel AR Spots — Supabase Schema
-- Run this in the Supabase SQL Editor
-- ============================================================

-- ── 1. AR Events table (analytics persistence) ───────────────
create table if not exists public.ar_events (
  id           uuid default gen_random_uuid() primary key,
  event        text not null,
  experience_slug text not null,
  spot_id      text,
  zone         text,
  language     text default 'es',
  device_os    text,
  device_type  text,
  campaign     text,
  created_at   timestamptz default now()
);

-- Index for common queries
create index if not exists ar_events_slug_idx  on ar_events (experience_slug);
create index if not exists ar_events_spot_idx  on ar_events (spot_id);
create index if not exists ar_events_event_idx on ar_events (event);
create index if not exists ar_events_date_idx  on ar_events (created_at desc);

-- Allow anonymous inserts (analytics only — no personal data)
alter table ar_events enable row level security;
create policy "Allow anon insert on ar_events"
  on ar_events for insert
  to anon
  with check (true);

-- ── 2. AR Experiences table (backoffice-ready from day 1) ────
create table if not exists public.ar_experiences (
  id             uuid default gen_random_uuid() primary key,
  slug           text unique not null,
  status         text default 'draft' check (status in ('active', 'inactive', 'draft')),
  title_es       text not null,
  title_en       text,
  description_es text,
  description_en text,
  instruction_es text,
  instruction_en text,
  model_glb_url  text not null,
  model_usdz_url text,
  poster_url     text not null,
  cta_label_es   text,
  cta_label_en   text,
  cta_url        text,
  cta_type       text default 'guide' check (cta_type in ('guide','marketplace','sponsor','external')),
  sponsor_name   text,
  sponsor_logo_url text,
  sponsor_url    text,
  tags           text[] default '{}',
  zone           text,
  sort_order     integer default 0,
  created_at     timestamptz default now(),
  updated_at     timestamptz default now()
);

-- RLS: public can read active experiences; only auth can write
alter table ar_experiences enable row level security;
create policy "Public read active experiences"
  on ar_experiences for select
  to anon
  using (status = 'active');

create policy "Auth full access to experiences"
  on ar_experiences for all
  to authenticated
  using (true)
  with check (true);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger ar_experiences_updated_at
  before update on ar_experiences
  for each row execute function update_updated_at();

-- ── 3. AR Spots table (physical totem tracking) ──────────────
create table if not exists public.ar_spots (
  id               uuid default gen_random_uuid() primary key,
  spot_id          text unique not null,  -- e.g. 'malecon-01'
  name             text not null,
  zone             text,
  location_notes   text,
  experience_slug  text references ar_experiences(slug) on delete set null,
  is_active        boolean default true,
  created_at       timestamptz default now()
);

alter table ar_spots enable row level security;
create policy "Public read active spots"
  on ar_spots for select
  to anon
  using (is_active = true);
create policy "Auth full access to spots"
  on ar_spots for all
  to authenticated
  using (true)
  with check (true);

-- ── 4. Seed: initial whale experience ────────────────────────
insert into ar_experiences (
  slug, status,
  title_es, title_en,
  description_es, description_en,
  instruction_es, instruction_en,
  model_glb_url, model_usdz_url, poster_url,
  cta_label_es, cta_label_en, cta_url, cta_type,
  tags, zone
) values (
  'ballena', 'active',
  'Ballena Jorobada', 'Humpback Whale',
  'Explora una ballena jorobada en realidad aumentada y descubre una de las experiencias naturales más emblemáticas de Puerto Vallarta.',
  'Explore a humpback whale in augmented reality and discover one of Puerto Vallarta''s most iconic natural experiences.',
  'Apunta tu cámara hacia una superficie plana y mueve lentamente tu teléfono.',
  'Point your camera at a flat surface and slowly move your phone.',
  '/models/whale.glb', '/models/whale.usdz', '/posters/whale.webp',
  'Explorar tours de avistamiento', 'Explore whale watching tours',
  'https://bitravel.app/experiencias/avistamiento-ballenas', 'marketplace',
  ARRAY['naturaleza','ballena','puerto-vallarta','avistamiento'],
  'malecon'
) on conflict (slug) do nothing;
