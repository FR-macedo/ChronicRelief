/**
 * @swagger
 * tags:
 *   - name: Documentos
 *     description: Upload, busca e gestão de documentos
 */

/**
 * @swagger
 * /documentos:
 *   post:
 *     summary: Faz upload de um novo documento.
 *     tags: [Documentos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filename:
 *                 type: string
 *                 description: Nome do arquivo.
 *               contentType:
 *                 type: string
 *                 description: Tipo de conteúdo do arquivo (pdf).
 *               base64Data:
 *                 type: string
 *                 description: Dados do arquivo em formato base64.
 *     responses:
 *       '201':
 *         description: Documento enviado com sucesso.
 *       '400':
 *         description: Faltando informações no corpo da requisição.
 *       '500':
 *         description: Erro ao enviar o documento.
 */

/**
 * @swagger
 * /documentos:
 *   get:
 *     summary: Busca todos os documentos do usuário.
 *     tags: [Documentos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de documentos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Documento'
 *       '500':
 *         description: Erro ao buscar documentos.
 */

/**
 * @swagger
 * /documentos/{id}:
 *   get:
 *     summary: Busca um documento pelo ID.
 *     tags: [Documentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do documento.
 *     responses:
 *       '200':
 *         description: Documento encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Documento'
 *       '404':
 *         description: Documento não encontrado.
 *       '500':
 *         description: Erro ao buscar o documento.
 */

/**
 * @swagger
 * /documentos/{id}:
 *   put:
 *     summary: Atualiza um documento existente.
 *     tags: [Documentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do documento.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filename:
 *                 type: string
 *                 description: Nome do arquivo.
 *               contentType:
 *                 type: string
 *                 description: Tipo de conteúdo do arquivo (pdf).
 *               base64Data:
 *                 type: string
 *                 description: Dados do arquivo em formato base64.
 *     responses:
 *       '200':
 *         description: Documento atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Documento'
 *       '404':
 *         description: Documento não encontrado.
 *       '500':
 *         description: Erro ao atualizar o documento.
 */

/**
 * @swagger
 * /documentos/{id}:
 *   delete:
 *     summary: Deleta um documento.
 *     tags: [Documentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do documento.
 *     responses:
 *       '200':
 *         description: Documento deletado com sucesso.
 *       '404':
 *         description: Documento não encontrado.
 *       '500':
 *         description: Erro ao deletar o documento.
 */

const Documento = require("../models/documentos");

class DocumentoService {
  async uploadDocumento({ filename, contentType, base64Data, userId }) {
    const documento = new Documento({
      filename,
      usuario: userId,
      contentType,
      data: base64Data,
    });

    return await documento.save();
  }

  async buscarDocumentosPorUsuario(userId) {
    return await Documento.find({ usuario: userId });
  }

  async buscarDocumentoPorId(id) {
    return await Documento.findById(id);
  }

  async atualizarDocumento(id, dadosAtualizacao) {
    return await Documento.findByIdAndUpdate(
      id,
      {
        filename: dadosAtualizacao.filename,
        contentType: dadosAtualizacao.contentType,
        data: dadosAtualizacao.base64Data,
      },
      { new: true }
    );
  }

  async deletarDocumento(id) {
    return await Documento.findByIdAndDelete(id);
  }
}

module.exports = DocumentoService;
