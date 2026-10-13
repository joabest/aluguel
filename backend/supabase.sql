-- Auto Rental backend schema for Supabase/Postgres
-- Apply this in the Supabase SQL editor when the project is connected.

create extension if not exists pgcrypto;

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text unique,
  phone text,
  document text,
  status text not null default 'active' check (status in ('active','inactive','blocked')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  plate text unique not null,
  daily_rate numeric(12,2) not null default 0,
  status text not null default 'available' check (status in ('available','rented','maintenance','inactive')),
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete restrict,
  vehicle_id uuid not null references public.vehicles(id) on delete restrict,
  start_date date not null,
  end_date date not null,
  daily_rate numeric(12,2) not null,
  total numeric(12,2) not null,
  status text not null default 'pending' check (status in ('pending','confirmed','active','completed','cancelled')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_date >= start_date)
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  reservation_id uuid references public.reservations(id) on delete cascade,
  amount numeric(12,2) not null,
  method text not null check (method in ('pix','card','cash','transfer','other')),
  status text not null default 'pending' check (status in ('pending','paid','refunded','failed')),
  reference text,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists reservations_customer_idx on public.reservations(customer_id);
create index if not exists reservations_vehicle_idx on public.reservations(vehicle_id);
create index if not exists reservations_period_idx on public.reservations(start_date,end_date);
create index if not exists reservations_status_idx on public.reservations(status);
create index if not exists payments_reservation_idx on public.payments(reservation_id);
create index if not exists payments_status_idx on public.payments(status);

alter table public.customers enable row level security;
alter table public.vehicles enable row level security;
alter table public.reservations enable row level security;
alter table public.payments enable row level security;

-- Security intentionally starts locked down.
-- When admin authentication is added, create policies for authenticated admins only.
-- Do NOT add anonymous write policies on a public production site.
