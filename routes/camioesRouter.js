const express = require('express');
const router = express.Router();
const camiaoController = require('../controllers/camiaoController');

// Rota para obter todos os camiões
router.get('/camioes', camiaoController.getAllCamioes);

// Rota para criar um novo camião
router.post('/camioes', camiaoController.createCamiao);

// Rota para obter um camião pelo ID
router.get('/camioes/:id', camiaoController.getCamiaoById);

// Rota para atualizar um camião pelo ID
router.put('/camioes/:id', camiaoController.updateCamiao);

// Rota para excluir um camião pelo ID
router.delete('/camioes/:id', camiaoController.deleteCamiao);

module.exports = router;

