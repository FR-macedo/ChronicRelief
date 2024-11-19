const DocumentoService = require('../services/DocumentoService');

class DocumentoController {
    constructor() {
        this.documentoService = new DocumentoService();
    }

    async upload(req, res) {
        try {
            const { filename, contentType, base64Data } = req.body;
            const userId = req.user.id;

            if (!filename || !contentType || !base64Data) {
                return res.status(400).json({ message: 'Faltando informações no corpo da requisição.' });
            }

            const result = await this.documentoService.uploadDocumento({
                filename,
                contentType,
                base64Data,
                userId
            });

            res.status(201).json({ message: 'Documento enviado com sucesso!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao enviar documento.', error });
        }
    }

    async listarDocumentos(req, res) {
        try {
            const documentos = await this.documentoService.buscarDocumentosPorUsuario(req.user._id);
            res.json(documentos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao buscar documentos.", error });
        }
    }

    async buscarDocumento(req, res) {
        try {
            const documento = await this.documentoService.buscarDocumentoPorId(req.params.id);
            
            if (!documento) {
                return res.status(404).json({ message: "Documento não encontrado." });
            }

            if (documento.usuario.toString() !== req.user.id.toString()) {
                return res.status(403).json({ message: "Acesso negado." });
            }

            res.json(documento);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao buscar documento.", error });
        }
    }

    async atualizarDocumento(req, res) {
        try {
            const { filename, contentType, base64Data } = req.body;
            const documento = await this.documentoService.atualizarDocumento(req.params.id, {
                filename,
                contentType,
                base64Data
            });

            if (!documento) {
                return res.status(404).json({ message: "Documento não encontrado." });
            }

            res.json(documento);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao atualizar documento.", error });
        }
    }

    async deletarDocumento(req, res) {
        try {
            const resultado = await this.documentoService.deletarDocumento(req.params.id);

            if (!resultado) {
                return res.status(404).json({ message: 'Documento não encontrado.' });
            }

            res.json({ message: 'Documento deletado com sucesso.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao deletar documento.', error });
        }
    }

    async downloadDocumento(req, res) {
        try {
            const documento = await this.documentoService.buscarDocumentoPorId(req.params.id);
            
            if (!documento) {
                return res.status(404).json({ message: 'Documento não encontrado.' });
            }

            if (documento.usuario.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'Acesso negado.' });
            }

            res.json({
                filename: documento.filename,
                contentType: documento.contentType,
                data: documento.data,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao baixar documento.', error });
        }
    }
}

module.exports = DocumentoController;