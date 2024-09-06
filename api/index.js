const express = require('express');
const cors = require('cors');
const applyRoute = require('./routes/applyRoute');
require('dotenv').config();
require('./config/db');

const app = express();
app.use(cors())
app.use(express.json());
app.use('/', applyRoute);

app.get('/', (req, res) => res.send('Sai daqui seu safado 🐱‍👤.'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = app;