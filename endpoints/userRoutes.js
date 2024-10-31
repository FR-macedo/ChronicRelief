// userRoutes.js
const express = require("express");
const User = require("../models/User"); // Caminho para o seu modelo de usuário
const jwt = require("jsonwebtoken"); // Importa o pacote jsonwebtoken
const router = express.Router();
const rateLimit = require("express-rate-limit");
const transporter = require('../services/emailService')
// Rota para registrar um novo usuário
router.post("/register", async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    // Verifica se o email já está em uso
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email já cadastrado." });
    }

    // Cria um novo usuário
    const novoUsuario = new User({ nome, email, senha });

    // Salva o usuário no banco de dados
    await novoUsuario.save();

    // Gera um token JWT após o registro
    const token = jwt.sign({ id: novoUsuario._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({ message: "Usuário cadastrado com sucesso!", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao cadastrar usuário.", error });
  }
});

// Rota para autenticar um usuário
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Encontra o usuário pelo email
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    // Compara a senha fornecida com a senha armazenada
    const senhaValida = await usuario.compararSenha(senha);
    if (!senhaValida) {
      return res.status(401).json({ message: "Senha incorreta." });
    }

    // Gera um token JWT após a autenticação
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({ message: "Login bem-sucedido!", token });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ message: "Erro ao fazer login.", error });
  }
});

const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 3,
  message: "Limite de tentativas atingido. Tente novamente mais tarde.",
  standardHeaders: true,
  legacyHeaders: false,
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Rota para recuperação de senha
// Rota para recuperar senha: gera um token de recuperação
router.post("/forgot-password", forgotPasswordLimiter, async (req, res) => {
  const { email } = req.body;

  try {
    if (!transporter) {
      console.error('Erro: Transportador de email não configurado.');
      return res.status(500).json({ message:  'Erro de configuração do serviço de email.' });
    }
    // Valida o formato do email
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ message: "Formato de email inválido." });
    }

    // Busca o usuário pelo email
    const user = await User.findOne({ email });
    if (!user) {
      // Responde com mensagem genérica
      return res.status(200).json({
        message:
          "Se um email válido estiver cadastrado, você receberá uma mensagem com instruções.",
      });
    }

    // Gera um token temporário de recuperação
    const resetToken = jwt.sign(
      { id: user._id, ip: req.ip },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Salva o token no usuário (opcional, se quiser manter o token no banco de dados)
    user.resetToken = resetToken;
    user.resetTokenExpires = Date.now() + 3600000; // 1 hora
    await user.save();

    // URL de recuperação
    const tokenEmail = `Seu token: ${resetToken}`;
    const emailUrl = `http://localhost:3000/api/users/reset-password`;

    // Configura o email para envio
    const mailOptions = {
      from: '"Chronic Relief" <no-reply@chronicrelief.com>',
      to: email,
      subject: "Recuperação de senha",
      html: `<p>Para redefinir sua senha, copie o token abaixo e acesse o link:</p>
             <p>${tokenEmail}</p>
             <a href="${emailUrl}">O link expira em 1 hora.</a>`,
    };

    // Envia o email
    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Erro ao enviar email de recuperação:', error);
      return res.status(500).json({ message: 'Erro ao enviar email de recuperação. Verifique suas configurações de email.' });
    }

    res.status(200).json({ message: "Email de recuperação enviado com sucesso!" });
  } catch (error) {
    console.error('Erro inesperado na rota forgot-password:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// Rota para redefinir a senha
router.post('/reset-password', async (req, res) => {
  const { token, novaSenha } = req.body; // Recebe o token e a nova senha do corpo da requisição

  try {
    // Decodifica e verifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Busca o usuário e valida o token armazenado
    const user = await User.findOne({ _id: decoded.id, resetToken: token });
    if (!user || user.resetTokenExpires < Date.now()) {
      return res.status(400).json({ message: 'Token de recuperação inválido ou expirado.' });
    }

    // Redefine a senha e remove o token de recuperação
    user.senha = novaSenha;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Senha redefinida com sucesso!' });
  } catch (error) {
    console.error('Erro ao redefinir a senha:', error);
    res.status(500).json({ message: 'Erro ao redefinir a senha.' });
  }
});


module.exports = router;
