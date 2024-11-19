const DoencaService = require('../services/DoencaService');

class DoencaController {
  async create(req, res) {
    try {
      const { nome, sintomas, dataDiagnostico } = req.body;
      const userId = req.user.id;

      if (!nome || !sintomas || !dataDiagnostico) {
        return res.status(400).json({
          message: "Todos os campos são obrigatórios: nome, sintomas, dataDiagnostico."
        });
      }

      const result = await DoencaService.create({ nome, sintomas, dataDiagnostico, userId });
      res.status(201).json(result);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const userId = req.user.id;
      const doencas = await DoencaService.getAll(userId);
      res.status(200).json(doencas);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getByNome(req, res) {
    try {
      const { nome } = req.params;
      const userId = req.user.id;
      const doenca = await DoencaService.getByNome(nome, userId);
      res.status(200).json(doenca);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { doencaId } = req.params;
      const userId = req.user.id;
      const updateData = req.body;
      
      const doenca = await DoencaService.update(doencaId, userId, updateData);
      res.status(200).json(doenca);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { doencaId } = req.params;
      const userId = req.user.id;
      
      await DoencaService.delete(doencaId, userId);
      res.status(200).json({ message: "Doença deletada com sucesso!" });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
}

module.exports = new DoencaController();