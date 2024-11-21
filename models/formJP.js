/**
 * @swagger
 * components:
 *   schemas:
 *     FormJPDiario:
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
 *         nivelAnsiedade:
 *           type: integer
 *           description: Nível de ansiedade (1-10)
 *           minimum: 1
 *           maximum: 10
 *           example: 7
 *         sintomas:
 *           type: array
 *           items:
 *             type: string
 *             enum:
 *               - Palpitações
 *               - Falta de ar
 *               - Dificuldade de concentração
 *               - Insônia
 *               - Tensão muscular
 *               - Irritabilidade
 *               - Procrastinação
 *               - Outros
 *           description: Sintomas apresentados
 *           example: ['Palpitações', 'Insônia']
 *         outrosSintomas:
 *           type: string
 *           description: Outros sintomas (se aplicável)
 *           example: 'Dor de cabeça leve'
 *         tecnicasRelaxamento:
 *           type: array
 *           items:
 *             type: string
 *             enum:
 *               - 'Meditação (Headspace)'
 *               - 'Exercícios de respiração'
 *               - 'Corrida'
 *               - 'Jogos'
 *               - 'Outros'
 *           description: Técnicas de relaxamento utilizadas
 *           example: ['Meditação (Headspace)', 'Exercícios de respiração']
 *         outraTecnicaRelaxamento:
 *           type: string
 *           description: Outra técnica de relaxamento (se aplicável)
 *           example: 'Yoga'
 *         tempoTecnicasRelaxamento:
 *           type: string
 *           description: Tempo dedicado às técnicas de relaxamento
 *           example: '30 minutos'
 *         humorGeral:
 *           type: integer
 *           description: Humor geral (1-10)
 *           minimum: 1
 *           maximum: 10
 *           example: 5
 *         observacoes:
 *           type: string
 *           description: Observações adicionais
 *           example: 'Dia bastante agitado no trabalho.'
 *       required:
 *         - userId
 *         - dataRegistro
 *         - nivelAnsiedade
 *         - sintomas
 *         - tecnicasRelaxamento
 *         - humorGeral
 *     FormJPSemanal:
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
 *         nivelAnsiedadeMedia:
 *           type: integer
 *           description: Nível médio de ansiedade (1-10)
 *           minimum: 1
 *           maximum: 10
 *           example: 6
 *         fatoresAumentoAnsiedade:
 *           type: array
 *           items:
 *             type: string
 *             enum:
 *               - Trabalho
 *               - 'Relações interpessoais'
 *               - 'Eventos sociais'
 *               - Notícias
 *               - Outros
 *           description: Fatores que aumentaram a ansiedade
 *           example: ['Trabalho', 'Relações interpessoais']
 *         outrosFatoresAumentoAnsiedade:
 *           type: string
 *           description: Outros fatores que aumentaram a ansiedade
 *           example: 'Problemas financeiros'
 *         fatoresReducaoAnsiedade:
 *           type: array
 *           items:
 *             type: string
 *             enum:
 *               - Meditação
 *               - Corrida
 *               - Jogos
 *               - Terapia
 *               - Outros
 *           description: Fatores que reduziram a ansiedade
 *           example: ['Meditação', 'Terapia']
 *         outrosFatoresReducaoAnsiedade:
 *           type: string
 *           description: Outros fatores que reduziram a ansiedade
 *           example: 'Passar tempo na natureza'
 *         observacoes:
 *           type: string
 *           description: Observações adicionais
 *           example: 'Semana desafiadora, mas consegui manter o controle.'
 *       required:
 *         - userId
 *         - dataConsultaAnterior
 *         - nivelAnsiedadeMedia
 *         - fatoresAumentoAnsiedade
 *         - fatoresReducaoAnsiedade
 *
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Definindo o esquema para o Formulário Diário
const FormJPDiarioSchema = new Schema({
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
  nivelAnsiedade: {
    type: Number,
    required: [true, 'Selecione o nível de ansiedade'],
    min: 1,
    max: 10,
  },
  sintomas: {
    type: [String],
    enum: [
      'Palpitações',
      'Falta de ar',
      'Dificuldade de concentração',
      'Insônia',
      'Tensão muscular',
      'Irritabilidade',
      'Procrastinação',
      'Outros',
    ],
    required: [true, 'Selecione pelo menos um sintoma'],
  },
  outrosSintomas: {
    type: String,
  },
  tecnicasRelaxamento: {
    type: [String],
    enum: [
      'Meditação (Headspace)',
      'Exercícios de respiração',
      'Corrida',
      'Jogos',
      'Outros',
    ],
    required: [true, 'Selecione pelo menos uma técnica de relaxamento'],
  },
  outraTecnicaRelaxamento: {
    type: String,
  },
  tempoTecnicasRelaxamento: {
    type: String, // Usar String para permitir entrada livre (minutos, horas)
  },
  humorGeral: {
    type: Number,
    required: [true, 'Selecione o humor geral'],
    min: 1,
    max: 10,
  },
  observacoes: {
    type: String,
  },
});

// Definindo o esquema para o Formulário Semanal
const FormJPSemanalSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referência para o esquema de usuários
    required: [true, 'O ID do usuário é obrigatório'],
  },
  dataConsultaAnterior: {
    type: Date,
    required: [true, 'A data da consulta anterior é obrigatória'],
  },
  nivelAnsiedadeMedia: {
    type: Number,
    required: [true, 'Selecione o nível médio de ansiedade'],
    min: 1,
    max: 10,
  },
  fatoresAumentoAnsiedade: {
    type: [String],
    enum: [
      'Trabalho',
      'Relações interpessoais',
      'Eventos sociais',
      'Notícias',
      'Outros',
    ],
    required: [true, 'Selecione pelo menos um fator que aumentou a ansiedade'],
  },
  outrosFatoresAumentoAnsiedade: {
    type: String,
  },
  fatoresReducaoAnsiedade: {
    type: [String],
    enum: [
      'Meditação',
      'Corrida',
      'Jogos',
      'Terapia',
      'Outros',
    ],
    required: [true, 'Selecione pelo menos um fator que ajudou a reduzir a ansiedade'],
  },
  outrosFatoresReducaoAnsiedade: {
    type: String,
  },
  observacoes: {
    type: String,
  },
});

// Criando os modelos de Formulário
const FormularioDiario = mongoose.model('FormJPDiarioSchema', FormJPDiarioSchema);
const FormularioSemanal = mongoose.model('FormJPSemanalSchema', FormJPSemanalSchema);

module.exports = { FormularioDiario, FormularioSemanal };
