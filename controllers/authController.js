const express = require('express');
const User = require('./models/User'); // Caminho para o seu modelo de usuário
const jwt = require('jsonwebtoken'); // Importa o pacote jsonwebtoken
const router = express.Router();
 -
// Rota para login do usuário
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verifica se o usuário existe
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // Verifica a senha usando o método de comparação definido no modelo
    const senhaValida = await usuario.compararSenha(senha);
    if (!senhaValida) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // Gera um token JWT se a autenticação for bem-sucedida
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login bem-sucedido!', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao fazer login.', error });
  }
});

module.exports = router;
