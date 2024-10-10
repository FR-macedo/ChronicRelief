
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Adicionando bcryptjs para hashing
const { Schema } = mongoose;

const SALT_WORK_FACTOR = 10; // Nível de complexidade do salt

// Definindo o esquema para Doença
const DoencaSchema = new Schema({
  doencaId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Doenca', // Referência a outro modelo, se necessário
  },
  nome: {
    type: String,
    required: true,
  },
  sintomas: {
    type: [String],
    required: true,
  },
  dataDiagnostico: {
    type: Date,
    required: true,
  },
});

// Definindo o esquema para Medicação
const MedicacaoSchema = new Schema({
  medicacaoId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Medicacao',
  },
  nome: {
    type: String,
    required: true,
  },
  dosagem: {
    type: String,
    required: true,
  },
  frequencia: {
    type: String,
    required: true,
  },
  horarioAlarme: {
    type: String, // Usando String para representar o horário
    required: true,
  },
  dataInicio: {
    type: Date,
    required: true,
  },
  dataFim: {
    type: Date,
    required: true,
  },
  recorrencia: {
    tipo: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
    },
    intervalo: {
      type: Number,
    },
    diasDaSemana: {
      type: [String],
    },
  },
});

// Definindo o esquema para Eventos
const EventoSchema = new Schema({
  eventoId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Evento',
  },
  titulo: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
  },
  data: {
    type: Date,
    required: true,
  },
  horario: {
    type: String, // Ou Date se quiser trabalhar com data/hora
  },
  recorrencia: {
    tipo: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'none'],
      default: 'none',
    },
    intervalo: {
      type: Number,
    },
    finalRecorrencia: {
      type: Date,
    },
  },
  tipo: {
    type: String,
    enum: ['medicacao', 'exame', 'outro'],
  },
  documentoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Documento',
  },
});

// Definindo o esquema para Usuário
const UserSchema = new Schema({
  nome: {
    type: String,
    required: [true, 'O nome é obrigatório'],
  },
  email: {
    type: String,
    required: [true, 'O email é obrigatório'],
    unique: true,
    match: [/.+\@.+\..+/, 'Por favor, insira um email válido'], // Validação regex para email
  },
  senha: {
    type: String,
    required: [true, 'A senha é obrigatória'],
    minlength: [6, 'A senha deve ter no mínimo 6 caracteres'], // Exemplo de validação de tamanho
  },
  doencas: [DoencaSchema],
  medicacoes: [MedicacaoSchema],
  eventos: [EventoSchema],
});

// Antes de salvar, aplicar o hash na senha
UserSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) {
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
const User = mongoose.model('User', UserSchema);

module.exports = User;
