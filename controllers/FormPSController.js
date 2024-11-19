const formPSService = require('../services/FormPSService');

class FormPSController {
  // Controladores para FormPSDiario
  async createDiario(req, res) {
    try {
      const data = { ...req.body, userId: req.user.id };
      const result = await formPSService.createDiario(data);
      res.status(201).json({ message: "Formulário Diário criado!", form: result });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getAllDiario(req, res) {
    try {
      const forms = await formPSService.getAllDiario(req.user.id);
      res.status(200).json(forms);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async updateDiario(req, res) {
    try {
      const { id } = req.params;
      const data = { ...req.body, userId: req.user.id };
      const form = await formPSService.updateDiario(id, data);
      res.status(200).json({ message: "Formulário Diário atualizado!", form });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async deleteDiario(req, res) {
    try {
      const { id } = req.params;
      await formPSService.deleteDiario(id, req.user.id);
      res.status(200).json({ message: "Formulário Diário deletado com sucesso!" });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  // Controladores para FormPSSemanal
  async createSemanal(req, res) {
    try {
      const data = { ...req.body, userId: req.user.id };
      const result = await formPSService.createSemanal(data);
      res.status(201).json({ message: "Formulário Semanal criado!", form: result });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getAllSemanal(req, res) {
    try {
      const forms = await formPSService.getAllSemanal(req.user.id);
      res.status(200).json(forms);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async updateSemanal(req, res) {
    try {
      const { id } = req.params;
      const data = { ...req.body, userId: req.user.id };
      const form = await formPSService.updateSemanal(id, data);
      res.status(200).json({ message: "Formulário Semanal atualizado!", form });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async deleteSemanal(req, res) {
    try {
      const { id } = req.params;
      await formPSService.deleteSemanal(id, req.user.id);
      res.status(200).json({ message: "Formulário Semanal deletado com sucesso!" });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
}

module.exports = new FormPSController();