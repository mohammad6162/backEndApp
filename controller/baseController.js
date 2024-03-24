const { JsonWebTokenError } = require('jsonwebtoken');
const AppError=require('../error/error')
const db=require('../mysql/configDB').conDB;
const jwt=require('jsonwebtoken');
const { token } = require('morgan');

//router for send error not api
exports.noUrl=(req,res,next)=>{

next(new AppError('notapi',400,''))



}

//middewll Error 
exports.Apperror=(err,req,res,next)=>{
    console.log(err.message);
    res.status(err.StatusCode || 500).json({
        message:err.message,
        status:err.StatusCode,
        codeError:err.codeError,
       
    })

}



exports.jwt=(req,res,next)=>{
    var token;
    console.log(req.headers.authoriztion)
    if( req.headers.authoriztion.split(" ")[0] === "Bearer"){
    heder=req.headers.authoriztion;
    token=heder.split(" ")[1]
    console.log(token)
        
    jwt.verify(token,'123456789',function(err,decode){
        if(err)
        next(new AppError('jwtErroToken',500,101))
       
    });
    next()
   
    }else{
        
        next(new AppError('You not Access balam',500,102))
    }

}






