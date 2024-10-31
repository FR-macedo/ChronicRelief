const express = require("express");
const verifyToken = require("../middleware/authMiddleware"); // Middleware para autenticação
const router = express.Router();
const { FormularioDiarioMS, FormularioSemanalMS } = require("../models/formMS"); // Importando modelos
const mongoose = require("mongoose"); // Mongoose para validação de ObjectId

// CRUD para FormMSDiario

// Criar um novo registro diário
router.post("/diario/create", verifyToken, async (req, res) => {
  const { nivelEstresse, sintomas, tecnicasGerenciamentoEstresse, outrasTecnicas, tempoTecnicas, humorGeral, observacoes } = req.body;

  try {
    // Validação de campos obrigatórios
    if (!nivelEstresse || !sintomas || !tecnicasGerenciamentoEstresse || !humorGeral) {
      return res.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos." });
    }

    const novoRegistro = new FormularioDiarioMS({
      userId: req.user.id,
      nivelEstresse,
      sintomas,
      tecnicasGerenciamentoEstresse,
      outrasTecnicas,
      tempoTecnicas,
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
    const registrosDiarios = await FormularioDiarioMS.find({ userId: req.user.id });
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
  const { nivelEstresse, sintomas, tecnicasGerenciamentoEstresse, outrasTecnicas, tempoTecnicas, humorGeral, observacoes } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    const registroAtualizado = await FormularioDiarioMS.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { nivelEstresse, sintomas, tecnicasGerenciamentoEstresse, outrasTecnicas, tempoTecnicas, humorGeral, observacoes },
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

    const registroRemovido = await FormularioDiarioMS.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!registroRemovido) {
      return res.status(404).json({ message: "Registro diário não encontrado." });
    }

    res.status(200).json({ message: "Registro diário deletado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar o registro diário.", error });
  }
});

// CRUD para FormMSSemanal

// Criar um novo registro semanal
router.post("/semanal/create", verifyToken, async (req, res) => {
  const { dataInicio, nivelEstresseMedio, fatoresAumentoEstresse, outrosFatoresAumento, fatoresReducaoEstresse, outrosFatoresReducao, observacoes } = req.body;

  try {
    if (!dataInicio || !nivelEstresseMedio || !fatoresAumentoEstresse || !fatoresReducaoEstresse) {
      return res.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos." });
    }

    const novoRegistroSemanal = new FormularioSemanalMS({
      userId: req.user.id,
      dataInicio,
      nivelEstresseMedio,
      fatoresAumentoEstresse,
      outrosFatoresAumento,
      fatoresReducaoEstresse,
      outrosFatoresReducao,
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
    const registrosSemanais = await FormularioSemanalMS.find({ userId: req.user.id });
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
  const { dataInicio, nivelEstresseMedio, fatoresAumentoEstresse, outrosFatoresAumento, fatoresReducaoEstresse, outrosFatoresReducao, observacoes } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    const registroSemanalAtualizado = await FormularioSemanalMS.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { dataInicio, nivelEstresseMedio, fatoresAumentoEstresse, outrosFatoresAumento, fatoresReducaoEstresse, outrosFatoresReducao, observacoes },
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

    const registroSemanalRemovido = await FormularioSemanalMS.findOneAndDelete({ _id: id, userId: req.user.id });
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
