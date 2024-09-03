const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI || 'mongodb+srv://renanortegadev:cJ04gyxeCY0fHWM8@lotus-apply.g4raz.mongodb.net/?retryWrites=true&w=majority&appName=lotus-apply';

mongoose.connect(uri);

mongoose.connection.on('connected', () => {
    console.log('Conectado ao MongoDB com sucesso!');
});

mongoose.connection.on('error', (err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
});

module.exports = mongoose;