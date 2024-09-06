const eloMap = require('../mappings/apply/eloMap');
const positionMap = require('../mappings/apply/positionMap');
const Apply = require('../models/apply');

class ApplyService {
    static formatCandidate(candidate) {
        return {
            ...candidate._doc,
            elo: eloMap[candidate.elo] || candidate.elo,
            position: positionMap[candidate.position] || candidate.position,
        };
    }

    static validateFields(data, fields) {
        for (const field of fields) {
            if (!data[field] || data[field].trim() === "") {
                throw new Error(`O campo ${field} não pode estar vazio.`);
            }
        }
    }

    static async createApply(data) {
        const requiredFields = ['name', 'nick', 'discord', 'position', 'elo', 'opgg'];
        this.validateFields(data, requiredFields);

        const existingApply = await Apply.findOne({ nick: data.nick });
        if (existingApply){
            throw new Error('Já existe um cadastro com esse nick.');
        }

        const newApply = new Apply(data);
        return await newApply.save();
    }

    static async getPositionsCount(){
        const counts = await Apply.aggregate([
            { $group: { _id: "$position", count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);

        return counts.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc;
        }, {});
    }

    static async getElosCount(){
        const counts = await Apply.aggregate([
            { $group: { _id: "$elo", count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);

        return counts.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc;
        }, {});
    }

    static async getCandidatesAsync(filters, page = 1, limit = 10){
        const skip = (page - 1) * limit;

        const candidates = await Apply.find(filters, '-_id -__v')
            .skip(skip)
            .limit(limit);

        return candidates.map(candidate => this.formatCandidate(candidate));
    }
}

module.exports = ApplyService;