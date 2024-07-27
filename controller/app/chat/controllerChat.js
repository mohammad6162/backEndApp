const AppError = require('../../../error/error')
const db = require('../../../mysql/configDB').conDB;
const express = require('express');
// var url = require('url');
// const jwt=require('jsonwebtoken');
// const app = require('../app');
// const https = require('https');
const request = require('request');
const mongoose = require('mongoose');
const lodash = require('lodash');
const classChat = require('./calsschatMsg');
const ClassRoom = require('./calsschatRoom');
const upload = require('../../../controller/upload')
const classStatusUser = require('./classUser');

const catcherro = (fn) => {
    return (req, res, next) => { fn(req, res, next).catch((e) => next(new AppError(e.message, 404))) }
}



exports.uploadFileChat = catcherro(async (req, res, next) => {

    upload.uploadchat(req, res, function (err) {



        if (err) {
            console.log(err);
            return next(new AppError('not Upload', 404, '100'));
        } else {

            // sms.smsNewAds(row[0][0][0].listid.join(),mobile)
            res.status(200).json({
                length: 1,
                data: [true]
            })
        }
    })

});







exports.soketSyncChatStatrtApp = async function (socket, idUser) {

    try {
        const listSync = await ClassRoom.listRoomUser(idUser)





        if (listSync.listRooms.length > 0) {
            const listNameRoom = [];
            for (const objRoom of listSync.listRooms) {
                listNameRoom.push(objRoom._id);
            }


            socket.join(listNameRoom);

            socket.emit('successJoinRoom');


        }

        res.status(200).json({
            length: listSync.listRooms.length,
            data: listSync
        })

    } catch (error) {
        res.status(404)
    }






    socket.emit('syncAppStart',)

}

//!<<---------------- دریافت پیام بعد از وصل مجدد  --------------->>
exports.syncChats = async function (socket, idUser) {


    const listMsgNeedSync = await classChat.find({ 'listIdSync': { $all: [idUser] } }, {
        $set: {
            'listIdSync': lodash.remove(objMsg.listIdSync, function (idSender) {
                return idSender == model.idSender;
            }),

        }
    });


    socket.emit('listMsgNeedSync', listMsgNeedSync);
    console.log(listMsgNeedSync)


}



//!<<----------------  تایید تمام پیام های دریافت نشده   --------------->>
exports.syncChats = async function (socket, idUser) {


    const listMsgNeedSync = await classChat.updateMany({ 'listIdSync': { $all: [idUser] } }, {});


    socket.emit('listMsgNeedSync', listMsgNeedSync);
    console.log(listMsgNeedSync)


}
//!<<----------------چک کردن آنلاین یا آفلاین بودن یک کاربر خاص------>>


checkStatusFrontUser = async function (socket) {

    //todo : مقدار ورودی دستی وارد شده است

    socket.on('checkStatusFrontUser', async (idUser) => {
        console.log('ckeckUser');
        const status = await classStatusUser.checkStatusFrontUser(1022);
        console.log(status);
        socket.emit('responceStatusUser', status[0]);

    })
};


//!<<--------------- دریافت پیام کاربر -------------------->>
onSendMsg = async function (socket) {


    socket.on('sendMsg', async function (msg) {

        const model = classChat(msg);
        await new Promise(resolve => setTimeout(resolve, 2000));
        await model.save().then((e) => {
            console.log(e.idMsg);
            //*--------->> ارسال به گروه ----------------->>
            socket.to(msg.nameRoom).emit('SendToRoom', e);
            //*--------->> ارسال تایید ذخیره شدن به ارسال کننده 

            socket.emit('save', e);



        }).catch((e) => {
            socket.emit('errorSoketEskele')
        });

    });
}
//!<<--------------understandSave ------------------------->>
understandSave = async function (socket) {


    socket.on('understandSave', async function (model) {
        console.log('understandSave');
        const objMsg = classChat.findOne(
            { 'idMsg': model.idmsg },);


        classChat.findOneAndUpdate(
            { 'idMsg': model.idmsg },

            {
                'listIdSync': lodash.remove(objMsg.listIdSync, function (idSender) {
                    return idSender == model.idSender;
                }),

            });

    })
}

understandDeliver = async function (socket) {


    socket.on('understandDeliver', async function (model) {
        console.log('understandDaliver');
        classChat.findOneAndUpdate(
            { 'idMsg': model.idmsg },

            {
                'listIdSync': [],

            });

    });
}


//!<<---------------- اعلم دریافت توسط گیرنده ---------------->>
deliver = async function (socket) {

    socket.on('d111', async function (model) {


        await classChat.updateOne({ 'idMsg': model.idMsg }, {
            'listIdSync': [model.idSender],
            'stateMsg': 'deliver'
        }).then((val) => {
            console.log(`------>> ${model.idMsg}`);


            model.stateMsg = 'deliver';
            console.log(model)

            socket.to(model.nameRoom).emit('userDeliver', model);
        })
    })

}


exports.allon = async function (socket) {
    onSendMsg(socket);
    deliver(socket);
    understandSave(socket);// منتظر و ثبت دریافت نتیحه اعلام اینکه فرستنده نتیجه دریافت را دریافت کرده است  
    understandDeliver(socket);

    checkStatusFrontUser(socket);//چک کردن وضعیت کاربر مقابل



}