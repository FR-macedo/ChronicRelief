const jwt = require('jsonwebtoken');
const User = require('../models/User');
const transporter = require('./emailService');
const { emailRegex } = require('../utils/validation');

class UserService {
  generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
  }

  async registerUser({ nome, email, senha }) {
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("Email já cadastrado.");
    }

    const novoUsuario = new User({ nome, email, senha });
    await novoUsuario.save();

    const token = this.generateToken(novoUsuario._id);
    return { message: "Usuário cadastrado com sucesso!", token };
  }

  async loginUser({ email, senha }) {
    const usuario = await User.findOne({ email });
    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }

    const senhaValida = await usuario.compararSenha(senha);
    if (!senhaValida) {
      throw new Error("Senha incorreta.");
    }

    const token = this.generateToken(usuario._id);
    return { message: "Login bem-sucedido!", token };
  }

  async handleForgotPassword(email, ip) {
    if (!email || !emailRegex.test(email)) {
      throw new Error("Formato de email inválido.");
    }

    if (!transporter) {
      throw new Error('Erro de configuração do serviço de email.');
    }

    const user = await User.findOne({ email });
    if (!user) {
      return {
        message: "Se um email válido estiver cadastrado, você receberá uma mensagem com instruções."
      };
    }

    const resetToken = jwt.sign(
      { id: user._id, ip },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    user.resetToken = resetToken;
    user.resetTokenExpires = Date.now() + 3600000;
    await user.save();

    const emailUrl = `http://localhost:3000/api/users/reset-password`;
    
    const mailOptions = {
      from: '"Chronic Relief" <no-reply@chronicrelief.com>',
      to: email,
      subject: "Recuperação de senha",
      html: `<p>Para redefinir sua senha, copie o token abaixo e acesse o link:</p>
             <p>Seu token: ${resetToken}</p>
             <a href="${emailUrl}">O link expira em 1 hora.</a>`
    };

    try {
      await transporter.sendMail(mailOptions);
      return { message: "Email de recuperação enviado com sucesso!" };
    } catch (error) {
      throw new Error('Erro ao enviar email de recuperação. Verifique suas configurações de email.');
    }
  }

  async resetPassword(token, novaSenha) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id, resetToken: token });
    
    if (!user || user.resetTokenExpires < Date.now()) {
      throw new Error('Token de recuperação inválido ou expirado.');
    }

    user.senha = novaSenha;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    return { message: 'Senha redefinida com sucesso!' };
  }
}

module.exports = UserService;