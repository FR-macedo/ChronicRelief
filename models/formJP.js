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
const FormularioDiario = mongoose.model('FormularioDiario', FormularioDiarioSchema);
const FormularioSemanal = mongoose.model('FormularioSemanal', FormularioSemanalSchema);

module.exports = { FormularioDiario, FormularioSemanal };
