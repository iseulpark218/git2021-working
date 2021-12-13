create schema myworkspace;
set schema 'myworkspace';

truncate table gymdetail restart identity cascade;
truncate table gym;

select * from gym order by id desc;
select * from gym;

DROP TABLE IF EXISTS gym;

CREATE TABLE gym (
		id int4 NOT NULL,
		gym_name varchar(255) NULL,
		gym_co_num varchar(255) NULL,
		gym_locate_si varchar(255) NULL,
		gym_locate_gun_gu varchar(255) NULL,
		gym_address varchar(255) NULL,
		gym_phone_num varchar(255) NULL,
		gym_time varchar(255) NULL,
		gym_service varchar(255) NULL,
		gym1day_price varchar(255) NULL,
		gym3day_price varchar(255) NULL,
		gym7day_price varchar(255) NULL,
		gym_month_price varchar(255) NULL,
		gym3month_price varchar(255) NULL,
		gym6month_price varchar(255) NULL,
		gym_year_price varchar(255) NULL
		--	CONSTRAINT list_pkey PRIMARY KEY (id)
		);