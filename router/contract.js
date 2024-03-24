const experss = require('express');
const controller = require('../controller/app/contact/controllerContract');





const route = experss.Router();

route.post('/TimeLineContarct', controller.timeLineContract);//  دریافت تایم لاین قرارداد     
route.post('/CancellContract', controller.CancellContract);//  دریافت تایم لاین قرارداد    
//! route.post('/contentContractRent', controller.contentContractRent);//  دریافت تایم لاین قرارداد    
//?<<-------------------- دریافت کامل قرداد -------------------->>
route.get('/dlImgSign', controller.dlImgSign);// ارسال تصویر آگهی مناقاصات
route.post('/fullLoadContractTrip', controller.fullLoadContractTrip);// دریافت کامل قرداد سفری
route.post('/fullLoadContractRent', controller.fullLoadContractRent);// دریافت کامل قرداد چاتریs


//?<<-------------------- دریافت متن قرداد برای طرفین --------->>


route.post('/initTechnicalContentRentOwnerShip', controller.initTechnicalContentRentOwnerShip);// دریافتاطلاعات فنی قرداد چارتر صاحب شناور
route.post('/initTechnicalContentTripOwnerShip', controller.initTechnicalContentTripOwnerShip);// دریافتاطلاعات فنی قرداد سفری صاحب شناور

route.post('/initTechnicalContentRentAdvertiser', controller.initTechnicalContentRentAdvertiser);// دریافتاطلاعات فنی قرداد چارتری واخرین نسخه آن

route.post('/initTechnicalContentTripAdvertiser', controller.initTechnicalContentTripAdvertiser);//  دریافتاطلاعات فنی قرداد سفری واخرین نسخه آن


//?<<------------------ امضا گرفتناز طرفین ------------------>>

route.post('/signAndAcceptContarctTripOwnerShip', controller.signAndAcceptContarctTripOwnerShip);//   تایید و امضا قرداد سفری توسط صاحب آگهی 

route.post('/signAndAcceptContarctRentOwnerShip', controller.signAndAcceptContarctRentOwnerShip);//   تایید و امضا قرداد چاتری توسط صاحب آگهی 


route.post('/signAndAcceptContarctTripAdvertiser', controller.signAndAcceptContarctTripAdvertiser);//   تایید و امضا قرداد سفری توسط صاحب آگهی 

route.post('/signAndAcceptContarctRentAdvertiser', controller.signAndAcceptContarctRentAdvertiser);//   تایید و امضا قرداد چاتری توسط صاحب آگهی 








module.exports = route;