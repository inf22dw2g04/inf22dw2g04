const Camionista = require('../models/camionista');
const Camiao = require('../models/camiao');

// Função para associar um camionista a um camião
const associarCamionistaCamiao = async (req, res) => {
  try {
    const { camionistaId } = req.params;
    const { camiaoId } = req.body;

    // Verificar se o camionista e o camião existem
    const camionista = await Camionista.findByPk(camionistaId);
    const camiao = await Camiao.findByPk(camiaoId);

    if (!camionista || !camiao) {
      return res.status(404).json({ error: 'Camionista ou camião não encontrado' });
    }

    // Associar o camionista ao camião
    camiao.idCamionista = camionistaId;
    await camiao.save();

    res.json({ message: 'Associação realizada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao associar camionista e camião' });
  }
};

module.exports = {
  associarCamionistaCamiao,
};
