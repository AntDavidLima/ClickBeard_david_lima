create table appointments (
	id uuid primary key,
	appointment_time timestamp not null,
	client_id uuid references users (id) on update cascade on delete cascade,
	specialty_id uuid references specialties (id) on update cascade on delete cascade,
	barber_id uuid references barbers (id) on update cascade on delete cascade
);