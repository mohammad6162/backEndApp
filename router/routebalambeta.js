const experss=require('express');
const controller=require('../controller/balamBeta')


const route=experss.Router();



route.post('/upload',controller.RigAds);




module.exports=route;