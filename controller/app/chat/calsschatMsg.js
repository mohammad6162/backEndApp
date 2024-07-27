const mongoose = require('mongoose');





const modelMsg = new mongoose.Schema({
    idMsg: { type: String },
    content: { type: String },
    typeContentMsg: { type: String },
    subContent: { type: String },
    dateTime: { type: Date },
    stateMsg: { type: String },
    idSender: { type: Number },
    idReciver: { type: Number },
    nameRoom: String,
    listIdSync: [Number]

    // id: { type: mongoose.Schema.Types.ObjectId }
}, { versionKey: false })







module.exports = mongoose.model('Masegess', modelMsg);
