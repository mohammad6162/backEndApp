const experss=require('express');
const controller=require('../controller/controllerLogin')
const contUser=require('../controller/controllerUser')


const route=experss.Router();



route.post('/rig',controller.RegisterUser);
route.post('/login',controller.LoginUser);
route.post('/Score',contUser.ScoreUser);





module.exports=route;