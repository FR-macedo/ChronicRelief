const express = require("express");
const verifyToken = require("../middleware/authMiddleware"); // Middleware para autenticação
const router = express.Router();
const { FormularioDiario, FormularioSemanal } = require("../models/formJP"); // Importando modelos
const mongoose = require("mongoose"); // Mongoose para validação de ObjectId

// CRUD para FormJPDiario

// Criar um novo registro diário
router.post("/diario/create", verifyToken, async (req, res) => {
  const { nivelAnsiedade, sintomas, outrosSintomas, tecnicasRelaxamento, outraTecnicaRelaxamento, tempoTecnicasRelaxamento, humorGeral, observacoes } = req.body;

  try {
    // Validação de campos obrigatórios
    if (!nivelAnsiedade || !sintomas || !tecnicasRelaxamento || !humorGeral) {
      return res.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos." });
    }

    const novoRegistro = new FormularioDiario({
      userId: req.user.id,
      nivelAnsiedade,
      sintomas,
      outrosSintomas,
      tecnicasRelaxamento,
      outraTecnicaRelaxamento,
      tempoTecnicasRelaxamento,
      humorGeral,
      observacoes,
    });

    await novoRegistro.save();
    res.status(201).json({ message: "Registro diário criado com sucesso!", registro: novoRegistro });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar o registro diário.", error });
  }
});

// Obter todos os registros diários do usuário autenticado
router.get("/diario", verifyToken, async (req, res) => {
  try {
    const registrosDiarios = await FormularioDiario.find({ userId: req.user.id });
    if (registrosDiarios.length === 0) {
      return res.status(404).json({ message: "Nenhum registro diário encontrado." });
    }
    res.status(200).json(registrosDiarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar registros diários.", error });
  }
});

// Atualizar um registro diário pelo ID
router.put("/diario/update/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { nivelAnsiedade, sintomas, outrosSintomas, tecnicasRelaxamento, outraTecnicaRelaxamento, tempoTecnicasRelaxamento, humorGeral, observacoes } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    const registroAtualizado = await FormularioDiario.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { nivelAnsiedade, sintomas, outrosSintomas, tecnicasRelaxamento, outraTecnicaRelaxamento, tempoTecnicasRelaxamento, humorGeral, observacoes },
      { new: true }
    );

    if (!registroAtualizado) {
      return res.status(404).json({ message: "Registro diário não encontrado." });
    }

    res.status(200).json({ message: "Registro diário atualizado com sucesso!", registro: registroAtualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar o registro diário.", error });
  }
});

// Deletar um registro diário pelo ID
router.delete("/diario/delete/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    const registroRemovido = await FormularioDiario.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!registroRemovido) {
      return res.status(404).json({ message: "Registro diário não encontrado." });
    }

    res.status(200).json({ message: "Registro diário deletado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar o registro diário.", error });
  }
});

// CRUD para FormJPSemanal

// Criar um novo registro semanal
router.post("/semanal/create", verifyToken, async (req, res) => {
  const { dataConsultaAnterior, nivelAnsiedadeMedia, fatoresAumentoAnsiedade, outrosFatoresAumentoAnsiedade, fatoresReducaoAnsiedade, outrosFatoresReducaoAnsiedade, observacoes } = req.body;

  try {
    if (!dataConsultaAnterior || !nivelAnsiedadeMedia || !fatoresAumentoAnsiedade || !fatoresReducaoAnsiedade) {
      return res.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos." });
    }

    const novoRegistroSemanal = new FormularioSemanal({
      userId: req.user.id,
      dataConsultaAnterior,
      nivelAnsiedadeMedia,
      fatoresAumentoAnsiedade,
      outrosFatoresAumentoAnsiedade,
      fatoresReducaoAnsiedade,
      outrosFatoresReducaoAnsiedade,
      observacoes,
    });

    await novoRegistroSemanal.save();
    res.status(201).json({ message: "Registro semanal criado com sucesso!", registro: novoRegistroSemanal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar o registro semanal.", error });
  }
});

// Obter todos os registros semanais do usuário autenticado
router.get("/semanal", verifyToken, async (req, res) => {
  try {
    const registrosSemanais = await FormularioSemanal.find({ userId: req.user.id });
    if (registrosSemanais.length === 0) {
      return res.status(404).json({ message: "Nenhum registro semanal encontrado." });
    }
    res.status(200).json(registrosSemanais);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar registros semanais.", error });
  }
});

// Atualizar um registro semanal pelo ID
router.put("/semanal/update/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { dataConsultaAnterior, nivelAnsiedadeMedia, fatoresAumentoAnsiedade, outrosFatoresAumentoAnsiedade, fatoresReducaoAnsiedade, outrosFatoresReducaoAnsiedade, observacoes } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    const registroSemanalAtualizado = await FormularioSemanal.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { dataConsultaAnterior, nivelAnsiedadeMedia, fatoresAumentoAnsiedade, outrosFatoresAumentoAnsiedade, fatoresReducaoAnsiedade, outrosFatoresReducaoAnsiedade, observacoes },
      { new: true }
    );

    if (!registroSemanalAtualizado) {
      return res.status(404).json({ message: "Registro semanal não encontrado." });
    }

    res.status(200).json({ message: "Registro semanal atualizado com sucesso!", registro: registroSemanalAtualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar o registro semanal.", error });
  }
});

// Deletar um registro semanal pelo ID
router.delete("/semanal/delete/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    const registroSemanalRemovido = await FormularioSemanal.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!registroSemanalRemovido) {
      return res.status(404).json({ message: "Registro semanal não encontrado." });
    }

    res.status(200).json({ message: "Registro semanal deletado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar o registro semanal.", error });
  }
});

module.exports = router;
