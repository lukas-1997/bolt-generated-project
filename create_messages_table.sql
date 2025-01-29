-- Create messages table
create table messages (
  id uuid default uuid_generate_v4() primary key,
  listing_id uuid references listings not null,
  sender_id uuid references auth.users not null,
  receiver_id uuid references auth.users not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table messages enable row level security;

-- Create policies
create policy "Users can see their own messages"
  on messages for select
  using (
    auth.uid() = sender_id or
    auth.uid() = receiver_id
  );

create policy "Users can send messages"
  on messages for insert
  with check (auth.uid() = sender_id);

-- Add latitude and longitude to listings table
alter table listings
add column latitude decimal,
add column longitude decimal;
