
const experss = require('express');
const controller = require('../controller/app/identity/identity');
const jwt = require('../controller/baseController');
const uploadBalam = require('../controller/upload')
const { router } = require('../app');
const multer = require("multer");
const uploadBalams = require('../controller/upload')

const route = experss.Router();


route.post('/sendAuthUser', uploadBalam.uploadFiles, controller.sendAuthUser)//ارسال مشخاصت کاربر
route.post('/SendOtp', controller.sendOtp)
route.post('/CheckImo', controller.checkimo)

route.post('/sendAuthShipUser', controller.sendAuthShipUser);
route.post('/sendAuthShipUserBarjYadak', controller.sendAuthShipUserBarjYadak);
route.post('/sendAuthShipUserEdit', controller.sendAuthShipUserEdit)
route.post('/sendTiket', controller.sendTiket)

module.exports = route;