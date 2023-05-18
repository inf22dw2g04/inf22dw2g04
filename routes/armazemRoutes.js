const express = require('express');
const armazemController = require('../controllers/armazemController');

const router = express.Router();

// Rota para criar um armazem
router.post('/armazem', armazemController.criarArmazem);

// Rota para obter todos os armazens
router.get('/armazem', armazemController.obterArmazens);

// Rota para obter um armazem específico por ID
router.get('/armazem/:id', armazemController.obterArmazemPorId);

// Rota para atualizar um armazem específico por ID
router.put('/armazem/:id', armazemController.atualizarArmazem);

// Rota para excluir um armazem específico por ID
router.delete('/armazem/:id', armazemController.excluirArmazem);

module.exports = router;
