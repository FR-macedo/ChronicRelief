/**
 * @swagger
 * tags:
 *   - name: Formulários PS
 *     description: Formulários de Avaliação PS
 */

/**
 * @swagger
 * /formPS/diario/create:
 *   post:
 *     summary: Criar um novo formulário diário PS.
 *     tags: [Formulários PS]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FormPSDiario'
 *     responses:
 *       '201':
 *         description: Formulário diário PS criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FormPSDiario'
 *       '400':
 *         description: Campos obrigatórios ausentes.
 */

/**
 * @swagger
 * /formPS/diario:
 *   get:
 *     summary: Obter todos os formulários diários PS do usuário.
 *     tags: [Formulários PS]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de formulários diários PS.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FormPSDiario'
 *       '404':
 *         description: Nenhum formulário diário PS encontrado.
 */

/**
 * @swagger
 * /formPS/diario/{id}:
 *   put:
 *     summary: Atualizar um formulário diário PS.
 *     tags: [Formulários PS]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do formulário diário PS.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FormPSDiario'
 *     responses:
 *       '200':
 *         description: Formulário diário PS atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FormPSDiario'
 *       '400':
 *         description: ID inválido ou dados inválidos.
 *       '404':
 *         description: Formulário diário PS não encontrado.
 */

/**
 * @swagger
 * /formPS/diario/{id}:
 *   delete:
 *     summary: Deletar um formulário diário PS.
 *     tags: [Formulários PS]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do formulário diário PS.
 *     responses:
 *       '200':
 *         description: Formulário diário PS deletado com sucesso.
 *       '400':
 *         description: ID inválido.
 *       '404':
 *         description: Formulário diário PS não encontrado.
 */


/**
 * @swagger
 * /formPS/semanal/create:
 *   post:
 *     summary: Criar um novo formulário semanal PS.
 *     tags: [Formulários PS]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FormPSSemanal'
 *     responses:
 *       '201':
 *         description: Formulário semanal PS criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FormPSSemanal'
 *       '400':
 *         description: Campos obrigatórios ausentes.
 */

/**
 * @swagger
 * /formPS/semanal:
 *   get:
 *     summary: Obter todos os formulários semanais PS do usuário.
 *     tags: [Formulários PS]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de formulários semanais PS.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FormPSSemanal'
 *       '404':
 *         description: Nenhum formulário semanal PS encontrado.
 */

/**
 * @swagger
 * /formPS/semanal/{id}:
 *   put:
 *     summary: Atualizar um formulário semanal PS.
 *     tags: [Formulários PS]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do formulário semanal PS.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FormPSSemanal'
 *     responses:
 *       '200':
 *         description: Formulário semanal PS atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FormPSSemanal'
 *       '400':
 *         description: ID inválido ou dados inválidos.
 *       '404':
 *         description: Formulário semanal PS não encontrado.
 */

/**
 * @swagger
 * /formPS/semanal/{id}:
 *   delete:
 *     summary: Deletar um formulário semanal PS.
 *     tags: [Formulários PS]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do formulário semanal PS.
 *     responses:
 *       '200':
 *         description: Formulário semanal PS deletado com sucesso.
 *       '400':
 *         description: ID inválido.
 *       '404':
 *         description: Formulário semanal PS não encontrado.
 */

const mongoose = require('mongoose');
const { FormularioDiario, FormularioSemanal } = require('../models/formPS');

class FormPSService {
  // Serviços para FormPSDiario
  async createDiario(data) {
    if (!data.sintomas) {
      throw { status: 400, message: "Campos obrigatórios ausentes." };
    }

    const novoFormDiario = new FormularioDiario(data);
    return await novoFormDiario.save();
  }

  async getAllDiario(userId) {
    return await FormularioDiario.find({ userId });
  }

  async updateDiario(id, data) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw { status: 400, message: "ID inválido." };
    }

    const form = await FormularioDiario.findOneAndUpdate(
      { _id: id, userId: data.userId },
      data,
      { new: true }
    );

    if (!form) {
      throw { status: 404, message: "Formulário Diário não encontrado." };
    }

    return form;
  }

  async deleteDiario(id, userId) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw { status: 400, message: "ID inválido." };
    }

    const form = await FormularioDiario.findOneAndDelete({ _id: id, userId });
    if (!form) {
      throw { status: 404, message: "Formulário Diário não encontrado." };
    }

    return form;
  }

  // Serviços para FormPSSemanal
  async createSemanal(data) {
    if (!data.dataConsultaAnterior || !data.sintomas) {
      throw { status: 400, message: "Campos obrigatórios ausentes." };
    }

    const novoFormSemanal = new FormularioSemanal(data);
    return await novoFormSemanal.save();
  }

  async getAllSemanal(userId) {
    return await FormularioSemanal.find({ userId });
  }

  async updateSemanal(id, data) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw { status: 400, message: "ID inválido." };
    }

    const form = await FormularioSemanal.findOneAndUpdate(
      { _id: id, userId: data.userId },
      data,
      { new: true }
    );

    if (!form) {
      throw { status: 404, message: "Formulário Semanal não encontrado." };
    }

    return form;
  }

  async deleteSemanal(id, userId) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw { status: 400, message: "ID inválido." };
    }

    const form = await FormularioSemanal.findOneAndDelete({ _id: id, userId });
    if (!form) {
      throw { status: 404, message: "Formulário Semanal não encontrado." };
    }

    return form;
  }
}

module.exports = new FormPSService();