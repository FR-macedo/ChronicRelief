const Documento = require('../models/documentos');

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