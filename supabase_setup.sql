-- Table to log conversion events for internal analytics (optional)
-- RLS enabled by default, restricted to service role for logs

create table if not exists conversion_logs (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  status text,
  metadata jsonb
);

alter table conversion_logs enable row level security;

-- Only allow service role to read/write logs
create policy "Service role only access"
on conversion_logs
for all
using (auth.role() = 'service_role');