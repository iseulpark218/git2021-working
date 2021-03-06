create schema gagym;
set schema 'gagym';

truncate table diary restart identity;
DROP TABLE IF EXISTS diary;
select * from diary;

create table diary (
	id int8 generated by default as identity,
	diary_create_time int8 not null,
	diary_morning varchar(1000),
	diary_lunch varchar(1000),
	diary_dinner varchar(1000),
	diary_routine varchar(1000),
	diary_request varchar(1000),
	trainer_feedback varchar(1000),
	primary key (id)
);

select * from diary;