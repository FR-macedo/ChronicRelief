/**
 * @swagger
 * tags:
 *   - name: Medicações
 *     description: Gestão de Medicações
 */

/**
 * @swagger
 * /medicacoes/create:
 *   post:
 *     summary: Cria uma nova medicação.
 *     tags: [Medicações]
 *     security:
 *       - bearerAuth: []  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Medicacao'
 *     responses:
 *       '201':
 *         description: Medicação criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medicacao'
 *       '400':
 *         description: Medicação já existente ou dados inválidos.
 */

/**
 * @swagger
 * /medicacoes:
 *   get:
 *     summary: Obtém todas as medicações do usuário.
 *     tags: [Medicações]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           description: Bearer Token
 *         required: true
 *     responses:
 *       '200':
 *         description: Lista de medicações.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Medicacao'
 *       '400':
 *         description: Erro ao obter medicações.
 *       '404':
 *         description: Nenhuma medicação encontrada.
 */

/**
 * @swagger
 * /medicacoes/{nome}:
 *   get:
 *     summary: Obtém uma medicação pelo nome.
 *     tags: [Medicações]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: nome
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome da medicação.
 *     responses:
 *       '200':
 *         description: Medicação encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medicacao'
 *       '404':
 *         description: Medicação não encontrada.
 */

/**
 * @swagger
 * /medicacoes/{id}:
 *   put:
 *     summary: Atualiza uma medicação.
 *     tags: [Medicações]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da medicação.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Medicacao'
 *     responses:
 *       '200':
 *         description: Medicação atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medicacao'
 *       '400':
 *         description: ID inválido ou dados inválidos.
 *       '404':
 *         description: Medicação não encontrada.
 */

/**
 * @swagger
 * /medicacoes/{id}:
 *   delete:
 *     summary: Deleta uma medicação.
 *     tags: [Medicações]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da medicação.
 *     responses:
 *       '200':
 *         description: Medicação deletada com sucesso.
 *       '400':
 *         description: ID inválido.
 *       '404':
 *         description: Medicação não encontrada.
 */

const mongoose = require('mongoose');
const Medicacao = require('../models/medicacao');

class MedicacaoService {
  async createMedicacao(medicacaoData) {
    const medicacaoExistente = await Medicacao.findOne({
      nome: medicacaoData.nome,
      userId: medicacaoData.userId
    });

    if (medicacaoExistente) {
      throw new Error('Medicação já existe');
    }

    const novaMedicacao = new Medicacao(medicacaoData);
    return await novaMedicacao.save();
  }

  async getAllMedicacoes(userId) {
    const medicamentos = await Medicacao.find({ userId });
    if (!medicamentos || medicamentos.length === 0) {
      throw new Error('Nenhuma medicação encontrada');
    }
    return medicamentos;
  }

  async getMedicacaoByNome(nome, userId) {
    const medicacao = await Medicacao.findOne({
      nome: { $regex: new RegExp("^" + nome + "$", "i") },
      userId
    });

    if (!medicacao) {
      throw new Error('Medicação não encontrada');
    }
    return medicacao;
  }

  async updateMedicacao(medicacaoId, userId, updateData) {
    if (!mongoose.Types.ObjectId.isValid(medicacaoId)) {
      throw new Error('ID inválido');
    }

    const medicacao = await Medicacao.findOne({
      _id: medicacaoId,
      userId
    });

    if (!medicacao) {
      throw new Error('Medicação não encontrada');
    }

    Object.assign(medicacao, updateData);
    return await medicacao.save();
  }

  async deleteMedicacao(medicacaoId, userId) {
    if (!mongoose.Types.ObjectId.isValid(medicacaoId)) {
      throw new Error('ID inválido');
    }

    const medicacao = await Medicacao.findOneAndDelete({
      _id: medicacaoId,
      userId
    });

    if (!medicacao) {
      throw new Error('Medicação não encontrada');
    }

    return medicacao;
  }
}

module.exports = MedicacaoService;