const express = require("express");
const verifyToken = require("../middleware/authMiddleware"); // Importa o middleware
const router = express.Router();
const Doenca = require("../models/doencas"); // Importando o modelo Doenca
const mongoose = require("mongoose"); // Importando o mongoose para converter ObjectId

// Rota para criar uma nova doença e associá-la ao usuário autenticado
router.post("/create", verifyToken, async (req, res) => {
  const { nome, sintomas, dataDiagnostico } = req.body;
  try {
    // 1. Validação de campos obrigatórios
    if (!nome || !sintomas || !dataDiagnostico) {
      return res.status(400).json({
        message:
          "Todos os campos são obrigatórios: nome, sintomas, dataDiagnostico.",
      });
    }

    // 2. Verificar se a doença já existe para o usuário autenticado
    const doencaExistente = await Doenca.findOne({ nome, userId: req.user.id });
    if (doencaExistente) {
      return res
        .status(400)
        .json({ message: "Essa doença já foi cadastrada para este usuário." });
    }

    // 3. Criar a nova doença
    const novaDoenca = new Doenca({
      userId: req.user.id, // O userId é adicionado a partir do token do usuário autenticado
      nome,
      sintomas,
      dataDiagnostico,
    });

    // 4. Salvar a nova doença
    await novaDoenca.save();

    // 5. Retornar resposta de sucesso
    res.status(201).json({
      message: "Doença adicionada com sucesso!",
      doenca: novaDoenca,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao adicionar a doença.", error });
  }
});

// Rota para visualizar todas as doenças do usuário autenticado
router.get("/", verifyToken, async (req, res) => {
  try {
    // Busca todas as doenças associadas ao userId do token
    const doencas = await Doenca.find({ userId: req.user.id });
    if (!doencas || doencas.length === 0) {
      return res.status(404).json({ message: "Nenhuma doença encontrada para este usuário." });
    }

    res.status(200).json(doencas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar doenças.", error });
  }
});

// Rota para buscar uma doença pelo nome (específico para o usuário autenticado)
router.get("/:nome", verifyToken, async (req, res) => {
  try {
    // Busca uma doença pelo nome e userId
    const doenca = await Doenca.findOne({ nome: req.params.nome, userId: req.user.id });
    if (!doenca) {
      return res.status(404).json({ message: "Doença não encontrada para este usuário." });
    }
    res.status(200).json(doenca);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar a doença.", error });
  }
});

// Rota para atualizar uma doença existente do usuário autenticado
router.put("/update/:doencaId", verifyToken, async (req, res) => {
  const { nome, sintomas, dataDiagnostico } = req.body;
  const { doencaId } = req.params;

  try {
    // Verifica se o doencaId é um ObjectId válido antes de tentar a conversão
    if (!mongoose.Types.ObjectId.isValid(doencaId)) {
      return res.status(400).json({ message: "ID de doença inválido." });
    }

    // Converte o doencaId para ObjectId
    const objectId = new mongoose.Types.ObjectId(doencaId);

    // Busca a doença pelo ID e verifica se ela pertence ao usuário autenticado
    const doenca = await Doenca.findOne({ _id: objectId, userId: req.user.id });
    if (!doenca) {
      return res.status(404).json({ message: "Doença não encontrada." });
    }

    // Atualiza os dados da doença apenas se novos valores forem fornecidos
    doenca.nome = nome || doenca.nome;
    doenca.sintomas = sintomas || doenca.sintomas;
    doenca.dataDiagnostico = dataDiagnostico || doenca.dataDiagnostico;

    // Salva a doença atualizada
    await doenca.save();

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
    // Verifica se o doencaId é um ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(doencaId)) {
      return res.status(400).json({ message: "ID de doença inválido." });
    }

    // Converte o doencaId para ObjectId
    const objectId = new mongoose.Types.ObjectId(doencaId);

    // Busca e remove a doença associada ao userId do token
    const doenca = await Doenca.findOneAndDelete({ _id: objectId, userId: req.user.id });
    if (!doenca) {
      return res.status(404).json({ message: "Doença não encontrada." });
    }

    res.status(200).json({ message: "Doença deletada com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar a doença.", error });
  }
});

module.exports = router;
