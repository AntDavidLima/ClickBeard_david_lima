create table users (
	id uuid primary key,
	name text not null,
	email text not null unique,
	password text not null,
	admin boolean default false
);