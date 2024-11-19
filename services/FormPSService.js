const mongoose = require('mongoose');
const { FormularioDiario, FormularioSemanal } = require('../models/formPS');

class FormPSService {
  // Serviços para FormPSDiario
  async createDiario(data) {
    if (!data.sintomas) {
      throw { status: 400, message: "Campos obrigatórios ausentes." };
    }

    const novoFormDiario = new FormularioDiario(data);
    return await novoFormDiario.save();
  }

  async getAllDiario(userId) {
    return await FormularioDiario.find({ userId });
  }

  async updateDiario(id, data) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw { status: 400, message: "ID inválido." };
    }

    const form = await FormularioDiario.findOneAndUpdate(
      { _id: id, userId: data.userId },
      data,
      { new: true }
    );

    if (!form) {
      throw { status: 404, message: "Formulário Diário não encontrado." };
    }

    return form;
  }

  async deleteDiario(id, userId) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw { status: 400, message: "ID inválido." };
    }

    const form = await FormularioDiario.findOneAndDelete({ _id: id, userId });
    if (!form) {
      throw { status: 404, message: "Formulário Diário não encontrado." };
    }

    return form;
  }

  // Serviços para FormPSSemanal
  async createSemanal(data) {
    if (!data.dataConsultaAnterior || !data.sintomas) {
      throw { status: 400, message: "Campos obrigatórios ausentes." };
    }

    const novoFormSemanal = new FormularioSemanal(data);
    return await novoFormSemanal.save();
  }

  async getAllSemanal(userId) {
    return await FormularioSemanal.find({ userId });
  }

  async updateSemanal(id, data) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw { status: 400, message: "ID inválido." };
    }

    const form = await FormularioSemanal.findOneAndUpdate(
      { _id: id, userId: data.userId },
      data,
      { new: true }
    );

    if (!form) {
      throw { status: 404, message: "Formulário Semanal não encontrado." };
    }

    return form;
  }

  async deleteSemanal(id, userId) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw { status: 400, message: "ID inválido." };
    }

    const form = await FormularioSemanal.findOneAndDelete({ _id: id, userId });
    if (!form) {
      throw { status: 404, message: "Formulário Semanal não encontrado." };
    }

    return form;
  }
}

module.exports = new FormPSService();