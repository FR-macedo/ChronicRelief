/**
 * @swagger
 * tags:
 *   - name: Formulários MS
 *     description: Formulários de Monitoramento do Estresse
 */

/**
 * @swagger
 * /formMS/diario:
 *   post:
 *     summary: Criar um novo formulário diário MS.
 *     tags: [Formulários MS]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FormMSDiario'
 *     responses:
 *       '201':
 *         description: Formulário diário MS criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FormMSDiarioResponse'
 *       '400':
 *         description: Todos os campos obrigatórios devem ser preenchidos.
 */

/**
 * @swagger
 * /formMS/diario:
 *   get:
 *     summary: Obter todos os formulários diários MS do usuário.
 *     tags: [Formulários MS]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de formulários diários MS.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FormMSDiario'
 *       '404':
 *         description: Nenhum registro diário encontrado.
 */

/**
 * @swagger
 * /formMS/diario/{id}:
 *   put:
 *     summary: Atualizar um formulário diário MS.
 *     tags: [Formulários MS]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do formulário diário MS.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FormMSDiario'
 *     responses:
 *       '200':
 *         description: Formulário diário MS atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FormMSDiarioResponse'
 *       '400':
 *         description: ID inválido ou dados inválidos.
 *       '404':
 *         description: Registro diário não encontrado.
 */

/**
 * @swagger
 * /formMS/diario/{id}:
 *   delete:
 *     summary: Deletar um formulário diário MS.
 *     tags: [Formulários MS]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do formulário diário MS.
 *     responses:
 *       '200':
 *         description: Registro diário deletado com sucesso.
 *       '400':
 *         description: ID inválido.
 *       '404':
 *         description: Registro diário não encontrado.
 */


/**
 * @swagger
 * /formMS/semanal:
 *   post:
 *     summary: Criar um novo formulário semanal MS.
 *     tags: [Formulários MS]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FormMSSemanal'
 *     responses:
 *       '201':
 *         description: Formulário semanal MS criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FormMSSemanalResponse'
 *       '400':
 *         description: Todos os campos obrigatórios devem ser preenchidos.
 */

/**
 * @swagger
 * /formMS/semanal:
 *   get:
 *     summary: Obter todos os formulários semanais MS do usuário.
 *     tags: [Formulários MS]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de formulários semanais MS.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FormMSSemanal'
 *       '404':
 *         description: Nenhum registro semanal encontrado.
 */

/**
 * @swagger
 * /formMS/semanal/{id}:
 *   put:
 *     summary: Atualizar um formulário semanal MS.
 *     tags: [Formulários MS]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do formulário semanal MS.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FormMSSemanal'
 *     responses:
 *       '200':
 *         description: Formulário semanal MS atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FormMSSemanalResponse'
 *       '400':
 *         description: ID inválido ou dados inválidos.
 *       '404':
 *         description: Registro semanal não encontrado.
 */

/**
 * @swagger
 * /formMS/semanal/{id}:
 *   delete:
 *     summary: Deletar um formulário semanal MS.
 *     tags: [Formulários MS]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do formulário semanal MS.
 *     responses:
 *       '200':
 *         description: Registro semanal deletado com sucesso.
 *       '400':
 *         description: ID inválido.
 *       '404':
 *         description: Registro semanal não encontrado.
 */

const { FormularioDiarioMS, FormularioSemanalMS } = require('../models/formMS');
const mongoose = require('mongoose');

class FormMSService {
  // Validações comuns
  _validateId(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw { status: 400, message: "ID inválido." };
    }
  }

  _validateRequiredFieldsDiario(data) {
    const { nivelEstresse, sintomas, tecnicasGerenciamentoEstresse, humorGeral } = data;
    if (!nivelEstresse || !sintomas || !tecnicasGerenciamentoEstresse || !humorGeral) {
      throw { status: 400, message: "Todos os campos obrigatórios devem ser preenchidos." };
    }
  }

  _validateRequiredFieldsSemanal(data) {
    const { dataInicio, nivelEstresseMedio, fatoresAumentoEstresse, fatoresReducaoEstresse } = data;
    if (!dataInicio || !nivelEstresseMedio || !fatoresAumentoEstresse || !fatoresReducaoEstresse) {
      throw { status: 400, message: "Todos os campos obrigatórios devem ser preenchidos." };
    }
  }

  // Serviços para FormularioDiarioMS
  async createDiario(data) {
    this._validateRequiredFieldsDiario(data);
    const novoRegistro = new FormularioDiarioMS(data);
    await novoRegistro.save();
    return { message: "Registro diário criado com sucesso!", registro: novoRegistro };
  }

  async getAllDiario(userId) {
    const registros = await FormularioDiarioMS.find({ userId });
    if (registros.length === 0) {
      throw { status: 404, message: "Nenhum registro diário encontrado." };
    }
    return registros;
  }

  async updateDiario(id, userId, data) {
    this._validateId(id);
    this._validateRequiredFieldsDiario(data);
    
    const registroAtualizado = await FormularioDiarioMS.findOneAndUpdate(
      { _id: id, userId },
      data,
      { new: true }
    );

    if (!registroAtualizado) {
      throw { status: 404, message: "Registro diário não encontrado." };
    }

    return { message: "Registro diário atualizado com sucesso!", registro: registroAtualizado };
  }

  async deleteDiario(id, userId) {
    this._validateId(id);
    
    const registroRemovido = await FormularioDiarioMS.findOneAndDelete({ _id: id, userId });
    if (!registroRemovido) {
      throw { status: 404, message: "Registro diário não encontrado." };
    }
  }

  // Serviços para FormularioSemanalMS
  async createSemanal(data) {
    this._validateRequiredFieldsSemanal(data);
    const novoRegistro = new FormularioSemanalMS(data);
    await novoRegistro.save();
    return { message: "Registro semanal criado com sucesso!", registro: novoRegistro };
  }

  async getAllSemanal(userId) {
    const registros = await FormularioSemanalMS.find({ userId });
    if (registros.length === 0) {
      throw { status: 404, message: "Nenhum registro semanal encontrado." };
    }
    return registros;
  }

  async updateSemanal(id, userId, data) {
    this._validateId(id);
    this._validateRequiredFieldsSemanal(data);
    
    const registroAtualizado = await FormularioSemanalMS.findOneAndUpdate(
      { _id: id, userId },
      data,
      { new: true }
    );

    if (!registroAtualizado) {
      throw { status: 404, message: "Registro semanal não encontrado." };
    }

    return { message: "Registro semanal atualizado com sucesso!", registro: registroAtualizado };
  }

  async deleteSemanal(id, userId) {
    this._validateId(id);
    
    const registroRemovido = await FormularioSemanalMS.findOneAndDelete({ _id: id, userId });
    if (!registroRemovido) {
      throw { status: 404, message: "Registro semanal não encontrado." };
    }
  }
}

module.exports = FormMSService;