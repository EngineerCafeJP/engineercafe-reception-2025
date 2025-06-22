CREATE TABLE IF NOT EXISTS admin_users (
  id uuid primary key references auth.users(id),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
