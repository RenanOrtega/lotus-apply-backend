const express = require('express');
const cors = require('cors');
const applyRoutes = require('./routes/applyRoutes');
require('dotenv').config();
require('./config/db');

const app = express();

app.use(cors())
app.use(express.json());
app.use('/', applyRoutes);

app.get('/', (req, res) => res.send('Working.'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = app;