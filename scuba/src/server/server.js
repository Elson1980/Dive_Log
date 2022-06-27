require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const parser = require('body-parser');
const { Pool } = require('pg')

app.use(cors());
app.use(express.static('../../public'));
app.use(parser.json());

const pool = new Pool ({
    // database: "scuba-log",
    connectionString: process.env.URI,
    ssl: {
        rejectUnauthorized: false
    }
})


app.get("/divelist/:id?", cors(), async (req, res) => {
    const { id } = req.params;
    try {
        if (id !== undefined) {
            let diveList = await pool.query("SELECT * FROM dive_number WHERE id = $1", [id]);
            res.json(diveList.rows);
        } else {
            let allDives = await pool.query("SELECT * FROM dive_number");
            res.json(allDives.rows)
        }
    } catch (err) {
        console.log(err.message)
    }
})

app.post("/divelist/dive_num", cors(), async (req, res) => {
    const { dive_num, div_date, div_location, city, us_state, div_buddy, div_activity,
    dive_tank, tank_air, tank_starting_pressure, tank_starting_volume, tank_endinging_pressure,
    tank_endinging_volume, dive_weight, dive_suit_type, dive_suit_thickness, dive_hood, dive_gloves,
    dive_boots, dive_water_type, dive_entry, dive_visibilty, dive_water_temperature, dive_computer_used, div_id } = req.body;
    try {
            let diveList = await pool.query("INSERT INTO dive_number(dive_num, div_date, div_location, city, us_state, div_buddy, div_activity, dive_tank, tank_air, tank_starting_pressure, tank_starting_volume, tank_endinging_pressure, tank_endinging_volume, dive_weight, dive_suit_type, dive_suit_thickness, dive_hood, dive_gloves, dive_boots, dive_water_type, dive_entry, dive_visibilty, dive_water_temperature, dive_computer_used, div_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25) RETURNING *", [dive_num, div_date, div_location, city, us_state, div_buddy, div_activity, dive_tank, tank_air, tank_starting_pressure, tank_starting_volume, tank_endinging_pressure, tank_endinging_volume, dive_weight, dive_suit_type, dive_suit_thickness, dive_hood, dive_gloves, dive_boots, dive_water_type, dive_entry, dive_visibilty, dive_water_temperature, dive_computer_used, div_id])
            res.json(diveList.rows);
       
    } catch (err) {
        console.log(err.message)
    }
})

app.listen(process.env.SERVER || 4000, () => console.log(`Listening on port ${process.env.SERVER || 4000}!`));