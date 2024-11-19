const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const UserController = require('../controllers/UserController');

const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: "Limite de tentativas atingido. Tente novamente mais tarde.",
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/register', (req, res) => UserController.register(req, res));
router.post('/login', (req, res) => UserController.login(req, res));
router.post('/forgot-password', forgotPasswordLimiter, (req, res) => UserController.forgotPassword(req, res));
router.post('/reset-password', (req, res) => UserController.resetPassword(req, res));

module.exports = router;