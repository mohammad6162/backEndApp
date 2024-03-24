const AppError=require('../error/error')
const db=require('../mysql/configDB').conDB;
const express=require('express');
// var url = require('url');
// const jwt=require('jsonwebtoken');
// const app = require('../app');
// const https = require('https');
const request = require('request');


const catcherro=(fn)=>{
return (req,res,next)=>{fn(req,res,next).catch((e)=>next(new AppError(e.message,404)))}
}



exports.InfoProduct=catcherro(async (req,res,next)=>{
        const id=req.body.id;
        db.query('SELECT * FROM `product` WHERE id=?',[id]).then((row,filds)=>{
        
            res.status(200).json({
                msg: '',
                
                length : row[0].length,
                data:row[0]
            })

        }).catch(e=>next(new AppError(e.message,404,'100')))
});


exports.ScoreUser=catcherro(async (req,res,next)=>{
    const id=req.body.id;
    db.query('SELECT score FROM userInfo WHERE id = ?',[id]).then((row,filds)=>{
    
        res.status(200).json({
            msg: '',
            
            length : row[0].length,
            data:row[0]
        })

    }).catch(e=>next(new AppError(e.message,404,'100')))
});





