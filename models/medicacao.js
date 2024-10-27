const mongoose = require("mongoose");
const { Schema } = mongoose;

const RecorrenciaSchema = new Schema({
  tipo: {
    type: String,
    enum: ["daily", "weekly", "monthly"],
    required: true,
  },
  intervalo: {
    type: Number,
    required: true,
  },
  diasDaSemana: {
    type: [String],
  },
});

// Definindo o esquema para Medicação
const MedicacaoSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  nome: {
    type: String,
    required: [true, "O nome da medicação é obrigatório"],
  },
  dosagem: {
    type: String,
    required: [true, "A dosagem da medicação é obrigatória"],
  },
  frequencia: {
    type: String,
    required: [true, "A frequência da medicação é obrigatória"],
  },
  horarioAlarme: {
    type: String, // Usando String para representar o horário
    required: [true, "O horário do alarme é obrigatório"],
  },
  dataInicio: {
    type: Date,
    required: [true, "A data de início da medicação é obrigatória"],
  },
  dataFim: {
    type: Date,
    required: [true, "A data de fim da medicação é obrigatória"],
  },
  recorrencia: RecorrenciaSchema, // Incluindo o esquema de recorrência
});

// Criando o modelo de Medicação
const Medicacao = mongoose.model("Medicacao", MedicacaoSchema);

module.exports = Medicacao;
