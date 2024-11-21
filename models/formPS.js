/**
 * @swagger
 * components:
 *   schemas:
 *     FormPSDiario:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: ID do usuário.
 *           example: 64e9f587b3a17e525a7d3246
 *         dataRegistro:
 *           type: string
 *           format: date-time
 *           description: Data e hora do registro.
 *           example: 2024-08-28T10:30:00.000Z
 *         sintomasEM:
 *           type: array
 *           items:
 *             type: string
 *             enum: ['Fadiga', 'Visão turva', 'Fraqueza muscular', 'Dormência ou formigamento', 'Dificuldade de coordenação', 'Dores musculares', 'Problemas de intestino ou bexiga', 'Outros']
 *           description: Sintomas experimentados.
 *         outrosSintomasEM:
 *           type: string
 *           description: Outros sintomas (se aplicável).
 *         nivelFadiga:
 *           type: integer
 *           format: int32
 *           minimum: 1
 *           maximum: 10
 *           description: Nível de fadiga (1-10).
 *         nivelAnsiedade:
 *           type: integer
 *           format: int32
 *           minimum: 1
 *           maximum: 10
 *           description: Nível de ansiedade (1-10).
 *         humorGeral:
 *           type: integer
 *           format: int32
 *           minimum: 1
 *           maximum: 10
 *           description: Humor geral (1-10).
 *         atividadeFisica:
 *           type: array
 *           items:
 *             type: string
 *             enum: ['Yoga', 'Alongamentos', 'Caminhada leve', 'Exercícios de baixo impacto', 'Outro']
 *           description: Atividades físicas realizadas.
 *         outraAtividadeFisica:
 *           type: string
 *           description: Outra atividade física (se aplicável).
 *         duracaoAtividadeFisica:
 *           type: string
 *           description: Duração da atividade física.
 *         alimentacao:
 *           type: array
 *           items:
 *             type: string
 *             enum: ['Dieta anti-inflamatória', 'Alimentos ricos em ômega-3', 'Frutas vermelhas e vegetais verdes', 'Outros']
 *           description: Itens da alimentação.
 *         outraAlimentacao:
 *           type: string
 *           description: Outros itens da alimentação (se aplicável).
 *         tecnicasRelaxamento:
 *           type: array
 *           items:
 *             type: string
 *             enum: ['Meditação guiada', 'Respiração profunda', 'Yoga', 'Jardinar', 'Leitura', 'Tempo com a família', 'Outro']
 *           description: Técnicas de relaxamento utilizadas.
 *         outraTecnicaRelaxamento:
 *           type: string
 *           description: Outra técnica de relaxamento (se aplicável).
 *         observacoes:
 *           type: string
 *           description: Observações.
 *         recomendacoesAutocuidado:
 *           type: string
 *           description: Recomendações de autocuidado.
 *       required:
 *         - userId
 *         - dataRegistro
 *         - sintomasEM
 *         - nivelFadiga
 *         - nivelAnsiedade
 *         - humorGeral
 *         - atividadeFisica
 *         - alimentacao
 *         - tecnicasRelaxamento
 *
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FormPSSemanal:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: ID do usuário.
 *           example: 64e9f587b3a17e525a7d3246
 *         dataConsultaAnterior:
 *           type: string
 *           format: date-time
 *           description: Data da consulta anterior.
 *           example: 2024-08-21T10:30:00.000Z
 *         sintomasFrequentes:
 *           type: array
 *           items:
 *             type: string
 *             enum: ['Fadiga', 'Visão turva', 'Fraqueza muscular', 'Dormência ou formigamento', 'Dificuldade de coordenação', 'Dores musculares', 'Problemas de intestino ou bexiga', 'Outros']
 *           description: Sintomas frequentes.
 *         outrosSintomasFrequentes:
 *           type: string
 *           description: Outros sintomas frequentes (se aplicável).
 *         nivelFadigaMedia:
 *           type: integer
 *           format: int32
 *           minimum: 1
 *           maximum: 10
 *           description: Nível médio de fadiga (1-10).
 *         nivelAnsiedadeMedia:
 *           type: integer
 *           format: int32
 *           minimum: 1
 *           maximum: 10
 *           description: Nível médio de ansiedade (1-10).
 *         fatoresReducaoFadigaAnsiedade:
 *           type: array
 *           items:
 *             type: string
 *             enum: ['Adaptação da rotina', 'Exercícios leves', 'Dieta anti-inflamatória', 'Técnicas de relaxamento', 'Medicamentos', 'Suporte familiar', 'Outros']
 *           description: Fatores de redução de fadiga e ansiedade.
 *         outrosFatoresReducao:
 *           type: string
 *           description: Outros fatores de redução (se aplicável).
 *         observacoes:
 *           type: string
 *           description: Observações.
 *       required:
 *         - userId
 *         - dataConsultaAnterior
 *         - sintomasFrequentes
 *         - nivelFadigaMedia
 *         - nivelAnsiedadeMedia
 *         - fatoresReducaoFadigaAnsiedade
 *
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Definindo o esquema para o Formulário Diário
const FormPSDiarioSchema = new Schema({
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
  sintomasEM: {
    type: [String],
    enum: [
      'Fadiga',
      'Visão turva',
      'Fraqueza muscular',
      'Dormência ou formigamento',
      'Dificuldade de coordenação',
      'Dores musculares',
      'Problemas de intestino ou bexiga',
      'Outros',
    ],
    required: [true, 'Selecione pelo menos um sintoma'],
  },
  outrosSintomasEM: {
    type: String,
  },
  nivelFadiga: {
    type: Number,
    required: [true, 'Selecione o nível de fadiga'],
    min: 1,
    max: 10,
  },
  nivelAnsiedade: {
    type: Number,
    required: [true, 'Selecione o nível de ansiedade'],
    min: 1,
    max: 10,
  },
  humorGeral: {
    type: Number,
    required: [true, 'Selecione o humor geral'],
    min: 1,
    max: 10,
  },
  atividadeFisica: {
    type: [String],
    enum: [
      'Yoga',
      'Alongamentos',
      'Caminhada leve',
      'Exercícios de baixo impacto',
      'Outro',
    ],
    required: [true, 'Selecione pelo menos uma atividade física'],
  },
  outraAtividadeFisica: {
    type: String,
  },
  duracaoAtividadeFisica: {
    type: String, // Usar String para permitir entrada livre (minutos, horas)
  },
  alimentacao: {
    type: [String],
    enum: [
      'Dieta anti-inflamatória',
      'Alimentos ricos em ômega-3',
      'Frutas vermelhas e vegetais verdes',
      'Outros',
    ],
    required: [true, 'Selecione pelo menos um item da alimentação'],
  },
  outraAlimentacao: {
    type: String,
  },
  tecnicasRelaxamento: {
    type: [String],
    enum: [
      'Meditação guiada',
      'Respiração profunda',
      'Yoga',
      'Jardinar',
      'Leitura',
      'Tempo com a família',
      'Outro',
    ],
    required: [true, 'Selecione pelo menos uma técnica de relaxamento'],
  },
  outraTecnicaRelaxamento: {
    type: String,
  },
  observacoes: {
    type: String,
  },
  recomendacoesAutocuidado: {
    type: String,
  },
});

// Definindo o esquema para o Formulário Semanal
const FormPSSemanalSchema = new Schema({
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
      'Fadiga',
      'Visão turva',
      'Fraqueza muscular',
      'Dormência ou formigamento',
      'Dificuldade de coordenação',
      'Dores musculares',
      'Problemas de intestino ou bexiga',
      'Outros',
    ],
    required: [true, 'Selecione pelo menos um sintoma frequente'],
  },
  outrosSintomasFrequentes: {
    type: String,
  },
  nivelFadigaMedia: {
    type: Number,
    required: [true, 'Selecione o nível médio de fadiga'],
    min: 1,
    max: 10,
  },
  nivelAnsiedadeMedia: {
    type: Number,
    required: [true, 'Selecione o nível médio de ansiedade'],
    min: 1,
    max: 10,
  },
  fatoresReducaoFadigaAnsiedade: {
    type: [String],
    enum: [
      'Adaptação da rotina',
      'Exercícios leves',
      'Dieta anti-inflamatória',
      'Técnicas de relaxamento',
      'Medicamentos',
      'Suporte familiar',
      'Outros',
    ],
    required: [true, 'Selecione pelo menos um fator de redução'],
  },
  outrosFatoresReducao: {
    type: String,
  },
  observacoes: {
    type: String,
  },
});

// Criando os modelos de Formulário
const FormularioDiario = mongoose.model('FormPSDiarioSchema', FormPSDiarioSchema);
const FormularioSemanal = mongoose.model('FormPSSemanalSchema', FormPSSemanalSchema);

module.exports = { FormularioDiario, FormularioSemanal };
