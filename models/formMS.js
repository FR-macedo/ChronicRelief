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
