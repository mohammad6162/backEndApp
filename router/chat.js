const experss = require('express');
const controller = require('../controller/app/chat/controllerChat');





const route = experss.Router();

route.post('/uploadFileChat', controller.uploadFileChat);//  دریافت تایم لاین قرارداد     
// route.get('/test1', controller.mongo);//  دریافت تایم لاین قرارداد     








module.exports = route;