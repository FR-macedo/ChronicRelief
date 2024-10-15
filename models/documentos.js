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