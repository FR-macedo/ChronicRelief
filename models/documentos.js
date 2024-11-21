/**
 * @swagger
 * components:
 *   schemas:
 *     Documento:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID do documento (gerado automaticamente pelo MongoDB)
 *           readOnly: true # Indica que este campo é somente leitura
 *         filename:
 *           type: string
 *           description: Nome do arquivo
 *           example: 'meu_documento.pdf'
 *         usuario:
 *           type: string
 *           description: ID do usuário que enviou o documento
 *           example: '654321abcdef123456'
 *         contentType:
 *           type: string
 *           description: Tipo de conteúdo do arquivo (MIME type)
 *           example: 'application/pdf'
 *         data:
 *           type: string
 *           description: Dados do arquivo em formato base64
 *           example: 'JVBERi0xLj...' #Exemplo de base64 truncado
 *         uploadDate:
 *           type: string
 *           format: date-time
 *           description: Data e hora do upload
 *           example: '2024-10-27T10:30:00Z'
 *       required:
 *         - filename
 *         - usuario
 *         - contentType
 *         - data
 */

const mongoose = require('mongoose');


const documentoSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    contentType: { type: String, required: true },
    data: { type: String, required: true }, // Defina o campo para armazenar o base64
    uploadDate: { type: Date, default: Date.now },
});

const Documento = mongoose.model('Documento', documentoSchema);
module.exports = Documento;