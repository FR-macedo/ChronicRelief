const express = require('express');
const router = express.Router();
const DocumentoController = require('../controllers/DocumentoController');
const authenticateToken = require('../middleware/authMiddleware');

const documentoController = new DocumentoController();

// Rotas
router.post('/upload', authenticateToken, (req, res) => documentoController.upload(req, res));
router.get('/', authenticateToken, (req, res) => documentoController.listarDocumentos(req, res));
router.get('/:id', authenticateToken, (req, res) => documentoController.buscarDocumento(req, res));
router.put('/:id', authenticateToken, (req, res) => documentoController.atualizarDocumento(req, res));
router.delete('/:id', authenticateToken, (req, res) => documentoController.deletarDocumento(req, res));
router.get('/:id/download', authenticateToken, (req, res) => documentoController.downloadDocumento(req, res));

module.exports = router;