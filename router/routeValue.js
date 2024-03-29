const experss = require('express');
const controller = require('../controller/controllerValue');
const jwt = require('../controller/baseController');
const uploadBalam = require('../controller/upload')
const { router } = require('../app');
const multer = require("multer");
const uploadBalams = require('../controller/upload')

const route = experss.Router();

route.post('/checkCodemeli', controller.checkCodemeli);

route.post('/listFlagcontry', controller.listFlagcontry);

route.post('/infoRouteBetweenSeaport', controller.InfoRouteBetweenSeaport);
route.post('/addNewAdsTrip', uploadBalams.uploadFiles, controller.addNewTrip);
route.post('/test', controller.test);
route.post('/ListCityPort', controller.ListCityPort);
route.post('/Rules', controller.Rules);
route.post('/poplurSeaport', controller.ListPoplurSeaPort);

route.post('/getAllDataAdsTrip', controller.GetAllDataAdsTrip);
route.post('/delAdsTrip', controller.DelAdsTrip);// deprecated
route.post('/EditAdsTrip', controller.ReciveDataOneAdsTrip);

route.post('/listAdsMeTrip', controller.ListAdsTripMe);// لیست آگهی های من - سفری
route.post('/listAdsMeRent', controller.ListAdsRentMe);// لیست آگهی های من - چاتری
// route.post('/objectEditAdsRent',controller.objectEditAdsRent);
// route.post('/seveRentEdit',controller.saveRentEdit);//ذخیره آگهی چاتر ویرایشی
// route.post('/seveRentNew',controller.saveRentNew);//ذخیره آگهی   چاتر جدید
// route.post('/objectEditAdsRent',controller.objectEditAdsRent);
route.post('/seveRentEdit', controller.saveRentEdit);//ذخیره آگهی چاتر ویرایشی
// route.post('/seveRentNew',controller.saveRentNew);//ذخیره آگهی   چاتر جدید
route.post('/listinfoProposalTrip', controller.ListProposalTrip);//  نمایش پیشنهادات  قیمتی سفری به کاربر
route.post('/listResponseSurvayUser', controller.ResponseSurvayUser);// نمایش نظرات دیگران درباره یک کاربر
route.post('/infoShipUser', controller.infoShipUser);//اطلاعات فنی شناور کاربر

route.post('/delAdsRentTrip', controller.DelAdsTripRent);

route.post('/rigWinner', controller.rigWinner);//ثبت برندگان مناقصه و بستن مناقصه
route.post('/cancelads', controller.cancelAds);//لغو مناقصه 

route.post('/sendNewModelAuth', uploadBalam.uploadFiles, controller.sendNewAuthModel)// ارسال مدل احراز هویت جدید
//*---- لیست شهرها بر اساس آی استان و جستجوی شهر
route.post('/listCitys', controller.ListCity)
//*---- تایید شاهکار و ارسال otp




route.post('/CloseTenderRentNoProposal', controller.CloseTenderRentNoProposal);
route.post('/CloseTenderTripNoProposal', controller.CloseTenderTripNoProposal);

// route.get('/resImg',controller.resiveImage);// ارسال تصویر به کاربر

route.post('/listProposalJustShow', controller.listProposalJustShow);// ارسال تصویر به کاربر







module.exports = route;
