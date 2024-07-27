const experss = require('express');
const controller = require('../../admin/controller/controllerValue');
const jwt = require('../../admin/controller/baseController');
const { router } = require('../../app');


const route = experss.Router();


route.get('/ver', controller.ver)
route.post('/listcity', controller.listcity);
route.post('/sms', controller.sendSms);
route.post('/checkCodemeli', controller.checkCodemeli);





module.exports = route;