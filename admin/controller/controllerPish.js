const AppError=require('../error/error')
const db=require('../mysql/configDB').conDB;
const jwt=require('jsonwebtoken');

const { token } = require('morgan');


const catcherro=(fn)=>{
return (req,res,next)=>{fn(req,res,next).catch((e)=>next(new AppError(e.message + '1',404)))}
}



 



