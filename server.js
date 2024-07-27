const dotnev = require('dotenv').config({ path: './config.env' });
const express = require('express');
const { isObject } = require('lodash');
const app = require('./app.js');
const socket = require("socket.io");
const classMsg = require('./controller/app/chat/calsschatMsg.js');
const classStatus = require('./controller/app/chat/classUser.js');
const ClassRoom = require('./controller/app/chat/calsschatRoom.js');
const controllerChat = require('./controller/app/chat/controllerChat.js')
const db = require('./mysql/configDB.js').conDB;


const { model } = require('mongoose');
const classUser = require('./controller/app/chat/classUser.js');




const severio = app.listen(process.env.PORT, () => {
    console.log(`run app pishkhan ${process.env.PORT}`);
})

const io = socket(severio, {
    connectionStateRecovery: {}
})
const catcherro = (fn) => {
    return (req, res, next) => { fn(req, res, next).catch((e) => next(new AppError(e.message, 404))) }
}

//!<<-------------------------socket io ------------------>>
io.on("connection", async function (socket) {
    console.log(`Made socket connection ${socket.id}`);
    var idUserSocket = 0;

    //**<<---------------- دریافت آیدی کاربر جاری
    socket.on('idUser', async (idUser) => {
        idUserSocket = idUser;
        console.log(idUserSocket);
        await classStatus({
            idUser: idUser,
            lastDateTime: Date.now(),
            online: true

            // id: { type: mongoose.Schema.Types.ObjectId }
        }).save().then((val) => {
            io.emit('responceStatusUser', {
                idUser: idUser,
                lastDateTime: Date.now(),
                online: true

                // id: { type: mongoose.Schema.Types.ObjectId }
            });
        }).catch((e) => console.error);

    });







    //*<<---------- اولین نصب اپ --------->>
    socket.on('syncInstallApp', (idUser) => {
        ClassRoom.syncStartApp(idUser);
    })

    io.emit('syncInstallApp', {});
    socket.join('6697d919045517c6e85cd9da');
    // controllerChat.syncChats(socket, 1022);

    controllerChat.allon(socket);





    //!<<---------------on diconnect ------------------>>

    socket.on('disconnect', async function () {
        console.log(`disconnected ${socket.id}`);

        await classStatus({
            idUser: idUserSocket,
            lastDateTime: Date.now(),
            online: true

            // id: { type: mongoose.Schema.Types.ObjectId }
        }).save();
        io.emit('responceStatusUser', {
            idUser: idUserSocket,
            lastDateTime: Date.now(),
            online: false

            // id: { type: mongoose.Schema.Types.ObjectId }
        });

    })









});


module.exports = io;


// const express = require('express');
// const app = express();
// const http = require('http');
// const cors=require('cors');
// const server = http.createServer(app);
// const { Server } = require("socket.io")
// const io = new Server(server);

// app.get('/', (req, res) => {
//   res.send({sdasd:'get'})
// });

// io.on('connection', (socket) => {
//   console.log('a user connected');
// });
// io.listen(server,()=>{
//     console.log('kkkk')
// });
// server.listen(3030, () => {
//   console.log('listening on *:3030');
// });

// const express = require("express");
// const socket = require("socket.io");


// const PORT = 3030;
// const app = express();
// const server = app.listen(PORT, function () {
//     console.log(`Listening on port ${PORT}`);
//     console.log(`http://localhost:${PORT}`);
// });



// // Socket setup
// const io = socket(server);
// const activeUsers = new Set();
// io.on("connection", function (socket) {
//     console.log("Made socket connection");


//     socket.on("message", function (data) {
//         console.log(data)
//     });

// });