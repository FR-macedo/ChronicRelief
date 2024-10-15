// Importando dotenv para carregar as variáveis de ambiente
require("dotenv").config();
const express = require("express");
const Documento = require("../models/documentos"); // Caminho para o seu modelo de Documento
const authenticateToken = require("../middleware/authMiddleware"); // Middleware de autenticação
const router = express.Router();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Conectado ao MongoDB');
})
.catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
});

// Rota para upload de um novo documento (protegida por autenticação)
router.post('/upload', authenticateToken, async (req, res) => {
    try {
        const { filename, contentType, base64Data } = req.body;

        if (!filename || !contentType || !base64Data) {
            return res.status(400).json({ message: 'Faltando informações no corpo da requisição.' });
        }

        // Criar um novo documento com base64
        const document = new Documento({
            filename,
            usuario: req.user.id, // Deve vir do usuário autenticado
            contentType,
            data: base64Data,
        });

        await document.save();
        res.status(201).json({ message: 'Documento enviado com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao enviar documento.', error });
    }
});

// Rota para buscar todos os documentos de um usuário (protegida por autenticação)
router.get("/", authenticateToken, async (req, res) => {
    try {
        const documentos = await Documento.find({ usuario: req.user._id });
        res.json(documentos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar documentos.", error });
    }
});

// Rota para buscar um documento específico (protegida por autenticação)
router.get("/:id", authenticateToken, async (req, res) => {
    try {
        const documento = await Documento.findById(req.params.id);
        if (!documento) {
            return res.status(404).json({ message: "Documento não encontrado." });
        }
        // Verificar se o usuário logado é o dono do documento
        if (documento.usuario.toString() !== req.user.id.toString()) {
            return res.status(403).json({ message: "Acesso negado." });
        }
        res.json(documento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar documento.", error });
    }
});

// Rota para atualizar um documento
router.put("/:id", authenticateToken, async (req, res) => {
    try {
        const { filename, contentType, base64Data } = req.body;
        const documento = await Documento.findByIdAndUpdate(
            req.params.id,
            {
                filename,
                contentType,
                data: base64Data, // Atualiza os dados em base64
            },
            { new: true }
        );

        if (!documento) {
            return res.status(404).json({ message: "Documento não encontrado." });
        }

        res.json(documento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao atualizar documento.", error });
    }
});

// Rota para deletar um documento
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const documento = await Documento.findByIdAndDelete(req.params.id);

        if (!documento) {
            return res.status(404).json({ message: 'Documento não encontrado.' });
        }

        res.json({ message: 'Documento deletado com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao deletar documento.', error });
    }
});

// Rota para baixar o documento como base64
router.get('/:id/download', authenticateToken, async (req, res) => {
    try {
        const documento = await Documento.findById(req.params.id);
        if (!documento) {
            return res.status(404).json({ message: 'Documento não encontrado.' });
        }

        // Verificar se o usuário logado é o dono do documento
        if (documento.usuario.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Acesso negado.' });
        }

        res.json({
            filename: documento.filename,
            contentType: documento.contentType,
            data: documento.data, // Retornar o arquivo em base64
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao baixar documento.', error });
    }
});

module.exports = router;
