const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 've_xe_re'
});

app.get('/api/trips', (req, res) => {
    db.query("SELECT * FROM trips", (err, results) => {
        if (err) return res.status(500).json({ status: "error", error: err.message });
        res.json({ status: "success", data: results });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend chạy tại http://localhost:${PORT}`));