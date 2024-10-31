const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const mongoose = require("mongoose");
const { FormPSDiario, FormPSSemanal } = require("../models/formPS");
const router = express.Router();

// CRUD para FormPSDiario

// Criar um novo Formulário Diário
router.post("/diario/create", verifyToken, async (req, res) => {
  const { dataRegistro, sintomas, outrosSintomas, observacoes } = req.body;
  try {
    if (!sintomas || !dataRegistro) {
      return res.status(400).json({ message: "Campos obrigatórios ausentes." });
    }

    const novoFormDiario = new FormPSDiario({
      userId: req.user.id,
      dataRegistro,
      sintomas,
      outrosSintomas,
      observacoes,
    });

    await novoFormDiario.save();
    res.status(201).json({ message: "Formulário Diário criado!", form: novoFormDiario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar formulário diário.", error });
  }
});

// Visualizar todos os Formulários Diários do usuário
router.get("/diario", verifyToken, async (req, res) => {
  try {
    const forms = await FormPSDiario.find({ userId: req.user.id });
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar formulários diários.", error });
  }
});

// Atualizar um Formulário Diário pelo ID
router.put("/diario/update/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { dataRegistro, sintomas, outrosSintomas, observacoes } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    const form = await FormPSDiario.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { dataRegistro, sintomas, outrosSintomas, observacoes },
      { new: true }
    );

    res.status(200).json({ message: "Formulário Diário atualizado!", form });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar formulário diário.", error });
  }
});

// Deletar um Formulário Diário pelo ID
router.delete("/diario/delete/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    const form = await FormPSDiario.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!form) {
      return res.status(404).json({ message: "Formulário Diário não encontrado." });
    }

    res.status(200).json({ message: "Formulário Diário deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar formulário diário.", error });
  }
});

// CRUD para FormPSSemanal

// Criar um novo Formulário Semanal
router.post("/semanal/create", verifyToken, async (req, res) => {
  const { dataConsultaAnterior, sintomas, outrosSintomas, observacoes } = req.body;
  try {
    if (!dataConsultaAnterior || !sintomas) {
      return res.status(400).json({ message: "Campos obrigatórios ausentes." });
    }

    const novoFormSemanal = new FormPSSemanal({
      userId: req.user.id,
      dataConsultaAnterior,
      sintomas,
      outrosSintomas,
      observacoes,
    });

    await novoFormSemanal.save();
    res.status(201).json({ message: "Formulário Semanal criado!", form: novoFormSemanal });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar formulário semanal.", error });
  }
});

// Visualizar todos os Formulários Semanais do usuário
router.get("/semanal", verifyToken, async (req, res) => {
  try {
    const forms = await FormPSSemanal.find({ userId: req.user.id });
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar formulários semanais.", error });
  }
});

// Atualizar um Formulário Semanal pelo ID
router.put("/semanal/update/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { dataConsultaAnterior, sintomas, outrosSintomas, observacoes } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    const form = await FormPSSemanal.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { dataConsultaAnterior, sintomas, outrosSintomas, observacoes },
      { new: true }
    );

    res.status(200).json({ message: "Formulário Semanal atualizado!", form });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar formulário semanal.", error });
  }
});

// Deletar um Formulário Semanal pelo ID
router.delete("/semanal/delete/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    const form = await FormPSSemanal.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!form) {
      return res.status(404).json({ message: "Formulário Semanal não encontrado." });
    }

    res.status(200).json({ message: "Formulário Semanal deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar formulário semanal.", error });
  }
});

module.exports = router;
