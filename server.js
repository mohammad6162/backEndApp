const dotnev=require('dotenv').config({path:'./config.env'});
const express  = require('express');
const { isObject } = require('lodash');
const app=require('./app.js');
 const socket = require("socket.io");




const severio=app.listen(process.env.PORT,()=>{
    console.log(`run app pishkhan ${process.env.PORT}` );
})

const io=socket(severio)

io.on("connection", function (socket) {
    console.log("Made socket connection");


    socket.on("msg", function (data) {
        console.log(data);
        io.emit('theme',data)
    });

});

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