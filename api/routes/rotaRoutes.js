const express = require('express');
const rotaController = require('../controllers/rotaController');

const router = express.Router();

// Rota para criar um camião
router.post('/rota', rotaController.criarRota);

// Rota para obter todos os camiões
router.get('/rota', rotaController.obterRotas);

// Rota para obter um camião específico por ID
router.get('/rota/:id', rotaController.obterRotaPorId);

// Rota para atualizar um camião específico por ID
router.put('/rota/:id', rotaController.atualizarRota);

// Rota para excluir um camião específico por ID
router.delete('/rota/:id', rotaController.excluirRota);

module.exports = router;
