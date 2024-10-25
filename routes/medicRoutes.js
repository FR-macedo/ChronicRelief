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
      medicacao_Id: new mongoose.Types.ObjectId,
      userId: req.user.id, // O userId é adicionado a partir do token do usuário autenticado
      nome,
      dosagem,
      frequencia,
      horarioAlarme,
      dataInicio,
      dataFim,
      recorrencia: recorrencia || null  //como recorrencia não está sendo checado no envio, adicionei para que ele ficasse como null, caso não enviado
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
    const nome = req.params.nome;

    // Busca uma medicação pelo nome (ignora maiúsculas/minúsculas)
    const medicacao = await Medicacao.findOne({
      nome: { $regex: new RegExp("^" + nome + "$", "i") }, // Busca case insensitive
      userId: req.user.id,
    });

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
    // Verifica se o medicacaoId é um ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(medicacaoId)) {
      return res.status(400).json({ message: "ID de medicação inválido." });
    }

    // Faz o casting de medicacaoId para ObjectId
    const objectId = new mongoose.Types.ObjectId(medicacaoId);

    // Busca e verifica se a medicação pertence ao usuário autenticado
    const medicacao = await Medicacao.findOneAndUpdate({ medicacao_Id: objectId, userId: req.user.id });

    if (!medicacao) {
      return res.status(404).json({ message: "Medicação não encontrada." });
    }

    // Atualiza os campos fornecidos
    medicacao.nome = nome || medicacao.nome;
    medicacao.dosagem = dosagem || medicacao.dosagem;
    medicacao.frequencia = frequencia || medicacao.frequencia;
    medicacao.horarioAlarme = horarioAlarme || medicacao.horarioAlarme;
    medicacao.dataInicio = dataInicio || medicacao.dataInicio;
    medicacao.dataFim = dataFim || medicacao.dataFim;
    medicacao.recorrencia = recorrencia || medicacao.recorrencia;

    // Salva as alterações
    await medicacao.save();

    res.status(200).json({ message: "Medicação atualizada com sucesso!", medicacao });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar a medicação.", error });
  }
});


// Rota para apagar uma medicação existente do usuário autenticado
router.delete("/delete/:medicacaoId", verifyToken, async (req, res) => {
  const { medicacaoId } = req.params;

  try {
    // Verifica se o medicacaoId é um ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(medicacaoId)) {
      return res.status(400).json({ message: "ID de medicação inválido." });
    }

    // Busca a medicação pelo ID e verifica se ela pertence ao usuário autenticado
    const medicacao = await Medicacao.findOne({ _id: medicacaoId, userId: req.user.id });

    if (!medicacao) {
      return res.status(404).json({ message: "Medicação não encontrada." });
    }

    // Remove a medicação do banco de dados
    await Medicacao.deleteOne({ _id: medicacaoId });

    res.status(200).json({ message: "Medicação apagada com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao apagar a medicação.", error });
  }
});

module.exports = router;