const Apply = require('../models/apply');

class ApplyService {
    static async createApply(data) {
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
}

module.exports = ApplyService;