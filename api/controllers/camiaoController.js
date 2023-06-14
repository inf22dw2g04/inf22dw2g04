const Camiao = require('../models/camiao');

// Função para criar um camião
async function criarCamiao(req, res) {
  try {
    const { marca, matricula, idCamionista, idRota } = req.body;
    const camiao = await Camiao.create({ marca, matricula, idCamionista, idRota });
    res.status(201).json(camiao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar camião.' });
  }
}

// Função para obter todos os camiões
async function obterCamioes(req, res) {
  try {
    const camioes = await Camiao.findAll();
    res.json(camioes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter camiões.' });
  }
}

// Função para obter um camião específico por ID
async function obterCamiaoPorId(req, res) {
  const camiaoId = req.params.id;
  try {
    const camiao = await Camiao.findByPk(camiaoId);
    if (!camiao) {
      return res.status(404).json({ message: 'Camião não encontrado.' });
    }
    res.json(camiao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter camião.' });
  }
}

// Função para atualizar um camião específico por ID
async function atualizarCamiao(req, res) {
  const camiaoId = req.params.id;
  const { marca, matricula, idCamionista, idRota } = req.body;
  try {
    const camiao = await Camiao.findByPk(camiaoId);
    if (!camiao) {
      return res.status(404).json({ message: 'Camião não encontrado.' });
    }
    camiao.marca = marca;
    camiao.matricula = matricula;
    camiao.idCamionista = idCamionista;
    camiao.idRota = idRota;
    await camiao.save();
    res.json(camiao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar camião.' });
  }
}

// Função para excluir um camião específico por ID
async function excluirCamiao(req, res) {
  const camiaoId = req.params.id;
  try {
    const camiao = await Camiao.findByPk(camiaoId);
    if (!camiao) {
      return res.status(404).json({ message: 'Camião não encontrado.' });
    }
    await camiao.destroy();
    res.json({ message: 'Camião excluído com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir camião.' });
  }
}

module.exports = {
  criarCamiao,
  obterCamioes,
  obterCamiaoPorId,
  atualizarCamiao,
  excluirCamiao
};
