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

// app.post("/divelist/dive_num", cors(), async (req, res) => {
//     const { id } = req.params;
//     try {
//         if (id !== undefined) {
//             let diveList = await pool.query("SELECT * FROM dive_number WHERE id = $1", [id]);
//             res.json(diveList.rows);
//         } else {
//             let allDives = await pool.query("SELECT * FROM dive_number");
//             res.json(allDives.rows)
//         }
//     } catch (err) {
//         console.log(err.message)
//     }
// })

app.listen(process.env.SERVER || 4000, () => console.log(`Listening on port ${process.env.SERVER || 4000}!`));