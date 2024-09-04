const mongoose = require('../config/db');

const applySchema = new mongoose.Schema({
    name: String,
    nick: String,
    position: String,
    elo: String,
    opgg: String,
    days: [String],
    hours: [String]
});

const Apply = mongoose.model('Apply', applySchema);

module.exports = Apply;