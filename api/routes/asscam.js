const express = require('express');
const asscam = require('../controllers/asscam');

const router = express.Router();


router.put('/camionista/:camionistaId/associar-camiao', asscam.associarCamionistaCamiao);

module.exports = router;
