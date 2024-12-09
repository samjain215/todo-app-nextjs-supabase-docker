-- Create users table
create table public.users (
  user_id text not null,
  username character varying(50) not null,
  email character varying(100) not null,
  created_at timestamp without time zone default now(),
  updated_at timestamp without time zone default now(),
  password text,
  description text,
  status text,
  constraint users_pkey primary key (user_id),
  constraint users_email_key unique (email),
  constraint users_username_key unique (username)
);

-- Create categories table
create table public.categories (
  category_id serial primary key,
  name text not null unique,
  created_at timestamp without time zone default now(),
  updated_at timestamp without time zone default now()
);

-- Create permissions table
create table public.permissions (
  permission_id serial primary key,
  name character varying(50) not null unique,
  description text
);

-- Create priorities table
create table public.priorities (
  priority_id serial primary key,
  name character varying(50) not null unique,
  level integer not null,
  created_at timestamp without time zone default now(),
  updated_at timestamp without time zone default now()
);

-- Create tasks table
create table public.tasks (
  task_id serial primary key,
  user_id text not null,
  title character varying(255) not null,
  description text,
  category_id integer references public.categories (category_id) on delete set null,
  priority_id integer references public.priorities (priority_id) on delete set null,
  due_date date,
  status text default 'Pending' check (status in ('Pending', 'In Progress', 'Completed')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone,
  completed boolean not null default false,
  constraint tasks_user_id_fkey foreign key (user_id) references public.users (user_id)
);

-- Create reminders table
create table public.reminders (
  reminder_id serial primary key,
  task_id integer not null references public.tasks (task_id) on delete cascade,
  reminder_date timestamp without time zone not null,
  notification_method text default 'Push Notification' check (notification_method in ('Email', 'SMS', 'Push Notification')),
  created_at timestamp without time zone default now(),
  updated_at timestamp without time zone default now()
);

-- Create task_collaborators table
create table public.task_collaborators (
  task_id integer not null references public.tasks (task_id) on delete cascade,
  collaborator_id text not null references public.users (user_id),
  permission_id integer not null references public.permissions (permission_id) on delete cascade,
  added_at timestamp without time zone default now(),
  constraint task_collaborators_pkey primary key (task_id, collaborator_id)
);
