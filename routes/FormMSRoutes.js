const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const formMSController = require('../controllers/FormMSController');

// Rotas para FormularioDiarioMS
router.post('/diario/create', verifyToken, (req, res) => formMSController.createDiario(req, res));
router.get('/diario', verifyToken, (req, res) => formMSController.getAllDiario(req, res));
router.put('/diario/update/:id', verifyToken, (req, res) => formMSController.updateDiario(req, res));
router.delete('/diario/delete/:id', verifyToken, (req, res) => formMSController.deleteDiario(req, res));

// Rotas para FormularioSemanalMS
router.post('/semanal/create', verifyToken, (req, res) => formMSController.createSemanal(req, res));
router.get('/semanal', verifyToken, (req, res) => formMSController.getAllSemanal(req, res));
router.put('/semanal/update/:id', verifyToken, (req, res) => formMSController.updateSemanal(req, res));
router.delete('/semanal/delete/:id', verifyToken, (req, res) => formMSController.deleteSemanal(req, res));

module.exports = router;