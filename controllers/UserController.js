const UserService = require('../services/UserService');

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async register(req, res) {
    const { nome, email, senha } = req.body;

    try {
      const result = await this.userService.registerUser({ nome, email, senha });
      res.status(201).json(result);
    } catch (error) {
      if (error.message === "Email já cadastrado.") {
        return res.status(400).json({ message: error.message });
      }
      console.error(error);
      res.status(500).json({ message: "Erro ao cadastrar usuário.", error });
    }
  }

  async login(req, res) {
    const { email, senha } = req.body;

    try {
      const result = await this.userService.loginUser({ email, senha });
      res.status(200).json(result);
    } catch (error) {
      if (error.message === "Usuário não encontrado." || error.message === "Senha incorreta.") {
        return res.status(401).json({ message: error.message });
      }
      console.error("Erro ao fazer login:", error);
      res.status(500).json({ message: "Erro ao fazer login.", error });
    }
  }

  async forgotPassword(req, res) {
    const { email } = req.body;
    const ip = req.ip;

    try {
      const result = await this.userService.handleForgotPassword(email, ip);
      res.status(200).json(result);
    } catch (error) {
      if (error.message === "Formato de email inválido.") {
        return res.status(400).json({ message: error.message });
      }
      console.error('Erro na rota forgot-password:', error);
      res.status(500).json({ message: error.message || 'Erro interno do servidor.' });
    }
  }

  async resetPassword(req, res) {
    const { token, novaSenha } = req.body;

    try {
      const result = await this.userService.resetPassword(token, novaSenha);
      res.status(200).json(result);
    } catch (error) {
      if (error.message === 'Token de recuperação inválido ou expirado.') {
        return res.status(400).json({ message: error.message });
      }
      console.error('Erro ao redefinir a senha:', error);
      res.status(500).json({ message: 'Erro ao redefinir a senha.' });
    }
  }
}

module.exports = new UserController();