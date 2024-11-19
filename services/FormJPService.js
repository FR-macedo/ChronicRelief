// services/formJPService.js

const mongoose = require('mongoose');

class FormJPDiarioService {
  constructor(FormularioDiario) {
    this.FormularioDiario = FormularioDiario;
  }

  async createFormDiario(formData) {
    const novoRegistro = new this.FormularioDiario(formData);
    return await novoRegistro.save();
  }

  async getAllFormsDiario(userId) {
    return await this.FormularioDiario.find({ userId });
  }

  async updateFormDiario(id, userId, updateData) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("ID inválido");
    }

    return await this.FormularioDiario.findOneAndUpdate(
      { _id: id, userId },
      updateData,
      { new: true }
    );
  }

  async deleteFormDiario(id, userId) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("ID inválido");
    }

    return await this.FormularioDiario.findOneAndDelete({ _id: id, userId });
  }
}

class FormJPSemanalService {
  constructor(FormularioSemanal) {
    this.FormularioSemanal = FormularioSemanal;
  }

  async createFormSemanal(formData) {
    const novoRegistro = new this.FormularioSemanal(formData);
    return await novoRegistro.save();
  }

  async getAllFormsSemanal(userId) {
    return await this.FormularioSemanal.find({ userId });
  }

  async updateFormSemanal(id, userId, updateData) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("ID inválido");
    }

    return await this.FormularioSemanal.findOneAndUpdate(
      { _id: id, userId },
      updateData,
      { new: true }
    );
  }

  async deleteFormSemanal(id, userId) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("ID inválido");
    }

    return await this.FormularioSemanal.findOneAndDelete({ _id: id, userId });
  }
}

module.exports = { FormJPDiarioService, FormJPSemanalService };