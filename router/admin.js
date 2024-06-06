const experss = require('express');
const controller = require('../controller/controllerValue');
const contValue = require('../controller/controllerValue');
const jwt = require('../controller/baseController')
const users = require('../controller/admin/users/userscontroller')




const route = experss.Router();

route.get('/urlImageSliderImage', controller.urlImageSliderImage);// ارسال تصویر مدارک شناور به کاربر

route.get('/dlImgDocShip', controller.dlImgDocShip);// ارسال تصویر مدارک شناور به کاربر
route.get('/dlImgAds', controller.dlImgAds);// ارسال تصویر آگهی مناقاصات

route.post('/login', controller.login);// چک کردن و ورود کاربر   
route.post('/regUser', controller.regUser);// چک کردن و ورود کاربر   
route.post('/sendWarnign', controller.sendWarnign);// ثبت شکایت   

route.get('/test', controller.test);// ارسال تصویر آگهی مناقاصات
// route.get('/liststate',controller.ListAcountState)
// route.get('/listTypeUser',contValue.listTypeUser);
// route.get('/listCountry',contValue.listcountry);
// route.get('/listParentGroup',users.listParentGroup)


// route.post('/listUser',users.listUsers)
// route.post('/login',controller.loginAdmin)
// route.post('/insertState',controller.InsertAcountState)
// route.post('/setStateUser',controller.set_id_state)
// route.post('/listostan',contValue.listostan);
// route.post('/listcity',contValue.listCity);
// route.post('/rigUser',controller.rigUser);
// route.post('/CheckCodemili',contValue.checkCodemeli);





module.exports = route;