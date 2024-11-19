// routes/formJPRoutes.js

const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { FormularioDiario, FormularioSemanal } = require('../models/formJP');
const { FormJPDiarioService, FormJPSemanalService } = require('../services/FormJPService');
const { FormJPDiarioController, FormJPSemanalController } = require('../controllers/FormJPController');

// Inicialização dos serviços
const formJPDiarioService = new FormJPDiarioService(FormularioDiario);
const formJPSemanalService = new FormJPSemanalService(FormularioSemanal);

// Inicialização dos controllers
const formJPDiarioController = new FormJPDiarioController(formJPDiarioService);
const formJPSemanalController = new FormJPSemanalController(formJPSemanalService);

// Rotas para FormJPDiario
router.post('/diario/create', verifyToken, (req, res) => formJPDiarioController.createFormDiario(req, res));
router.get('/diario', verifyToken, (req, res) => formJPDiarioController.getAllFormsDiario(req, res));
router.put('/diario/update/:id', verifyToken, (req, res) => formJPDiarioController.updateFormDiario(req, res));
router.delete('/diario/delete/:id', verifyToken, (req, res) => formJPDiarioController.deleteFormDiario(req, res));

// Rotas para FormJPSemanal
router.post('/semanal/create', verifyToken, (req, res) => formJPSemanalController.createFormSemanal(req, res));
router.get('/semanal', verifyToken, (req, res) => formJPSemanalController.getAllFormsSemanal(req, res));
router.put('/semanal/update/:id', verifyToken, (req, res) => formJPSemanalController.updateFormSemanal(req, res));
router.delete('/semanal/delete/:id', verifyToken, (req, res) => formJPSemanalController.deleteFormSemanal(req, res));

module.exports = router;