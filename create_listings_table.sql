-- Create the listings table
create table listings (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  description text,
  price decimal not null,
  location text not null,
  images text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table listings enable row level security;

-- Create policies
create policy "Listings are viewable by everyone"
  on listings for select
  using ( true );

create policy "Users can create their own listings"
  on listings for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own listings"
  on listings for update
  using ( auth.uid() = user_id );

create policy "Users can delete their own listings"
  on listings for delete
  using ( auth.uid() = user_id );
