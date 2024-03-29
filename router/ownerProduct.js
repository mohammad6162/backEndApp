const experss = require('express');
const controllerProduct = require('../controller/app/product/product');
const controllerRent = require('../controller/app/product/rent');

const uploadBalams = require('../controller/upload')

const route = experss.Router();


route.post('/showAdsTrip', controllerProduct.showAdsRent);//   دریافت شی چاتری برای نمایش آگهی
route.post('/showAdsTrip', controllerProduct.showAdsTrip);//   دریافت شی سفری برای نمایش آگهی
route.post('/reportChartAds', controllerProduct.reportChartAds);// دریافت داده ای نمدار
route.post('/EditTrip', controllerProduct.EditTrip);//ثبت آگهی سفری - ویرایش
route.post('/getDataTripForEdit', controllerProduct.getobjTrip);// دریافت شی سفری برای ویرایش
route.post('/saveTrip', controllerProduct.saveTrip);// ثبت آگهی سفری - جدید
route.post('/test', controllerProduct.test);// ارسال تصویر به کاربر
route.post('/saveRent', controllerProduct.saveRent);//ذخیره آگهی چاتر [جدید]
route.post('/EditRent', controllerProduct.EditRent);//ذخیره آگهی   چاتر ویرایشی
route.post('/getObjRent', controllerProduct.getObjRent);//دریافت شی چاتری     
route.post('/ppListAdsTrip', controllerProduct.ppListAdsTrip);// لیست آگهی های سفری من
route.post('/ppListAdsRent', controllerProduct.ppListAdsRent);// لیست آگهی های چاتری من
route.post('/timeLine', controllerProduct.TimeLine);// دریافت لیست تایم لاین یک آگهی
route.post('/acceptAdsTrip', controllerProduct.acceptAdsTrip);// تایید قرارداد سفری و ارسال امضا 
route.post('/acceptAdsRent', controllerProduct.acceptAdsRent);// تایید قرارداد چاتری و ارسال امضا 
route.post('/PPShowInfoShip', controllerProduct.PpShowInfoShip);//نمایش اطلاعات شناور به صاحب شناور
route.post('/PPCencellAds', controllerProduct.PPCencellAds);// لغو قرارداد سفری 
route.post('/PPCencellAdsRent', controllerProduct.PPCencellAdsRent);// لغو قرارداد چاتری 
route.post('/getInfoRoute', controllerProduct.getInfoRoute);// اطلاعات بین دو مسیر
route.post('/listContrctProduct', controllerProduct.listContractProduct);// لیست قردادها 
route.post('/loadContractTip', controllerProduct.loadContractTip);//  دریافت داده های قراردادسفری 

route.get('/imgSing', controllerProduct.dlImgSig);//  دریافت داده های قراردادسفری 

module.exports = route;