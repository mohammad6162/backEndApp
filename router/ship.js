const experss = require('express');
const controller = require('../controller/app/ship/ship')
const controllerShip = require('../controller/shipper');



const route = experss.Router();



route.post('/listProposalUser', controller.listProposalUser);// لیست  پیشنهادات کاربر
route.post('/listShipUser', controller.listShipUser);// لیست شناورهای کاربر
route.post('/listSmallAdsTrip', controllerShip.listSmallAdsTrip);//لیست آگهی  های سفری   
route.post('/listSmallAdsRent', controllerShip.listSmallAdsRent);//لیست آگهی  های چارتری   
route.post('/ShowAdsTripForShipper', controllerShip.showAdsTripForShipper);// آگهی   سفری  نمایش
route.post('/ShowAdsRentForShipper', controllerShip.showAdsRentForShipper);// آگهی   چارتری   نمایش
route.post('/reportCardProduct', controllerShip.repositoryReportCardProduct);//کارنامه صاحب کالا         
route.post('/reportCardOwnerShip', controllerShip.reportCardOwnerShip);//کارنامه صاحب شناور         
route.post('/pscancellProposal', controllerShip.pscancellProposal) // کنسل کردن پیشنهاد
route.post('/PSpreRegistertionShip', controller.PSpreRegistertionShip)//پیش ثبت نام شناور
route.post('/addProposal', controllerShip.addProposal);//دادن پیشنهاد برای این شناور
route.post('/delShipUser', controllerShip.delShipUser);//حذف / لغو شناور
route.post('/getModelShip', controllerShip.getModelShip);// لیست برای تابلوی پیشنهادات
route.post('/panelListProposal', controllerShip.panelListProposal);// لیست برای تابلوی پیشنهادات
route.post('/reporttStatistecsAdsProposal', controllerShip.reporttStatistecsAdsProposal);// لیست برای تابلوی پیشنهادات

route.post('/test', controllerShip.test);
module.exports = route;