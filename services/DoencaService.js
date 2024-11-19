const mongoose = require('mongoose');
const Doenca = require('../models/doencas');

class DoencaService {
  async create(doencaData) {
    const doencaExistente = await Doenca.findOne({ 
      nome: doencaData.nome, 
      userId: doencaData.userId 
    });

    if (doencaExistente) {
      throw { status: 400, message: "Essa doença já foi cadastrada para este usuário." };
    }

    const novaDoenca = new Doenca(doencaData);
    await novaDoenca.save();
    
    return {
      message: "Doença adicionada com sucesso!",
      doenca: novaDoenca
    };
  }

  async getAll(userId) {
    const doencas = await Doenca.find({ userId });
    if (!doencas || doencas.length === 0) {
      throw { status: 404, message: "Nenhuma doença encontrada para este usuário." };
    }
    return doencas;
  }

  async getByNome(nome, userId) {
    const doenca = await Doenca.findOne({ nome, userId });
    if (!doenca) {
      throw { status: 404, message: "Doença não encontrada para este usuário." };
    }
    return doenca;
  }

  async update(doencaId, userId, updateData) {
    if (!mongoose.Types.ObjectId.isValid(doencaId)) {
      throw { status: 400, message: "ID de doença inválido." };
    }

    const doenca = await Doenca.findOne({ 
      _id: doencaId, 
      userId 
    });

    if (!doenca) {
      throw { status: 404, message: "Doença não encontrada." };
    }

    Object.assign(doenca, updateData);
    await doenca.save();

    return {
      message: "Doença atualizada com sucesso!",
      doenca
    };
  }

  async delete(doencaId, userId) {
    if (!mongoose.Types.ObjectId.isValid(doencaId)) {
      throw { status: 400, message: "ID de doença inválido." };
    }

    const doenca = await Doenca.findOneAndDelete({ 
      _id: doencaId, 
      userId 
    });

    if (!doenca) {
      throw { status: 404, message: "Doença não encontrada." };
    }
  }
}

module.exports = new DoencaService();