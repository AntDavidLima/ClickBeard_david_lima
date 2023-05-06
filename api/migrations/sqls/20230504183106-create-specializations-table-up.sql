create table specializations (
	barber_id uuid references barbers (id) on update cascade on delete cascade,
	specialty_id uuid references specialties (id) on update cascade on delete cascade,
	constraint specialization_pkey primary key (barber_id, specialty_id)
);