const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const formPSController = require('../controllers/FormPSController');

// Rotas para FormPSDiario
router.post('/diario/create', verifyToken, formPSController.createDiario);
router.get('/diario', verifyToken, formPSController.getAllDiario);
router.put('/diario/update/:id', verifyToken, formPSController.updateDiario);
router.delete('/diario/delete/:id', verifyToken, formPSController.deleteDiario);

// Rotas para FormPSSemanal
router.post('/semanal/create', verifyToken, formPSController.createSemanal);
router.get('/semanal', verifyToken, formPSController.getAllSemanal);
router.put('/semanal/update/:id', verifyToken, formPSController.updateSemanal);
router.delete('/semanal/delete/:id', verifyToken, formPSController.deleteSemanal);

module.exports = router;