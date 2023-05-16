// Importe o módulo 'express'
const express = require('express');
const router = express.Router();
const Camiao = require('../models/camiao');

const camiaoController = {
  getAllCamioes: async (req, res) => {
    try {
      const camioes = await Camiao.find();
      res.status(200).json(camioes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao obter os camiões.' });
    }
  },

  createCamiao: async (req, res) => {
    try {
      const { id, marca, matricula } = req.body;
      const camiao = new Camiao({ id, marca, matricula });
      const novoCamiao = await camiao.save();
      res.status(201).json(novoCamiao);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar o camião.' });
    }
  },

  getCamiaoById: async (req, res) => {
    try {
      const { id } = req.params;
      const camiao = await Camiao.findById(id);
      if (camiao) {
        res.status(200).json(camiao);
      } else {
        res.status(404).json({ message: 'Camião não encontrado.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao obter o camião.' });
    }
  },

  updateCamiao: async (req, res) => {
    try {
      const { id } = req.params;
      const { marca, matricula } = req.body;
      const camiao = await Camiao.findByIdAndUpdate(
        id,
        { marca, matricula },
        { new: true }
      );
      if (camiao) {
        res.status(200).json(camiao);
      } else {
        res.status(404).json({ message: 'Camião não encontrado.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar o camião.' });
    }
  },

  deleteCamiao: async (req, res) => {
    try {
      const { id } = req.params;
      const camiao = await Camiao.findByIdAndDelete(id);
      if (camiao) {
        res.status(200).json({ message: 'Camião excluído com sucesso.' });
      } else {
        res.status(404).json({ message: 'Camião não encontrado.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir o camião.' });
    }
  },
};

module.exports = camiaoController;
