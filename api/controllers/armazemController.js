const Armazem = require('../models/armazem');

// Cria um novo armazem
const criarArmazem = async (req, res) => {
  try {
    const { localizacao, tipo } = req.body;
    const novoArmazem = await Armazem.create({ localizacao, tipo });
    res.status(201).json(novoArmazem);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao criar o armazem.' });
  }
};

// Obtém todos os armazens
const obterArmazens = async (req, res) => {
  try {
    const armazens = await Armazem.findAll();
    res.status(200).json(armazens);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao obter os armazens.' });
  }
};

// Obtém um armazem específico por ID
const obterArmazemPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const armazem = await Armazem.findByPk(id);
    if (!armazem) {
      res.status(404).json({ error: 'Armazem não encontrado.' });
    } else {
      res.status(200).json(armazem);
    }
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao obter o armazem.' });
  }
};

// Atualiza um armazem específico por ID
const atualizarArmazem = async (req, res) => {
  const { id } = req.params;
  try {
    const { localizacao, tipo } = req.body;
    const armazem = await Armazem.findByPk(id);
    if (!armazem) {
      res.status(404).json({ error: 'Armazem não encontrado.' });
    } else {
      armazem.localizacao = localizacao;
      armazem.tipo = tipo;
      await armazem.save();
      res.status(200).json(armazem);
    }
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao atualizar o armazem.' });
  }
};

// Exclui um armazem específico por ID
const excluirArmazem = async (req, res) => {
  const { id } = req.params;
  try {
    const armazem = await Armazem.findByPk(id);
    if (!armazem) {
      res.status(404).json({ error: 'Armazem não encontrado.' });
    } else {
      await armazem.destroy();
      res.status(200).json({ message: 'Armazem excluído com sucesso.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao excluir o armazem.' });
  }
};

module.exports = {
  criarArmazem,
  obterArmazens,
  obterArmazemPorId,
  atualizarArmazem,
  excluirArmazem,
};
