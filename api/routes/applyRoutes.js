const express = require('express');
const router = express.Router();

const ApplyService = require('../services/applyServices');

router.get('/healthcheck', (req, res) => res.send('Apply Route is Working.'));

router.post('/apply', async (req, res) => {
    try {
        const data = req.body;
        const result = await ApplyService.createApply(data);
        res.status(201).json({ message: 'Dados salvos com sucesso', id: result._id });
    } catch (err) {
        if (err.message === 'Já existe um cadastro com esse nick.') {
            res.status(409).json({ message: err.message });
        } else {
            console.error('Erro ao salvar dados:', err);
            res.status(500).json({ message: `${err}` });
        }
    }
})

router.get('/positions', async (req, res) => {
    try {
        const result = await ApplyService.getPositionsCount();
        res.json(result);
    } catch (error) {
        console.error('Erro ao obter contagem de posições:', error);
        res.status(500).json({ message: 'Erro ao obter contagem de posições' });
    }
});

router.get('/elos', async (req, res) => {
    try {
        const result = await ApplyService.getElosCount();
        res.json(result);
    } catch (error) {
        console.error('Erro ao obter contagem de elo:', error);
        res.status(500).json({ message: 'Erro ao obter contagem de elo' });
    }
});

router.get('/elos', async (req, res) => {
    try {
        const result = await ApplyService.getElosCount();
        res.json(result);
    } catch (error) {
        console.error('Erro ao obter contagem de elo:', error);
        res.status(500).json({ message: 'Erro ao obter contagem de elo' });
    }
});

router.get('/candidates', async (req, res) => {
    try {
        const { elo , position } = req.query;
        const filters = {};

        if (elo) {
            filters.elo = elo;
        }

        if (position) {
            filters.position = position;
        }

        const result = await ApplyService.getCandidatesAsync(filters);
        res.json(result);
    } catch (error) {
        console.error('Erro ao obter candidatos:', error);
        res.status(500).json({ message: 'Erro ao obter candidatos.'})
    }
})

module.exports = router;