const experss = require('express');
const controller = require('../controller/controllerFinancial');





const route = experss.Router();
route.post('/getListTurnoverWallet', controller.getListTurnoverWallet);// گردش مالی کیف پول

route.post('/getListTurnoverPaymant', controller.getListTurnoverPaymant);// گردش مایل آنلاین


route.post('/checkOfferCode', controller.checkOfferCode);// چک کردن کد تخفیف     
route.post('/InitializationInvoice', controller.InitializationInvoice);// لیست تخفیفها        
route.post('/getNameMarketer', controller.getNameMarketer);// نام معرف
route.post('/acceptInvoiceSideTow', controller.acceptInvoiceSideTow);// تایید نهایی فاکتور طرف دوم         





module.exports = route;