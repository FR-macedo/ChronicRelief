/**
 * @swagger
 * tags:
 *   - name: Formulários JP
 *     description: Formulários de Avaliação da Ansiedade
 */

/**
 * @swagger
 * /formJP/diario/create:
 *   post:
 *     summary: Criar um novo formulário diário JP.
 *     tags: [Formulários JP]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FormJPDiario'
 *     responses:
 *       '201':
 *         description: Formulário diário JP criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FormJPDiario'
 *       '500':
 *         description: Erro ao criar o formulário.
 */

/**
 * @swagger
 * /formJP/diario:
 *   get:
 *     summary: Obter todos os formulários diários JP do usuário.
 *     tags: [Formulários JP]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de formulários diários JP.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FormJPDiario'
 *       '500':
 *         description: Erro ao obter os formulários.
 */

/**
 * @swagger
 * /formJP/diario/{id}:
 *   put:
 *     summary: Atualizar um formulário diário JP.
 *     tags: [Formulários JP]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do formulário diário JP.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FormJPDiario'
 *     responses:
 *       '200':
 *         description: Formulário diário JP atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FormJPDiario'
 *       '400':
 *         description: ID inválido.
 *       '500':
 *         description: Erro ao atualizar o formulário.
 */

/**
 * @swagger
 * /formJP/diario/{id}:
 *   delete:
 *     summary: Deletar um formulário diário JP.
 *     tags: [Formulários JP]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do formulário diário JP.
 *     responses:
 *       '200':
 *         description: Formulário diário JP deletado com sucesso.
 *       '400':
 *         description: ID inválido.
 *       '500':
 *         description: Erro ao deletar o formulário.
 */


/**
 * @swagger
 * /formJP/semanal/create:
 *   post:
 *     summary: Criar um novo formulário semanal JP.
 *     tags: [Formulários JP]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FormJPSemanal'
 *     responses:
 *       '201':
 *         description: Formulário semanal JP criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FormJPSemanal'
 *       '500':
 *         description: Erro ao criar o formulário.
 */

/**
 * @swagger
 * /formJP/semanal:
 *   get:
 *     summary: Obter todos os formulários semanais JP do usuário.
 *     tags: [Formulários JP]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de formulários semanais JP.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FormJPSemanal'
 *       '500':
 *         description: Erro ao obter os formulários.
 */

/**
 * @swagger
 * /formJP/semanal/{id}:
 *   put:
 *     summary: Atualizar um formulário semanal JP.
 *     tags: [Formulários JP]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do formulário semanal JP.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FormJPSemanal'
 *     responses:
 *       '200':
 *         description: Formulário semanal JP atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FormJPSemanal'
 *       '400':
 *         description: ID inválido.
 *       '500':
 *         description: Erro ao atualizar o formulário.
 */

/**
 * @swagger
 * /formJP/semanal/{id}:
 *   delete:
 *     summary: Deletar um formulário semanal JP.
 *     tags: [Formulários JP]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do formulário semanal JP.
 *     responses:
 *       '200':
 *         description: Formulário semanal JP deletado com sucesso.
 *       '400':
 *         description: ID inválido.
 *       '500':
 *         description: Erro ao deletar o formulário.
 */

const mongoose = require('mongoose');

class FormJPDiarioService {
  constructor(FormularioDiario) {
    this.FormularioDiario = FormularioDiario;
  }

  async createFormDiario(formData) {
    const novoRegistro = new this.FormularioDiario(formData);
    return await novoRegistro.save();
  }

  async getAllFormsDiario(userId) {
    return await this.FormularioDiario.find({ userId });
  }

  async updateFormDiario(id, userId, updateData) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("ID inválido");
    }

    return await this.FormularioDiario.findOneAndUpdate(
      { _id: id, userId },
      updateData,
      { new: true }
    );
  }

  async deleteFormDiario(id, userId) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("ID inválido");
    }

    return await this.FormularioDiario.findOneAndDelete({ _id: id, userId });
  }
}

class FormJPSemanalService {
  constructor(FormularioSemanal) {
    this.FormularioSemanal = FormularioSemanal;
  }

  async createFormSemanal(formData) {
    const novoRegistro = new this.FormularioSemanal(formData);
    return await novoRegistro.save();
  }

  async getAllFormsSemanal(userId) {
    return await this.FormularioSemanal.find({ userId });
  }

  async updateFormSemanal(id, userId, updateData) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("ID inválido");
    }

    return await this.FormularioSemanal.findOneAndUpdate(
      { _id: id, userId },
      updateData,
      { new: true }
    );
  }

  async deleteFormSemanal(id, userId) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("ID inválido");
    }

    return await this.FormularioSemanal.findOneAndDelete({ _id: id, userId });
  }
}

module.exports = { FormJPDiarioService, FormJPSemanalService };