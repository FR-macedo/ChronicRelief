
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Definindo o esquema para Doença
const DoencaSchema = new Schema({
  nome: {
    type: String,
    required: [true, 'O nome da doença é obrigatório'],
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
