const express = require('express');
const cors = require('cors');
const db = require('./config.js');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/trips', (req, res) => {
    db.query("SELECT * FROM trips", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ status: "success", data: results });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));