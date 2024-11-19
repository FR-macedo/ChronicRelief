const mongoose = require('mongoose');
const Medicacao = require('../models/medicacao');

class MedicacaoService {
  async createMedicacao(medicacaoData) {
    const medicacaoExistente = await Medicacao.findOne({
      nome: medicacaoData.nome,
      userId: medicacaoData.userId
    });

    if (medicacaoExistente) {
      throw new Error('Medicação já existe');
    }

    const novaMedicacao = new Medicacao(medicacaoData);
    return await novaMedicacao.save();
  }

  async getAllMedicacoes(userId) {
    const medicamentos = await Medicacao.find({ userId });
    if (!medicamentos || medicamentos.length === 0) {
      throw new Error('Nenhuma medicação encontrada');
    }
    return medicamentos;
  }

  async getMedicacaoByNome(nome, userId) {
    const medicacao = await Medicacao.findOne({
      nome: { $regex: new RegExp("^" + nome + "$", "i") },
      userId
    });

    if (!medicacao) {
      throw new Error('Medicação não encontrada');
    }
    return medicacao;
  }

  async updateMedicacao(medicacaoId, userId, updateData) {
    if (!mongoose.Types.ObjectId.isValid(medicacaoId)) {
      throw new Error('ID inválido');
    }

    const medicacao = await Medicacao.findOne({
      _id: medicacaoId,
      userId
    });

    if (!medicacao) {
      throw new Error('Medicação não encontrada');
    }

    Object.assign(medicacao, updateData);
    return await medicacao.save();
  }

  async deleteMedicacao(medicacaoId, userId) {
    if (!mongoose.Types.ObjectId.isValid(medicacaoId)) {
      throw new Error('ID inválido');
    }

    const medicacao = await Medicacao.findOneAndDelete({
      _id: medicacaoId,
      userId
    });

    if (!medicacao) {
      throw new Error('Medicação não encontrada');
    }

    return medicacao;
  }
}

module.exports = MedicacaoService;