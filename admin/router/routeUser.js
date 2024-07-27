const experss=require('express');
const controller=require('../controller/controllerLogin')


const route=experss.Router();



route.post('/rig',controller.RegisterUser);
route.post('/login',controller.LoginUser);




module.exports=route;