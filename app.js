const express = require('express');
const morgan = require('morgan');
const ContBase = require('./controller/baseController')
const routeValues = require('./router/routeValue')
const routeAdmin = require('./router/admin')
const routeUser = require('./router/routeUser')
const ruteReports = require('./router/reports')
const routeShip = require('./router/ship')
const routeindentiti = require('./router/identity')
const routebeta = require('./router/routebalambeta')
const financial = require('./router/financial')
const chat = require('./router/chat');
const pcAdminadmin = require('./admin/router/admin')
const rtc = require('./rtc/rtc');
const pcAdminRouteUser = require('./admin/router/routeUser')
const pcAdminRouteValue = require('./admin/router/routeValue')
const fileUpload = require('express-fileupload');
const jwt = require('jsonwebtoken');
const routeContacrt = require('./router/contract')
const http = require('http');
const server = http.createServer(express);
const serverio = require('socket.io');
const io = serverio(server)
const routeProduct = require('./router/ownerProduct')
var Moment = require('moment-timezone');
const mongoose = require('./mysql/mongo')
// Moment().tz('Asia/Tehran').format();




// io.on('connection', (socket) => {
//   console.log('a user connected');
// });


mongoose();
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'));
// app.use(fileUpload({
//     createParentPath: true
// }));
app.use('/pcRoute', pcAdminRouteUser)
app.use('/rtc', rtc)
app.use('/pcAdmin', pcAdminadmin)
app.use('/pcValue', pcAdminRouteValue)
app.use('/chat', chat)
app.use('/contract', routeContacrt)
app.use('/reports', ruteReports)
app.use('/value', routeValues)
app.use('/financial', financial)
app.use('/product', routeProduct)
app.use('/ship', routeShip)
app.use('/identity', routeindentiti)
app.use('/admin', routeAdmin)
app.use('/users', routeUser)
app.use('/beta', routebeta)
app.all('*', ContBase.noUrl);
app.use(ContBase.Apperror);



module.exports = app;



//100 --- db dis