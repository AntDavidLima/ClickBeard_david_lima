create table specializations (
	barber_id uuid references barbers (id) on update cascade on delete cascade,
	speciality_id uuid references specialities (id) on update cascade on delete cascade,
	constraint specialization_pkey primary key (barber_id, speciality_id)
);