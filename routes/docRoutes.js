const express = require('express');
const multer = require('multer');
const Documento = require('../models/Documento'); // Caminho para o seu modelo de Documento
const authenticateToken = require('../middleware/auth'); // Middleware de autenticação
const router = express.Router();
const multer = require('multer');
const gridfsStorage = require('multer-gridfs-storage');
const path = require('path');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const Documento = require('../models/Documento');

// Configuração do multer para upload de arquivos
const storage = new gridfsStorage({
    url: 'mongodb://localhost/your_database',
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = `${Date.now()}-${file.originalname}`;
            const fileInfo = {
                filename: filename,
                bucketName: 'uploads'
            };
            resolve(fileInfo);
        });
    }
});

const upload = multer({ 
    storage,   

    limits: { fileSize: 1024 * 1024 * 10   
 }, // 10MB
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(pdf|doc|docx)$/)) {
            return cb(new Error('Only pdf, doc, and docx files are allowed!'), false);
        }
        cb(null, true);
    }
});


// Rota para upload de um novo documento (protegida por autenticação)
router.post('/upload', authenticateToken, upload.single('pdf'), async (req, res) => {
  try {
    // ... (código para salvar o documento no GridFS, como no exemplo anterior)
    const document = new Documento({
      filename: file.originalname,
      // ... outros campos
      usuario: req.user._id, // Associando o documento ao usuário logado
    });
    await document.save();
    res.status(201).json({ message: 'Documento enviado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao enviar documento.', error });
  }
});

// Rota para buscar todos os documentos de um usuário (protegida por autenticação)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const documentos = await Documento.find({ usuario: req.user._id });
    res.json(documentos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar documentos.', error });
  }
});

// Rota para buscar um documento específico (protegida por autenticação)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const documento = await Documento.findById(req.params.id);
    if (!documento) {
      return res.status(404).json({ message: 'Documento não encontrado.' });
    }
    // Verificar se o usuário logado é o dono do documento
    if (documento.usuario.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Acesso negado.' });
    }
    res.json(documento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar documento.', error });
  }
});

// Rota para atualizar um documento
router.put('/:id', authenticateToken, upload.single('documento'), async (req, res) => {
    try {
        const documento = await Documento.findByIdAndUpdate(req.params.id, {
            filename: req.file.filename,
            contentType: req.file.contentType,
            size: req.file.size,
            // ... outros campos
        }, { new: true });

        if (!documento) {
            return res.status(404).json({ message: 'Documento não encontrado.' });
        }

        res.json(documento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar documento.', error });
    }
});

// Rota para deletar um documento
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const documento = await Documento.findByIdAndDelete(req.params.id);

        if (!documento) {
            return res.status(404).json({ message: 'Documento não encontrado.' });
        }

        // Remover o arquivo do GridFS
        const gfs = Grid(mongoose.connection.db);
        await gfs.delete(documento._id);

        res.json({ message: 'Documento deletado com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao deletar documento.', error });
    }
})

// Rota para baixar um documento
// router.get('/:id/download', authenticateToken, async (req, res) => {
//     try {
//         const documento = await Documento.findById(req.params.id);
//         // ... (lógica para baixar o arquivo do GridFS) faltando add
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Erro ao baixar documento.', error });
//     }
// });

module.exports = router;