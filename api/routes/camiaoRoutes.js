const express = require('express');
const camiaoController = require('../controllers/camiaoController');

const router = express.Router();

// Rota para criar um camião
router.post('/camiao', camiaoController.criarCamiao);

// Rota para obter todos os camiões
router.get('/camiao', camiaoController.obterCamioes);

// Rota para obter um camião específico por ID
router.get('/camiao/:id', camiaoController.obterCamiaoPorId);

// Rota para atualizar um camião específico por ID
router.put('/camiao/:id', camiaoController.atualizarCamiao);

// Rota para excluir um camião específico por ID
router.delete('/camiao/:id', camiaoController.excluirCamiao);

module.exports = router;
