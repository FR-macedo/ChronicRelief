/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - senha
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome completo do usuário.
 *           example: João Silva
 *         email:
 *           type: string
 *           description: Endereço de email do usuário. Deve ser único e válido.
 *           example: joao.silva@example.com
 *         senha:
 *           type: string
 *           description: Senha do usuário. Deve ter pelo menos 6 caracteres.
 *           example: minhaSenha123
 *         resetToken:
 *           type: string
 *           description: Token utilizado para redefinição de senha.
 *           example: 12345abcdef
 *         resetTokenExpires:
 *           type: string
 *           format: date-time
 *           description: Data e hora de expiração do token de redefinição de senha.
 *           example: 2024-11-21T10:30:00.000Z
 *       description: Esquema para a entidade Usuário no sistema, com campos obrigatórios para nome, email e senha. Inclui funcionalidades para redefinição de senha.
 */


const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Adicionando bcryptjs para hashing
const { Schema } = mongoose;

const SALT_WORK_FACTOR = 10; // Nível de complexidade do salt

// Definindo o esquema para Usuário
const UserSchema = new Schema({
  nome: {
    type: String,
    required: [true, "O nome é obrigatório"],
  },
  email: {
    type: String,
    required: [true, "O email é obrigatório"],
    unique: true,
    match: [/.+\@.+\..+/, "Por favor, insira um email válido"], // Validação regex para email
  },
  senha: {
    type: String,
    required: [true, "A senha é obrigatória"],
    minlength: [6, "A senha deve ter no mínimo 6 caracteres"], // Exemplo de validação de tamanho
  },
  resetToken: String,
  resetTokenExpires: Date
});

// Antes de salvar, aplicar o hash na senha
UserSchema.pre("save", async function (next) {
  if (!this.isModified("senha")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar a senha fornecida com o hash no banco de dados
UserSchema.methods.compararSenha = async function (senhaInserida) {
  return bcrypt.compare(senhaInserida, this.senha);
};

// Criando o modelo de Usuário
const User = mongoose.model("User", UserSchema);

module.exports = User;
