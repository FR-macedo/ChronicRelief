const express = require('express');
const router = express.Router();
const DoencaController = require('../controllers/DoencaController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/create', verifyToken, DoencaController.create);
router.get('/', verifyToken, DoencaController.getAll);
router.get('/:nome', verifyToken, DoencaController.getByNome);
router.put('/update/:doencaId', verifyToken, DoencaController.update);
router.delete('/delete/:doencaId', verifyToken, DoencaController.delete);

module.exports = router;