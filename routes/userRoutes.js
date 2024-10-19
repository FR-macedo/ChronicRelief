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

// Rota para autenticar um usuário
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
  
    try {
      // Encontra o usuário pelo email
      const usuario = await User.findOne({ email });
      if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }
  
      // Compara a senha fornecida com a senha armazenada
      const senhaValida = await usuario.compararSenha(senha);
      if (!senhaValida) {
        return res.status(401).json({ message: 'Senha incorreta.' });
      }
  
      // Gera um token JWT após a autenticação
      const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
  
      res.status(200).json({ message: 'Login bem-sucedido!', token });
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      res.status(500).json({ message: 'Erro ao fazer login.', error });
    }
  });

module.exports = router;
