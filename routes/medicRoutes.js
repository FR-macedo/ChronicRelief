const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();
const Medicacao = require("../models/medicacao");
const mongoose = require("mongoose"); 

// Rota para criar uma nova medicação e associá-la ao usuário autenticado
router.post("/create", verifyToken, async (req, res) => {
  const { nome, dosagem, frequencia, horarioAlarme, dataInicio, dataFim, recorrencia } = req.body;
  try {
    // 1. Validação de campos obrigatórios
    if (!nome || !dosagem || !frequencia || !horarioAlarme || !dataInicio || !dataFim) {
      return res.status(400).json({
        message: "Todos os campos são obrigatórios: nome, dosagem, frequencia, horarioAlarme, dataInicio, dataFim.",
      });
    }

    // 2. Criar a nova medicação
    const novaMedicacao = new Medicacao({
      userId: req.user.id, // O userId é adicionado a partir do token do usuário autenticado
      nome,
      dosagem,
      frequencia,
      horarioAlarme,
      dataInicio,
      dataFim,
      recorrencia,
    });

    // 3. Salvar a nova medicação
    await novaMedicacao.save();

    // 4. Retornar resposta de sucesso
    res.status(201).json({
      message: "Medicação adicionada com sucesso!",
      medicacao: novaMedicacao,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao adicionar a medicação.", error });
  }
});

// Rota para visualizar todas as medicações do usuário autenticado
router.get("/", verifyToken, async (req, res) => {
  try {
    // Busca todas as medicações associadas ao userId do token
    const medicamentos = await Medicacao.find({ userId: req.user.id });
    if (!medicamentos || medicamentos.length === 0) {
      return res.status(404).json({ message: "Nenhuma medicação encontrada para este usuário." });
    }

    res.status(200).json(medicamentos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar medicações.", error });
  }
});

// Rota para buscar uma medicação pelo nome (específico para o usuário autenticado)
router.get("/:nome", verifyToken, async (req, res) => {
  try {
    // Busca uma medicação pelo nome e userId
    const medicacao = await Medicacao.findOne({ nome: req.params.nome, userId: req.user.id });
    if (!medicacao) {
      return res.status(404).json({ message: "Medicação não encontrada para este usuário." });
    }
    res.status(200).json(medicacao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar a medicação.", error });
  }
});

// Rota para atualizar uma medicação existente do usuário autenticado
router.put("/update/:medicacaoId", verifyToken, async (req, res) => {
    const { nome, dosagem, frequencia, horarioAlarme, dataInicio, dataFim, recorrencia } = req.body;
    const { medicacaoId } = req.params;
  
    try {
      // Verifica se o medicacaoId é um ObjectId válido antes de tentar a conversão
      if (!mongoose.Types.ObjectId.isValid(medicacaoId)) {
        return res.status(400).json({ message: "ID de medicação inválido." });
      }
  
      // Converte o medicacaoId para ObjectId
      const objectId = new mongoose.Types.ObjectId(medicacaoId);
  
      // Busca a medicação pelo ID e verifica se ela pertence ao usuário autenticado
      const medicacao = await Medicacao.findOne({ _id: objectId, userId: req.user.id });
      if (!medicacao) {
        return res.status(404).json({ message: "Medicação não encontrada." });
      }
  
      // Atualiza os dados da medicação apenas se novos valores forem fornecidos
      medicacao.nome = nome || medicacao.nome;
      medicacao.dosagem = dosagem || medicacao.dosagem;
      medicacao.frequencia = frequencia || medicacao.frequencia;
      medicacao.horarioAlarme = horarioAlarme || medicacao.horarioAlarme;
      medicacao.dataInicio = dataInicio || medicacao.dataInicio;
      medicacao.dataFim = dataFim || medicacao.dataFim;
      medicacao.recorrencia = recorrencia || medicacao.recorrencia;
  
      // Salva a medicação atualizada
      await medicacao.save();
  
      res.status(200).json({ message: "Medicação atualizada com sucesso!", medicacao });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao atualizar a medicação.", error });
    }
  });