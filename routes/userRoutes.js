// userRoutes.js
const express = require('express');
const User = require('../models/User'); // Caminho para o seu modelo de usuário
const jwt = require('jsonwebtoken'); // Importa o pacote jsonwebtoken
const router = express.Router();

// Rota para registrar um novo usuário
router.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    // Verifica se o email já está em uso
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email já cadastrado.' });
    }

    // Cria um novo usuário
    const novoUsuario = new User({ nome, email, senha });

    // Salva o usuário no banco de dados
    await novoUsuario.save();

    // Gera um token JWT após o registro
    const token = jwt.sign({ id: novoUsuario._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao cadastrar usuário.', error });
  }
});

module.exports = router;
