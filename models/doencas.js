/**
 * @swagger
 * components:
 *   schemas:
 *     Doenca:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID da doença (gerado automaticamente pelo MongoDB)
 *           readOnly: true
 *         nome:
 *           type: string
 *           description: Nome da doença
 *           example: 'Doença X'
 *         userId:
 *           type: string
 *           description: ID do usuário
 *           example: '654321abcdef123456'
 *         sintomas:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de sintomas
 *           example: ['Sintoma A', 'Sintoma B']
 *         dataDiagnostico:
 *           type: string
 *           format: date
 *           description: Data do diagnóstico
 *           example: '2024-10-27'
 *       required:
 *         - nome
 *         - userId
 *         - sintomas
 *         - dataDiagnostico
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Definindo o esquema para Doença
const DoencaSchema = new Schema({
  nome: {
    type: String,
    required: [true, 'O nome da doença é obrigatório'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true
  },
  sintomas: {
    type: [String],
    required: [true, 'Os sintomas da doença são obrigatórios'],
  },
  dataDiagnostico: {
    type: Date,
    required: [true, 'A data de diagnóstico é obrigatória'],
  },
  // Caso precise de mais campos específicos da doença, pode-se adicionar aqui
});

// Criando o modelo de Doença
const Doenca = mongoose.model('Doenca', DoencaSchema);

module.exports = Doenca;
