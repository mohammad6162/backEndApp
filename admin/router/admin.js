//^ REQUIRE
const experss = require('express');
const controller = require('../controller/controllerAdmin');
const contValue = require('../controller/controllerValue');
const seaport = require('../controller/admin/seaport/seaportcontroller')
const users = require('../controller/admin/users/userscontroller')
const admin = require('../controller/admin/admincontroller')
const Routes = require('../controller/admin/routes/routecontroller')
const ads = require('../controller/admin/ads/adscontroller')
const product = require('../controller/admin/product/productcontroller')
const ship = require('../controller/admin/ship/shipcontroller')
const auth = require('../controller/admin/auth/authcontroller')
const contract = require('../controller/admin/contract/contractcontroller')
const discount = require('../controller/admin/Discount/discountcontroller')
const quiz = require('../controller/admin/questions/questionscontroller')
const ticket = require('../controller/admin/ticket/ticketcontroller')
const event = require('../controller/admin/events/eventcontroller')
const identy = require('../controller/admin/identy/identycontroller');
const slider = require('../controller/admin/slider/slidercontroller');
const wallet = require('../controller/admin/financial/financialcontroller');
const jwt = require('../controller/baseController');
const { uploadFiles } = require('../controller/upload');


const route = experss.Router();



//& GET
route.get('/listSeaport', seaport.listSeaport)
route.post('/listCitys', contValue.ListCity)
route.get('/liststate', controller.ListAcountState)
route.get('/listTypeUser', contValue.listTypeUser);
route.get('/listCountry', contValue.listcountry);
route.get('/listParentGroup', users.listParentGroup)
route.get('/getValuesBalamAdmin', admin.valuesBalam)
route.get('/ListAdmin', admin.ListAdmin)
route.get('/listPermissions', admin.listPermissions)
route.get('/ListProductAdmin', product.ListProductAdmin)
route.get('/countListDataAdmin', admin.countListDataAdmin)
route.get('/dlImgDocShip', ship.dlImgDocShip);// ارسال تصویر مدارک شناور به کاربر



//& ROUTES
route.post('/ListRoutesAdmin', Routes.ListRoutesAdmin)
route.post('/insertRouteAdmin', Routes.insertRouteAdmin)
route.post('/deleteRoutesAdmin', Routes.deleteRoutesAdmin)
route.post('/getInfoRoute', Routes.getInfoRoute);



//& WALLET
route.post('/listWallets', wallet.listWallet); // * ======================   لیست گیف پول ها
route.post('/listUserByIdWallet', wallet.listUserByIdWallet); // * ========== کیف پول یک کاربر
route.post('/listPaymentUserById', wallet.listPaymentUserById); // * =====  لیست پرداخت های یک کاربر





//& ADS RENT & TRIP
route.post('/listAdsRentAdmin', ads.ListAdsRentAdmin)
route.post('/listAdsTrip', ads.listAdsTrip)
route.post('/ListMyAdsRentAdmin', ads.ListMyAdsRentAdmin)
route.post('/ListPartAdsAdmin', ads.ListPartAdsAdmin)
route.post('/listAdsMeTrip', ads.ListAdsTripMe);
route.post('/listAdsMeRent', ads.ListAdsRentMe);
route.post('/getAllDataAdsTrip', ads.GetAllDataAdsTrip);
route.post('/addNewAdsTrip', uploadFiles, ads.addNewTrip);
route.post('/ListCityPort', ads.ListCityPort);
route.post('/listFlagcontry', ads.listFlagcontry);
route.post('/Rules', ads.Rules);
route.post('/saveRent', ads.SaveRent); //& ===== ثبت آگهی چاتر
route.post('/editRent', ads.EditRent); //& ===== ویرایش آگهی چاتر
route.post('/saveTrip', ads.saveTrip);
route.post('/poplurSeaport', ads.ListPoplurSeaPort);
route.post('/getDetailAdsRent', ads.getDetailAdsRent);
route.post('/listSmallAdsTripAdmin', ads.listSmallAdsTrip);
route.post('/showAdsTripForShipperAdmin', ads.showAdsTripForShipper);
route.post('/reporttStatistecsAdsProposal', ads.reporttStatistecsAdsProposal);
route.post('/addProposal', ads.addProposal);
route.post('/listSmallAdsRent', ads.listSmallAdsRent);
route.post('/showAdsRentForShipper', ads.showAdsRentForShipper);
route.post('/listProposalUser', ads.listProposalUser);
route.post('/panelListProposal', ads.panelListProposal);
route.post('/updateAdsTripStatusAdmin', ads.updateAdsTripStatusAdmin);
route.post('/updateAdsRentStatusAdmin', ads.updateAdsRentStatusAdmin);



//& ADMIN
route.post('/insertAdmin', admin.insertAdmin)
route.post('/deleteParentGroupAdmin', admin.deleteParentGroupAdmin)
route.post('/getIdAdmin', admin.getIdAdmin)
route.post('/deleteChildGroupAdmin', admin.deleteChildGroupAdmin)
route.post('/insertParentGroupAdmin', admin.insertParentGroupAdmin)
route.post('/insertChildGroupAdmin', admin.insertChildGroupAdmin)
route.post('/updateParentGroupAdmin', admin.updateParentGroupAdmin)
route.post('/updateChildGroupAdmin', admin.updateChildGroupAdmin)
route.post('/ListchildGroupAdmin', admin.ListchildGroupAdmin)
route.post('/ListParentGroupAdmin', admin.ListParentGroupAdmin)
route.post('/updateValueBalamAdmin', admin.updateValueBalamAdmin)
route.post('/updateAccountStateAdmin', admin.updateAccountStateAdmin)



//& Tickets
route.post('/listTickets', ticket.listTickets)
route.post('/listTicketsAnswer', ticket.listTicketsAnswer)
route.post('/insertTicketAnswer', ticket.insertTicketAnswerAdmin)
route.post('/deleteTicket', ticket.deleteTicket)




//& Quiz
route.post('/insertQuizAdmin', quiz.insertQuizAdmin)
route.post('/ListQuestions', quiz.ListQuestions)
route.post('/updateQuestions', quiz.updateQuestions)
route.post('/ListSammerySurvey', quiz.ListSammerySurvey)



//& identy
route.post('/checkImo', identy.checkimo)
route.post('/sendAuthShipUser', identy.sendAuthShipUser)
route.post('/sendTiket', identy.sendTiket)
route.post('/sendAuthShipUserEdit', identy.sendAuthShipUser)
route.post('/joinYadakBarj', identy.joinYadakBarj)





//& Discount
route.post('/insertOfferAdmin', discount.insertOfferAdmin)
route.post('/ListOfferAdmin', discount.ListOfferAdmin)
route.post('/updateListOfferAdmin', discount.updateListOfferAdmin)
route.post('/deleteDiscountAdmin', discount.deleteDiscount)


//& SEAPORT
route.post('/ListSeaPortAdmin', seaport.ListSeaPortAdmin)
route.post('/ListAllSeaportAdmin', seaport.ListAllSeaportAdmin)
route.post('/updateStatusSeaportAdmin', seaport.updateStatusSeaportAdmin)
route.post('/insertSeaportAdmin', seaport.insertSeaportAdmin)



//& USERS
route.post('/listChildGroup', users.listChildGroup)
route.post('/listUsersPopUp', users.listUsersPopUpAdmin)
route.post('/updateUserAdmin', users.updateUserAdmin)
route.post('/setGroupUsers', users.setGroupUsers)
route.post('/listUser', users.listUsers)
route.post('/userProfile', users.userProfile)




//& Main
route.post('/login', controller.loginAdmin)
route.post('/insertState', controller.InsertAcountState)
route.post('/setStateUser', controller.set_id_state)
route.post('/listostan', contValue.listostan);
route.post('/listcity', contValue.listCity);
route.post('/rigUser', controller.rigUser);
route.post('/CheckCodemili', contValue.checkCodemeli);



//& PRODUCT
route.post('/deleteProductAdmin', product.deleteProductAdmin);
route.post('/insertProductAdmin', product.insertProductAdmin);
route.post('/updateProductAdmin', product.updateProductAdmin);
route.post('/getDataTripForEdit', product.getDataTripForEdit); //& ======= دریافت شی سفری برای ویرایش
route.post('/getObjRent', product.getObjRent); //& ================ دریافت شی چاتری



//& contracts
route.post('/ListcontactContractAdmin', contract.ListcontactContract);
route.post('/insertcontactContractAdmin', contract.insertcontactContract);
route.post('/updateContentConstractAdmin', contract.updateContentConstract);
route.post('/ListContractsAdmin', contract.ListContracts);
route.post('/fullLoadContractTrip', contract.fullLoadContractTrip);
route.post('/fullLoadContractRent', contract.fullLoadContractRent);
route.get('/dlImgSign', contract.dlImgSign);// ارسال تصویر آگهی مناقاصات
route.post('/updateContractStatusAdmin', contract.updateContractStatusAdmin);// ویرایش وضعیت
route.post('/financialGetModelInvoice', contract.financialGetModelInvoiceAdmin);// ویرایش وضعیت




// & Slider
route.get('/sendSliderImage', slider.sendSliderImage);  // ارسال تصویر
route.post('/insertSlider', slider.insertSlider);   // ثبت اسلایدر جدید
route.post('/listSlider', slider.listSlider);     // === لیست اسلایدر ها
route.post('/deleteSlider', slider.deleteSlider);     // === حذف اسلایدر ها
route.post('/updateSlider', slider.updateSlider);     // === حذف اسلایدر ها





//& Event & Log
route.post('/listLogShipUser', event.listLogShipUser);
route.post('/listLogTickets', event.listLogTickets);
route.post('/listLogDiscount', event.listLogDiscount);
route.post('/deleteLogDiscount', event.deleteLogDiscount);
route.post('/deleteLogTicket', event.deleteLogTicket);
route.post('/deleteLogSlider', event.deleteLogSlider);
route.post('/deleteLogShipUser', event.deleteLogShipUser);
route.post('/listLogSlider', event.listLogSlider);




//& SHIP
route.post('/insertShipAdmin', ship.insertShipAdmin);
route.post('/ListShipAdmin', ship.ListShipAdmin);
route.post('/deleteShipAdmin', ship.deleteShipAdmin);
route.post('/deleteWeightShipAdmin', ship.deleteWeightShipAdmin);
route.post('/ListWeightShipAdmin', ship.ListWeightShipAdmin);
route.post('/insertWeightShipAdmin', ship.insertWeightShipAdmin);
route.post('/updateStatusShipAdmin', ship.updateStatusShipAdmin);
route.post('/delShipUser', ship.delShipUser);
route.post('/listShipUser', ship.ListShipUser); //& ===================== لیست شناور ها
route.post('/getModelShip', ship.getModelShip); //& ===================== لیست شناور بر اساس ای دی
route.post('/psPreRegistertionShip', ship.PSpreRegistertionShip);


//& AUTH USER
route.post('/listUsersIDentity', auth.listUsersIDentity);
route.post('/getIdentyFileAuthUser', auth.getIdentyFileAuthUser);
route.post('/updateStatusUsers', auth.updateStatusUsers);
route.post('/checkDocPerson', auth.checkDocPerson);
route.post('/sendOtp', auth.sendOtp);
route.post('/sendNewModelAuth', uploadFiles, auth.sendNewAuthModel)// ارسال مدل احراز هویت جدید


//route.post('/seveRentNew',ads.saveRentNew);//ذخیره آگهی   چاتر جدید
//route.post('/objectEditAdsRent',ads.objectEditAdsRent);;//ذخیره آگهی   چاتر جدید
//route.post('/saveRentEdit',ads.saveRentEdit);//ویرایش آگهی   چاتر

module.exports = route;