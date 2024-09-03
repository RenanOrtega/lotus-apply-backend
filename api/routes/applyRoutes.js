const express = require('express');
const router = express.Router();

const ApplyService = require('../services/applyServices');

app.get('/healthcheck', (req, res) => res.send('Apply Route is Working.'));

router.post('/form', async (req, res) => {
    try {
        const data = req.body;
        const result = await ApplyService.createApply(data);
        res.status(201).json({ message: 'Dados salvos com sucesso', id: result._id });
    } catch (err) {
        if (err.message === 'Já existe um cadastro com esse nick.') {
            res.status(409).json({ message: err.message });
        } else {
            console.error('Erro ao salvar dados:', err);
            res.status(500).json({ message: 'Erro ao salvar dados' });
        }
    }
})

router.get('/positions-count', async (req, res) => {
    try {
        const result = await ApplyService.getPositionsCount();
        res.json(result);
    } catch (error) {
        console.error('Erro ao obter contagem de posições:', error);
        res.status(500).json({ message: 'Erro ao obter contagem de posições' });
    }
});

router.get('/elo-count', async (req, res) => {
    try {
        const result = await ApplyService.getElosCount();
        res.json(result);
    } catch (error) {
        console.error('Erro ao obter contagem de elo:', error);
        res.status(500).json({ message: 'Erro ao obter contagem de elo' });
    }
});

module.exports = router;