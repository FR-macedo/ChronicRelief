/**
 * @swagger
 * components:
 *   schemas:
 *     Recorrencia:
 *       type: object
 *       properties:
 *         tipo:
 *           type: string
 *           enum: ["daily", "weekly", "monthly"]
 *           description: Tipo de recorrência (diária, semanal ou mensal).
 *         intervalo:
 *           type: integer
 *           format: int32
 *           description: Intervalo da recorrência (e.g., a cada quantos dias, semanas ou meses).
 *         diasDaSemana:
 *           type: array
 *           items:
 *             type: string
 *             enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
 *           description: Dias da semana para recorrência semanal (opcional).
 *       required:
 *         - tipo
 *         - intervalo
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Medicacao:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: ID do usuário.
 *           example: 64e9f587b3a17e525a7d3246
 *         nome:
 *           type: string
 *           description: Nome da medicação.
 *           example: Paracetamol
 *         dosagem:
 *           type: string
 *           description: Dosagem da medicação.
 *           example: 750mg
 *         frequencia:
 *           type: string
 *           description: Frequência da medicação.
 *           example: 3 vezes ao dia
 *         horarioAlarme:
 *           type: string
 *           format: time
 *           description: Horário do alarme.
 *           example: 08:00
 *         dataInicio:
 *           type: string
 *           format: date
 *           description: Data de início da medicação.
 *           example: 2024-08-28
 *         dataFim:
 *           type: string
 *           format: date
 *           description: Data de fim da medicação.
 *           example: 2024-09-28
 *         recorrencia:
 *           $ref: '#/components/schemas/Recorrencia'
 *       required:
 *         - userId
 *         - nome
 *         - dosagem
 *         - frequencia
 *         - horarioAlarme
 *         - dataInicio
 *         - dataFim
 */

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
