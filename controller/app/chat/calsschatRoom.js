const mongoose = require('mongoose');

const ClassMsg = require('./calsschatMsg');
const { v4: uuidv4 } = require('uuid')


const modelRoom = new mongoose.Schema({
    nameRoom: { type: String, default: uuidv4 },
    dateTimeReg: { type: Date, require: true, default: Date.now() },
    idAds: { type: Number, require: true },
    userAds: { type: Number, require: true },
    userVisit: { type: Number, require: true },
    syncUserAds: { type: Boolean, default: false, require: true },
    syncUserVisit: { type: Boolean, default: false, require: true },
    status: { type: Boolean, require: true }

    // id: { type: mongoose.Schema.Types.ObjectId }
}, {
    versionKey: false
})

class ModelListMassegUser {
    constructor(nameRoom, listMsg) {
        this.nameRoom = nameRoom;
        this.listMsg = listMsg;
    }
}



// modelRoom.static('syncAllRooms', async function foo(idUser) {

//     //*----->> لیست اتاق های کاربر
//     const listRoom = await this.find({ $or: [{ userAds: idUser }, { userVisit: idUser }], }).select('nameRoom dateTimeReg userAds userVisit status syncUserAds syncUserVisit');






//     //*----->> اتاق هایی که کابر باید داده های آن را به روز کند
//     const listRoomTrueCondition = [];
//     for (const room of listRoom) {
//         if (room.userAds == idUser) {
//             if (room.syncUserAds) {
//                 listRoomTrueCondition.push(room);
//             } else {

//                 if (room.syncUserVisit) {
//                     listRoomTrueCondition.push(room);
//                 }
//             }

//         }

//     }



//     const listMsgForEcheRoom = async () => {
//         const listMsg = [];
//         for (const room of listRoomTrueCondition) {

//             if (room.userAds == idUser) {
//                 const nameRomm = room.nameRoom;
//                 const listMsgRoom = await ClassMsg.find({ nameRoom: nameRomm ,}).select('idMsg content typeContentMsg subContent dateTime stateMsg idSender idReciver nameRoom');
//                 listMsg.push({ ...room, 'listMsg': ModelListMassegUser(nameRomm, listMsgRoom) });
//                 } else {


//                 }

//             }






//         }

//         return listMsg;
//     }






//     return await listMsgForEcheRoom();

// });



// //!<<----------------- شروع اپ ----------------->>


// modelRoom.static('syncInstallApp', async function foo(idUser) {

//     //*----->> لیست اتاق های کاربر
//     const listRoom = await this.find({ $or: [{ userAds: idUser }, { userVisit: idUser }], }).select('nameRoom dateTimeReg userAds userVisit status syncUserAds syncUserVisit');








//     //*----->> ساخت مدل نهایی از اطلاعات اتاق ها و لیست پیام های به روز شونده
//     // idMsg: { type: String },
//     // content: { type: String },
//     // typeContentMsg: { type: String },
//     // subContent: { type: String },
//     // dateTime: { type: Date },
//     // stateMsg: { type: String },
//     // idSender: { type: Number },
//     // idReciver: { type: Number },
//     // nameRoom:String,

//     const listMsgForEcheRoom = async () => {
//         const listMsg = [];
//         for (const room of listRoom) {
//             const nameRomm = room.nameRoom;
//             const listMsgRoom = await ClassMsg.find({ nameRoom: nameRomm }).select('idMsg content typeContentMsg subContent dateTime stateMsg idSender idReciver nameRoom');
//             listMsg.push({ ...room, 'listMsg': ModelListMassegUser(nameRomm, listMsgRoom) });
//         }

//         return listMsg;
//     }






//     return await listMsgForEcheRoom();

// });



module.exports = mongoose.model('listRoom', modelRoom);