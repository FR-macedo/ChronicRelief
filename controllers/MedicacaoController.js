const MedicacaoService = require('../services/MedicacaoService');

class MedicacaoController {
  constructor() {
    this.medicacaoService = new MedicacaoService();
  }

  async create(req, res) {
    try {
      const {
        nome,
        dosagem,
        frequencia,
        horarioAlarme,
        dataInicio,
        dataFim,
        recorrencia,
      } = req.body;
      
      // Validação básica movida para o controller
      if (!nome || !dosagem || !frequencia || !horarioAlarme || !dataInicio || !dataFim) {
        return res.status(400).json({
          message: "Todos os campos são obrigatórios: nome, dosagem, frequencia, horarioAlarme, dataInicio, dataFim."
        });
      }

      const result = await this.medicacaoService.createMedicacao({
        userId: req.user.id,
        nome,
        dosagem,
        frequencia,
        horarioAlarme,
        dataInicio,
        dataFim,
        recorrencia
      });

      res.status(201).json({
        message: "Medicação adicionada com sucesso!",
        medicacao: result
      });
    } catch (error) {
      if (error.message === 'Medicação já existe') {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: "Erro ao adicionar a medicação.", error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const medicamentos = await this.medicacaoService.getAllMedicacoes(req.user.id);
      res.status(200).json(medicamentos);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar medicações.", error: error.message });
    }
  }

  async getByNome(req, res) {
    try {
      const medicacao = await this.medicacaoService.getMedicacaoByNome(req.params.nome, req.user.id);
      res.status(200).json(medicacao);
    } catch (error) {
      if (error.message === 'Medicação não encontrada') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: "Erro ao buscar a medicação.", error: error.message });
    }
  }

  async update(req, res) {
    try {
      const result = await this.medicacaoService.updateMedicacao(
        req.params.medicacaoId,
        req.user.id,
        req.body
      );
      res.status(200).json({ message: "Medicação atualizada com sucesso!", medicacao: result });
    } catch (error) {
      if (error.message === 'ID inválido' || error.message === 'Medicação não encontrada') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: "Erro ao atualizar a medicação.", error: error.message });
    }
  }

  async delete(req, res) {
    try {
      await this.medicacaoService.deleteMedicacao(req.params.medicacaoId, req.user.id);
      res.status(200).json({ message: "Medicação apagada com sucesso!" });
    } catch (error) {
      if (error.message === 'ID inválido' || error.message === 'Medicação não encontrada') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: "Erro ao apagar a medicação.", error: error.message });
    }
  }
}

module.exports = new MedicacaoController();