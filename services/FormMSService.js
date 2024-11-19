const { FormularioDiarioMS, FormularioSemanalMS } = require('../models/formMS');
const mongoose = require('mongoose');

class FormMSService {
  // Validações comuns
  _validateId(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw { status: 400, message: "ID inválido." };
    }
  }

  _validateRequiredFieldsDiario(data) {
    const { nivelEstresse, sintomas, tecnicasGerenciamentoEstresse, humorGeral } = data;
    if (!nivelEstresse || !sintomas || !tecnicasGerenciamentoEstresse || !humorGeral) {
      throw { status: 400, message: "Todos os campos obrigatórios devem ser preenchidos." };
    }
  }

  _validateRequiredFieldsSemanal(data) {
    const { dataInicio, nivelEstresseMedio, fatoresAumentoEstresse, fatoresReducaoEstresse } = data;
    if (!dataInicio || !nivelEstresseMedio || !fatoresAumentoEstresse || !fatoresReducaoEstresse) {
      throw { status: 400, message: "Todos os campos obrigatórios devem ser preenchidos." };
    }
  }

  // Serviços para FormularioDiarioMS
  async createDiario(data) {
    this._validateRequiredFieldsDiario(data);
    const novoRegistro = new FormularioDiarioMS(data);
    await novoRegistro.save();
    return { message: "Registro diário criado com sucesso!", registro: novoRegistro };
  }

  async getAllDiario(userId) {
    const registros = await FormularioDiarioMS.find({ userId });
    if (registros.length === 0) {
      throw { status: 404, message: "Nenhum registro diário encontrado." };
    }
    return registros;
  }

  async updateDiario(id, userId, data) {
    this._validateId(id);
    this._validateRequiredFieldsDiario(data);
    
    const registroAtualizado = await FormularioDiarioMS.findOneAndUpdate(
      { _id: id, userId },
      data,
      { new: true }
    );

    if (!registroAtualizado) {
      throw { status: 404, message: "Registro diário não encontrado." };
    }

    return { message: "Registro diário atualizado com sucesso!", registro: registroAtualizado };
  }

  async deleteDiario(id, userId) {
    this._validateId(id);
    
    const registroRemovido = await FormularioDiarioMS.findOneAndDelete({ _id: id, userId });
    if (!registroRemovido) {
      throw { status: 404, message: "Registro diário não encontrado." };
    }
  }

  // Serviços para FormularioSemanalMS
  async createSemanal(data) {
    this._validateRequiredFieldsSemanal(data);
    const novoRegistro = new FormularioSemanalMS(data);
    await novoRegistro.save();
    return { message: "Registro semanal criado com sucesso!", registro: novoRegistro };
  }

  async getAllSemanal(userId) {
    const registros = await FormularioSemanalMS.find({ userId });
    if (registros.length === 0) {
      throw { status: 404, message: "Nenhum registro semanal encontrado." };
    }
    return registros;
  }

  async updateSemanal(id, userId, data) {
    this._validateId(id);
    this._validateRequiredFieldsSemanal(data);
    
    const registroAtualizado = await FormularioSemanalMS.findOneAndUpdate(
      { _id: id, userId },
      data,
      { new: true }
    );

    if (!registroAtualizado) {
      throw { status: 404, message: "Registro semanal não encontrado." };
    }

    return { message: "Registro semanal atualizado com sucesso!", registro: registroAtualizado };
  }

  async deleteSemanal(id, userId) {
    this._validateId(id);
    
    const registroRemovido = await FormularioSemanalMS.findOneAndDelete({ _id: id, userId });
    if (!registroRemovido) {
      throw { status: 404, message: "Registro semanal não encontrado." };
    }
  }
}

module.exports = FormMSService;