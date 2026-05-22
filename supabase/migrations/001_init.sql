-- PeptideLog database schema

-- Counter table (single row)
create table if not exists calc_counter (
  id         int primary key default 1,
  count      bigint not null default 0,
  updated_at timestamptz not null default now()
);

insert into calc_counter (id, count) values (1, 0) on conflict do nothing;

-- Increment function
create or replace function increment_calc_counter()
returns bigint
language plpgsql
as $$
declare v_count bigint;
begin
  update calc_counter set count = count + 1, updated_at = now() where id = 1
  returning count into v_count;
  return v_count;
end;
$$;

-- Cycle logs table
create table if not exists cycle_logs (
  id              uuid primary key default gen_random_uuid(),
  session_id      text not null,
  peptides        jsonb not null,
  side_effects    text[] not null default '{}',
  pain_level      smallint,
  energy_level    smallint,
  weight          numeric(5,1),
  notes           text default '',
  log_date        date not null default current_date,
  created_at      timestamptz not null default now()
);

create index if not exists cycle_logs_session_idx on cycle_logs (session_id);
create index if not exists cycle_logs_date_idx on cycle_logs (log_date);

-- Aggregate function for "Am I Normal?"
create or replace function get_side_effect_aggregate(
  p_peptide_id text,
  p_week_number int default null
)
returns table (
  side_effect text,
  total_reports bigint,
  total_users bigint,
  percentage numeric(5,2)
)
language sql stable
as $$
  with matching_logs as (
    select cl.session_id, unnest(cl.side_effects) as se
    from cycle_logs cl
    where cl.peptides @> ('[{"peptideId":"' || p_peptide_id || '"}]')::jsonb
  ),
  user_count as (
    select count(distinct session_id) as cnt
    from cycle_logs
    where peptides @> ('[{"peptideId":"' || p_peptide_id || '"}]')::jsonb
  )
  select
    ml.se as side_effect,
    count(*) as total_reports,
    count(distinct ml.session_id) as total_users,
    round(count(distinct ml.session_id)::numeric / nullif((select cnt from user_count), 0) * 100, 2) as percentage
  from matching_logs ml
  group by ml.se
  order by total_reports desc;
$$;

-- RLS policies
alter table calc_counter enable row level security;
alter table cycle_logs enable row level security;

-- Allow anon to read counter
create policy "Anyone can read counter"
  on calc_counter for select
  using (true);

-- Allow anon to insert cycle logs
create policy "Anyone can insert logs"
  on cycle_logs for insert
  with check (true);

-- Allow anon to read cycle logs (for aggregates)
create policy "Anyone can read logs"
  on cycle_logs for select
  using (true);
