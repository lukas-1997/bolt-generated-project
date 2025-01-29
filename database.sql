-- Create tables for the rental platform
create table profiles (
  id uuid references auth.users on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

create table listings (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  price decimal not null,
  location_lat decimal not null,
  location_lng decimal not null,
  location_name text not null,
  host_id uuid references auth.users not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table messages (
  id uuid default uuid_generate_v4() primary key,
  listing_id uuid references listings not null,
  sender_id uuid references auth.users not null,
  receiver_id uuid references auth.users not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table profiles enable row level security;
alter table listings enable row level security;
alter table messages enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using ( true );

create policy "Users can insert their own profile"
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );

create policy "Anyone can view listings"
  on listings for select
  using ( true );

create policy "Authenticated users can create listings"
  on listings for insert
  with check ( auth.role() = 'authenticated' );

create policy "Users can update own listings"
  on listings for update
  using ( auth.uid() = host_id );

create policy "Users can delete own listings"
  on listings for delete
  using ( auth.uid() = host_id );

create policy "Users can view their messages"
  on messages for select
  using ( auth.uid() = sender_id or auth.uid() = receiver_id );

create policy "Authenticated users can send messages"
  on messages for insert
  with check ( auth.role() = 'authenticated' );
