const mongoose = require('mongoose');
const gridfs = require('gridfs-stream');
const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
    gfs = gridfs(conn, { gridfs: 'uploads' });
});

const Schema = mongoose.Schema;

const DocumentoSchema = new Schema({
    filename: String,
    contentType: String,
    size: Number,
    uploadDate: { type: Date, default: Date.now },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    doenca: {
        type: Schema.Types.ObjectId,
        ref: 'Doenca'
    },
    // Outros metadados relevantes
    metadata: {
        descricao: String,
        data: Date
    }
});

const Documento = mongoose.model('Documento', DocumentoSchema);

module.exports = Documento;