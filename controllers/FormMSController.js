const FormMSService = require('../services/FormMSService');

class FormMSController {
  constructor() {
    this.formMSService = new FormMSService();
  }

  // Controladores para FormularioDiarioMS
  async createDiario(req, res) {
    try {
      const data = {
        userId: req.user.id,
        ...req.body
      };
      const result = await this.formMSService.createDiario(data);
      res.status(201).json(result);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getAllDiario(req, res) {
    try {
      const registros = await this.formMSService.getAllDiario(req.user.id);
      res.status(200).json(registros);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async updateDiario(req, res) {
    try {
      const result = await this.formMSService.updateDiario(req.params.id, req.user.id, req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async deleteDiario(req, res) {
    try {
      await this.formMSService.deleteDiario(req.params.id, req.user.id);
      res.status(200).json({ message: "Registro diário deletado com sucesso!" });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  // Controladores para FormularioSemanalMS
  async createSemanal(req, res) {
    try {
      const data = {
        userId: req.user.id,
        ...req.body
      };
      const result = await this.formMSService.createSemanal(data);
      res.status(201).json(result);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getAllSemanal(req, res) {
    try {
      const registros = await this.formMSService.getAllSemanal(req.user.id);
      res.status(200).json(registros);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async updateSemanal(req, res) {
    try {
      const result = await this.formMSService.updateSemanal(req.params.id, req.user.id, req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async deleteSemanal(req, res) {
    try {
      await this.formMSService.deleteSemanal(req.params.id, req.user.id);
      res.status(200).json({ message: "Registro semanal deletado com sucesso!" });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
}

module.exports = new FormMSController();