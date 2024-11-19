const FormJPService = require('../services/FormJPService');

class FormJPDiarioController {
    constructor(formJPDiarioService) {
      this.formJPDiarioService = formJPDiarioService;
    }
  
    async createFormDiario(req, res) {
      try {
        const { nivelAnsiedade, sintomas, outrosSintomas, tecnicasRelaxamento, 
                outraTecnicaRelaxamento, tempoTecnicasRelaxamento, humorGeral, observacoes } = req.body;
        const userId = req.user.id;
  
        if (!nivelAnsiedade || !sintomas || !tecnicasRelaxamento || !humorGeral) {
          return res.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos." });
        }
  
        const novoRegistro = await this.formJPDiarioService.createFormDiario({
          userId,
          nivelAnsiedade,
          sintomas,
          outrosSintomas,
          tecnicasRelaxamento,
          outraTecnicaRelaxamento,
          tempoTecnicasRelaxamento,
          humorGeral,
          observacoes
        });
  
        res.status(201).json({ message: "Registro diário criado com sucesso!", registro: novoRegistro });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao criar o registro diário.", error });
      }
    }
  
    async getAllFormsDiario(req, res) {
      try {
        const registros = await this.formJPDiarioService.getAllFormsDiario(req.user.id);
        if (registros.length === 0) {
          return res.status(404).json({ message: "Nenhum registro diário encontrado." });
        }
        res.status(200).json(registros);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar registros diários.", error });
      }
    }
  
    async updateFormDiario(req, res) {
      try {
        const { id } = req.params;
        const userId = req.user.id;
        const updateData = req.body;
  
        const registroAtualizado = await this.formJPDiarioService.updateFormDiario(id, userId, updateData);
        
        if (!registroAtualizado) {
          return res.status(404).json({ message: "Registro diário não encontrado." });
        }
  
        res.status(200).json({ 
          message: "Registro diário atualizado com sucesso!", 
          registro: registroAtualizado 
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao atualizar o registro diário.", error });
      }
    }
  
    async deleteFormDiario(req, res) {
      try {
        const { id } = req.params;
        const userId = req.user.id;
  
        const deleted = await this.formJPDiarioService.deleteFormDiario(id, userId);
        
        if (!deleted) {
          return res.status(404).json({ message: "Registro diário não encontrado." });
        }
  
        res.status(200).json({ message: "Registro diário deletado com sucesso!" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao deletar o registro diário.", error });
      }
    }
  }
  
  class FormJPSemanalController {
    constructor(formJPSemanalService) {
      this.formJPSemanalService = formJPSemanalService;
    }
  
    async createFormSemanal(req, res) {
      try {
        const { dataConsultaAnterior, nivelAnsiedadeMedia, fatoresAumentoAnsiedade,
                outrosFatoresAumentoAnsiedade, fatoresReducaoAnsiedade, 
                outrosFatoresReducaoAnsiedade, observacoes } = req.body;
        const userId = req.user.id;
  
        if (!dataConsultaAnterior || !nivelAnsiedadeMedia || 
            !fatoresAumentoAnsiedade || !fatoresReducaoAnsiedade) {
          return res.status(400).json({ 
            message: "Todos os campos obrigatórios devem ser preenchidos." 
          });
        }
  
        const novoRegistro = await this.formJPSemanalService.createFormSemanal({
          userId,
          dataConsultaAnterior,
          nivelAnsiedadeMedia,
          fatoresAumentoAnsiedade,
          outrosFatoresAumentoAnsiedade,
          fatoresReducaoAnsiedade,
          outrosFatoresReducaoAnsiedade,
          observacoes
        });
  
        res.status(201).json({ 
          message: "Registro semanal criado com sucesso!", 
          registro: novoRegistro 
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao criar o registro semanal.", error });
      }
    }
  
    async getAllFormsSemanal(req, res) {
      try {
        const registros = await this.formJPSemanalService.getAllFormsSemanal(req.user.id);
        if (registros.length === 0) {
          return res.status(404).json({ message: "Nenhum registro semanal encontrado." });
        }
        res.status(200).json(registros);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar registros semanais.", error });
      }
    }
  
    async updateFormSemanal(req, res) {
      try {
        const { id } = req.params;
        const userId = req.user.id;
        const updateData = req.body;
  
        const registroAtualizado = await this.formJPSemanalService.updateFormSemanal(
          id, 
          userId, 
          updateData
        );
        
        if (!registroAtualizado) {
          return res.status(404).json({ message: "Registro semanal não encontrado." });
        }
  
        res.status(200).json({ 
          message: "Registro semanal atualizado com sucesso!", 
          registro: registroAtualizado 
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao atualizar o registro semanal.", error });
      }
    }
  
    async deleteFormSemanal(req, res) {
      try {
        const { id } = req.params;
        const userId = req.user.id;
  
        const deleted = await this.formJPSemanalService.deleteFormSemanal(id, userId);
        
        if (!deleted) {
          return res.status(404).json({ message: "Registro semanal não encontrado." });
        }
  
        res.status(200).json({ message: "Registro semanal deletado com sucesso!" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao deletar o registro semanal.", error });
      }
    }
  }
  
  module.exports = { FormJPDiarioController, FormJPSemanalController };