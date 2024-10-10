const express = require("express");
const User = require("../models/User");
const verifyToken = require("../middleware/authMiddleware"); // Importa o middleware
const router = express.Router();
const Doenca = require('../models/doencas');
const mongoose = require('mongoose'); // Importando mongoose



// Rota para criar uma nova doença e associá-la ao usuário autenticado
router.post("/create", verifyToken, async (req, res) => {
  const { nome, sintomas, dataDiagnostico } = req.body;

  try {
    // 1. Validação de campos obrigatórios
    if (!nome || !sintomas || !dataDiagnostico) {
      return res
        .status(400)
        .json({
          message:
            "Todos os campos são obrigatórios: nome, sintomas, dataDiagnostico.",
        });
    }

    // 2. Verificar se a doença já existe (se for necessário no seu caso)
    const doencaExistente = await Doenca.findOne({ nome, userId: req.user.id });
    if (doencaExistente) {
      return res
        .status(400)
        .json({ message: "Essa doença já foi cadastrada para este usuário." });
    }

    const usuario = await User.findById(req.user.id); // userId vindo do token JWT
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const novaDoenca = {
      doencaId: new mongoose.Types.ObjectId(),
      nome,
      sintomas,
      dataDiagnostico,
    };

    // Adiciona a nova doença ao usuário autenticado
    usuario.doencas.push(novaDoenca);
    await usuario.save();

    res
      .status(201)
      .json({ message: "Doença adicionada com sucesso!", doenca: novaDoenca });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao adicionar a doença.", error });
  }
});

// Rota para visualizar todas as doenças do usuário autenticado
router.get("/", verifyToken, async (req, res) => {
  try {
    const usuario = await User.findById(req.user.id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.status(200).json(usuario.doencas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar doenças.", error });
  }
});

// Rota para buscar uma doença pelo ID
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const doenca = await Doenca.findById(req.params.id);
    if (!doenca) {
      return res.status(404).json({ message: "Doença não encontrada" });
    }
    res.json(doenca);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar a doença", error });
  }
});

// Rota para buscar uma doença pelo nome
router.get("/nome/:nome", verifyToken, async (req, res) => {
  try {
    const doenca = await Doenca.findOne({ nome: req.params.nome });
    if (!doenca) {
      return res.status(404).json({ message: "Doença não encontrada" });
    }
    res.json(doenca);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar a doença", error });
  }
});

// Rota para atualizar uma doença existente do usuário autenticado
router.put("/update/:doencaId", verifyToken, async (req, res) => {
  const { doencaId } = req.params;
  const { nome, sintomas, dataDiagnostico } = req.body;

  try {
    const usuario = await User.findById(req.user.id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const doenca = usuario.doencas.id(doencaId);
    if (!doenca) {
      return res.status(404).json({ message: "Doença não encontrada." });
    }

    // Atualiza os dados da doença
    doenca.nome = nome || doenca.nome;
    doenca.sintomas = sintomas || doenca.sintomas;
    doenca.dataDiagnostico = dataDiagnostico || doenca.dataDiagnostico;

    await usuario.save();

    res.status(200).json({ message: "Doença atualizada com sucesso!", doenca });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar a doença.", error });
  }
});

// Rota para deletar uma doença existente do usuário autenticado
router.delete("/delete/:doencaId", verifyToken, async (req, res) => {
  const { doencaId } = req.params;

  try {
    const usuario = await User.findById(req.user.id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    // Remove a doença da lista de doenças do usuário
    usuario.doencas = usuario.doencas.filter(
      (doenca) => doenca._id.toString() !== doencaId
    );

    await usuario.save();

    res.status(200).json({ message: "Doença deletada com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar a doença.", error });
  }
});

module.exports = router;
