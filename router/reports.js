const experss = require('express');
const controller = require('../controller/app/reportController')
const contUser = require('../controller/controllerUser')


const route = experss.Router();



route.post('/reportListRoutes', controller.reportListRoutes);// لیست کلی وضعیت مسیرها
route.post('/reportSpecialRoute', controller.reportSpecialRoute);// ریز اطلاعات یک مسیر خاص
route.post('/reportSummaryTypeShips', controller.reportSummaryTypeShips);// لیست کلی وضعیت تایپ شناورها
route.post('/reportSpecialTypeShip', controller.reportSpecialTypeShip);// ریز اطلاعات یک تایپ شناور خاص
route.get('/getListQuize', controller.getListQuize);// لیست سوالات نظر سنجی
route.post('/regSurvay', controller.regSurvay);// ثبت نظرسنجی






module.exports = route;