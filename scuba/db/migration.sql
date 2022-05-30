DROP TABLE IF EXISTS dive_number;
DROP TABLE IF EXISTS diver;

CREATE TABLE dive_number (
    number_id SERIAL PRIMARY KEY ,
    dive_num INTEGER NOT NULL,
    div_date DATE NOT NULL,
    div_location TEXT,
    city TEXT,
    us_state TEXT,
    div_buddy TEXT,
    div_activity TEXT,
    dive_tank TEXT,
    tank_air INTEGER,
    tank_starting_pressure INTEGER,
    tank_starting_volume INTEGER,
    tank_endinging_pressure INTEGER,
    tank_endinging_volume INTEGER,
    dive_weight INTEGER,
    dive_suit_type TEXT,
    dive_suit_thickness INTEGER,
    dive_hood TEXT,
    dive_gloves TEXT,
    dive_boots TEXT,
    dive_water_type TEXT,
    dive_entry TEXT,
    dive_visibilty INTEGER,
    dive_water_temperature INTEGER,
    dive_computer_used TEXT,
    div_id INTEGER
);

CREATE TABLE diver (
    div_id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30)
);


INSERT INTO diver(first_name, last_name) VALUES ('Michelle', 'Elson');

INSERT INTO dive_number(dive_num, div_date, div_location, city, us_state,
    div_buddy, div_activity, dive_tank, tank_air, tank_starting_pressure,
    tank_starting_volume, tank_endinging_pressure, tank_endinging_volume,
    dive_weight, dive_suit_type, dive_suit_thickness,
    dive_hood, dive_gloves, dive_boots, dive_water_type, dive_entry,
    dive_visibilty, dive_water_temperature, dive_computer_used,
    div_id) VALUES (1, '2009-05-28', 'Lucys Lake', 'Savannah', 'GA', 'unknown',
    '1st Cert Dive', 'Aluminum', 32, 0, 0, 0, 0, 12, 'Shorty', 5-4-3, 'No', 'No', 'Yes', 'Freshwater', 'Shore',
    15, 71, 'Yes', 1);





-- INSERT INTO dive_number(dive_num, div_date, div_location, city, us_state, div_id) VALUES (2, '2009-06-05', 'Lucys lake', 'somewhere', 'GA', 1);

-- INSERT INTO diver(first_name, last_name) VALUES ('Garrett', 'D');
-- INSERT INTO dive_number(dive_num, div_date, div_location, city, us_state, div_id) VALUES (1, '2009-06-08', 'St. Lawrence', 'Alex Bay', 'NY', 2);

-- INSERT INTO diver(first_name, last_name) VALUES ('Jay', 'R');
-- INSERT INTO dive_number(dive_num, div_date, div_location, city, us_state, div_id) VALUES (1, '2009-05-10', 'St. Lawrence', 'Ogdensburg', 'NY', 3);


