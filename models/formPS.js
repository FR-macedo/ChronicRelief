const mongoose = require('mongoose');
const { Schema } = mongoose;

// Definindo o esquema para o Formulário Diário
const FormularioDiarioSchema = new Schema({
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
const FormularioSemanalSchema = new Schema({
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
const FormularioDiario = mongoose.model('FormularioDiario', FormularioDiarioSchema);
const FormularioSemanal = mongoose.model('FormularioSemanal', FormularioSemanalSchema);

module.exports = { FormularioDiario, FormularioSemanal };
