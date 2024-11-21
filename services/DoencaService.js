/**
 * @swagger
 * tags:
 *   - name: Doenças
 *     description: Gestão de Doenças
 */

/**
 * @swagger
 * /doencas/create:
 *   post:
 *     summary: Criar uma nova doença.
 *     tags: [Doenças]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Doenca'
 *     responses:
 *       '201':
 *         description: Doença criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DoencaResponse'
 *       '400':
 *         description: Essa doença já foi cadastrada para este usuário ou dados inválidos.
 */

/**
 * @swagger
 * /doencas:
 *   get:
 *     summary: Obter todas as doenças do usuário.
 *     tags: [Doenças]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de doenças.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Doenca'
 *       '404':
 *         description: Nenhuma doença encontrada para este usuário.
 */

/**
 * @swagger
 * /doencas/{nome}:
 *   get:
 *     summary: Obter uma doença pelo nome.
 *     tags: [Doenças]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: nome
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome da doença.
 *     responses:
 *       '200':
 *         description: Doença encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Doenca'
 *       '404':
 *         description: Doença não encontrada para este usuário.
 */

/**
 * @swagger
 * /doencas/{id}:
 *   put:
 *     summary: Atualizar uma doença.
 *     tags: [Doenças]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da doença.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Doenca'
 *     responses:
 *       '200':
 *         description: Doença atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DoencaResponse'
 *       '400':
 *         description: ID de doença inválido ou dados inválidos.
 *       '404':
 *         description: Doença não encontrada.
 */

/**
 * @swagger
 * /doencas/{id}:
 *   delete:
 *     summary: Deletar uma doença.
 *     tags: [Doenças]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da doença.
 *     responses:
 *       '200':
 *         description: Doença deletada com sucesso.
 *       '400':
 *         description: ID de doença inválido.
 *       '404':
 *         description: Doença não encontrada.
 */

const mongoose = require('mongoose');
const Doenca = require('../models/doencas');

class DoencaService {
  async create(doencaData) {
    const doencaExistente = await Doenca.findOne({ 
      nome: doencaData.nome, 
      userId: doencaData.userId 
    });

    if (doencaExistente) {
      throw { status: 400, message: "Essa doença já foi cadastrada para este usuário." };
    }

    const novaDoenca = new Doenca(doencaData);
    await novaDoenca.save();
    
    return {
      message: "Doença adicionada com sucesso!",
      doenca: novaDoenca
    };
  }

  async getAll(userId) {
    const doencas = await Doenca.find({ userId });
    if (!doencas || doencas.length === 0) {
      throw { status: 404, message: "Nenhuma doença encontrada para este usuário." };
    }
    return doencas;
  }

  async getByNome(nome, userId) {
    const doenca = await Doenca.findOne({ nome, userId });
    if (!doenca) {
      throw { status: 404, message: "Doença não encontrada para este usuário." };
    }
    return doenca;
  }

  async update(doencaId, userId, updateData) {
    if (!mongoose.Types.ObjectId.isValid(doencaId)) {
      throw { status: 400, message: "ID de doença inválido." };
    }

    const doenca = await Doenca.findOne({ 
      _id: doencaId, 
      userId 
    });

    if (!doenca) {
      throw { status: 404, message: "Doença não encontrada." };
    }

    Object.assign(doenca, updateData);
    await doenca.save();

    return {
      message: "Doença atualizada com sucesso!",
      doenca
    };
  }

  async delete(doencaId, userId) {
    if (!mongoose.Types.ObjectId.isValid(doencaId)) {
      throw { status: 400, message: "ID de doença inválido." };
    }

    const doenca = await Doenca.findOneAndDelete({ 
      _id: doencaId, 
      userId 
    });

    if (!doenca) {
      throw { status: 404, message: "Doença não encontrada." };
    }
  }
}

module.exports = new DoencaService();