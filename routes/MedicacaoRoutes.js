const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const MedicacaoController = require('../controllers/MedicacaoController');

router.post('/create', verifyToken, (req, res) => MedicacaoController.create(req, res));
router.get('/', verifyToken, (req, res) => MedicacaoController.getAll(req, res));
router.get('/:nome', verifyToken, (req, res) => MedicacaoController.getByNome(req, res));
router.put('/update/:medicacaoId', verifyToken, (req, res) => MedicacaoController.update(req, res));
router.delete('/delete/:medicacaoId', verifyToken, (req, res) => MedicacaoController.delete(req, res));

module.exports = router;