/**
 * @swagger
 * components:
 *   schemas:
 *     FormMSDiario:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID do formulário (gerado automaticamente)
 *           readOnly: true
 *         userId:
 *           type: string
 *           description: ID do usuário
 *           example: '654321abcdef123456'
 *         dataRegistro:
 *           type: string
 *           format: date-time
 *           description: Data e hora do registro
 *           example: '2024-10-27T10:30:00Z'
 *         medicamentosTomados:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de medicamentos tomados
 *           example: ['Medicamento A', 'Medicamento B']
 *         outrosMedicamentos:
 *           type: string
 *           description: Outros medicamentos (se aplicável)
 *           example: 'Complexo vitamínico'
 *         sintomas:
 *           type: array
 *           items:
 *             type: string
 *             enum:
 *               - Febre
 *               - 'Dores de cabeça'
 *               - Fadiga
 *               - Tosse
 *               - Diarreia
 *               - 'Dor de garganta'
 *               - Outros
 *           description: Sintomas apresentados
 *           example: ['Febre', 'Tosse']
 *         outrosSintomas:
 *           type: string
 *           description: Outros sintomas (se aplicável)
 *           example: 'Dor muscular'
 *         humorGeral:
 *           type: integer
 *           description: Humor geral (1-10)
 *           minimum: 1
 *           maximum: 10
 *           example: 8
 *         alimentacao:
 *           type: array
 *           items:
 *             type: string
 *             enum:
 *               - 'Refeições balanceadas'
 *               - 'Frutas e vegetais'
 *               - 'Alimentos ricos em proteínas'
 *               - Outros
 *           description: Itens de alimentação consumidos
 *           example: ['Refeições balanceadas', 'Frutas e vegetais']
 *         outraAlimentacao:
 *           type: string
 *           description: Outros itens de alimentação (se aplicável)
 *           example: 'Suco de laranja natural'
 *         observacoes:
 *           type: string
 *           description: Observações adicionais
 *           example: 'Dieta seguida corretamente.'
 *       required:
 *         - userId
 *         - dataRegistro
 *         - medicamentosTomados
 *         - sintomas
 *         - humorGeral
 *         - alimentacao
 *     FormMSSemanal:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID do formulário (gerado automaticamente)
 *           readOnly: true
 *         userId:
 *           type: string
 *           description: ID do usuário
 *           example: '654321abcdef123456'
 *         dataConsultaAnterior:
 *           type: string
 *           format: date
 *           description: Data da consulta anterior
 *           example: '2024-10-20'
 *         sintomasFrequentes:
 *           type: array
 *           items:
 *             type: string
 *             enum:
 *               - Febre
 *               - 'Dores de cabeça'
 *               - Fadiga
 *               - Tosse
 *               - Diarreia
 *               - 'Dor de garganta'
 *               - Outros
 *           description: Sintomas frequentes na semana
 *           example: ['Fadiga', 'Dores de cabeça']
 *         outrosSintomasFrequentes:
 *           type: string
 *           description: Outros sintomas frequentes (se aplicável)
 *           example: 'Dor nas articulações'
 *         humorGeralMedia:
 *           type: integer
 *           description: Humor geral médio (1-10)
 *           minimum: 1
 *           maximum: 10
 *           example: 7
 *         observacoes:
 *           type: string
 *           description: Observações adicionais
 *           example: 'Melhora significativa dos sintomas.'
 *       required:
 *         - userId
 *         - dataConsultaAnterior
 *         - sintomasFrequentes
 *         - humorGeralMedia
 *
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Definindo o esquema para o Formulário Diário
const FormMSDiarioSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referência para o esquema de usuários
    required: [true, 'O ID do usuário é obrigatório'],
  },
  dataRegistro: {
    type: Date,
    default: Date.now, // Define a data e hora automaticamente
    required: [true, 'A data e hora do registro são obrigatórias'],
  },
  medicamentosTomados: {
    type: [String],
    required: [true, 'Selecione pelo menos um medicamento'],
  },
  outrosMedicamentos: {
    type: String,
  },
  sintomas: {
    type: [String],
    enum: [
      'Febre',
      'Dores de cabeça',
      'Fadiga',
      'Tosse',
      'Diarreia',
      'Dor de garganta',
      'Outros',
    ],
    required: [true, 'Selecione pelo menos um sintoma'],
  },
  outrosSintomas: {
    type: String,
  },
  humorGeral: {
    type: Number,
    required: [true, 'Selecione o humor geral'],
    min: 1,
    max: 10,
  },
  alimentacao: {
    type: [String],
    enum: [
      'Refeições balanceadas',
      'Frutas e vegetais',
      'Alimentos ricos em proteínas',
      'Outros',
    ],
    required: [true, 'Selecione pelo menos um item da alimentação'],
  },
  outraAlimentacao: {
    type: String,
  },
  observacoes: {
    type: String,
  },
});

// Definindo o esquema para o Formulário Semanal
const FormMSSemanalSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referência para o esquema de usuários
    required: [true, 'O ID do usuário é obrigatório'],
  },
  dataConsultaAnterior: {
    type: Date,
    required: [true, 'A data da consulta anterior é obrigatória'],
  },
  sintomasFrequentes: {
    type: [String],
    enum: [
      'Febre',
      'Dores de cabeça',
      'Fadiga',
      'Tosse',
      'Diarreia',
      'Dor de garganta',
      'Outros',
    ],
    required: [true, 'Selecione pelo menos um sintoma frequente'],
  },
  outrosSintomasFrequentes: {
    type: String,
  },
  humorGeralMedia: {
    type: Number,
    required: [true, 'Selecione o humor geral médio'],
    min: 1,
    max: 10,
  },
  observacoes: {
    type: String,
  },
});

// Criando os modelos de Formulário
const FormularioDiario = mongoose.model('FormMSDiario', FormMSDiarioSchema);
const FormularioSemanal = mongoose.model('FormMSSemanal', FormMSSemanalSchema);

module.exports = { FormularioDiario, FormularioSemanal };
