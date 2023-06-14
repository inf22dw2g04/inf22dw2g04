const Rota = require('../models/rota');

// Função para criar uma rota
const criarRota = async (req, res) => {
  try {
    const { pontoPartida, pontoChegada } = req.body;
    const rota = await Rota.create({ pontoPartida, pontoChegada });
    res.status(201).json(rota);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar a rota' });
  }
};

// Função para obter todas as rotas
const obterRotas = async (req, res) => {
  try {
    const rotas = await Rota.findAll();
    res.json(rotas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter as rotas' });
  }
};

// Função para obter uma rota pelo ID
const obterRotaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const rota = await Rota.findByPk(id);
    
    if (rota) {
      res.json(rota);
    } else {
      res.status(404).json({ error: 'Rota não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter a rota' });
  }
};

// Função para atualizar uma rota pelo ID
const atualizarRota = async (req, res) => {
  try {
    const { id } = req.params;
    const { pontoPartida, pontoChegada } = req.body;
    
    const rota = await Rota.findByPk(id);
    
    if (rota) {
      rota.pontoPartida = pontoPartida;
      rota.pontoChegada = pontoChegada;
      await rota.save();
      res.json(rota);
    } else {
      res.status(404).json({ error: 'Rota não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar a rota' });
  }
};

// Função para excluir uma rota pelo ID
const excluirRota = async (req, res) => {
  try {
    const { id } = req.params;
    
    const rota = await Rota.findByPk(id);
    
    if (rota) {
      await rota.destroy();
      res.json({ message: 'Rota excluída com sucesso' });
    } else {
      res.status(404).json({ error: 'Rota não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir a rota' });
  }
};

module.exports = {
  criarRota,
  obterRotas,
  obterRotaPorId,
  atualizarRota,
  excluirRota
};
