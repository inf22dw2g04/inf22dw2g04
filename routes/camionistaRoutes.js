const express = require('express');
const camionistaController = require('../controllers/camionistaController');

const router = express.Router();

// Rota para criar um camionista
router.post('/camionista', camionistaController.criarCamionista);

// Rota para obter todos os camionistas
router.get('/camionista', camionistaController.obterCamionistas);

// Rota para obter um camionista específico por ID
router.get('/camionista/:id', camionistaController.obterCamionistaPorId);

// Rota para atualizar um camionista específico por ID
router.put('/camionista/:id', camionistaController.atualizarCamionista);

// Rota para excluir um camionista específico por ID
router.delete('/camionista/:id', camionistaController.excluirCamionista);

module.exports = router;
