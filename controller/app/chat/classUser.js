const mongoose = require('mongoose');




const modelUser = new mongoose.Schema({
    idUser: { type: Number, require: true },
    lastDateTime: Date,
    online: { type: Boolean, require: true }

    // id: { type: mongoose.Schema.Types.ObjectId }
}, {
    versionKey: false
})


modelUser.static('checkStatusUser', async function foo(idUser) {

    const status = await this.find({ 'idUser': idUser }).sort({ 'lastDateTime': -1 }).limit(1)

    return status;

});


module.exports = mongoose.model('Users', modelUser);