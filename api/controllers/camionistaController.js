const Camionista = require('../models/camionista');

// Criar um camionista
exports.criarCamionista = async (req, res) => {
  try {
    const { nome, cc } = req.body;
    const camionista = await Camionista.create({ nome, cc });
    res.status(201).json(camionista);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o camionista' });
  }
};

// Obter todos os camionistas
exports.obterCamionistas = async (req, res) => {
  try {
    const camionistas = await Camionista.findAll();
    res.status(200).json(camionistas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter os camionistas' });
  }
};

// Obter um camionista pelo ID
exports.obterCamionistaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const camionista = await Camionista.findByPk(id);
    if (camionista) {
      res.status(200).json(camionista);
    } else {
      res.status(404).json({ error: 'Camionista não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter o camionista' });
  }
};

// Atualizar um camionista pelo ID
exports.atualizarCamionista = async (req, res) => {
  const { id } = req.params;
  const { nome, cc } = req.body;
  try {
    const camionista = await Camionista.findByPk(id);
    if (camionista) {
      await camionista.update({ nome, cc });
      res.status(200).json(camionista);
    } else {
      res.status(404).json({ error: 'Camionista não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o camionista' });
  }
};

// Excluir um camionista pelo ID
exports.excluirCamionista = async (req, res) => {
  const { id } = req.params;
  try {
    const camionista = await Camionista.findByPk(id);
    if (camionista) {
      await camionista.destroy();
      res.status(200).json({ message: 'Camionista excluído com sucesso' });
    } else {
      res.status(404).json({ error: 'Camionista não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir o camionista' });
  }
};
