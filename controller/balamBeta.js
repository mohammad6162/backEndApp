const AppError=require('../error/error')
const db=require('../mysql/configDB').conDB;
const jwt=require('jsonwebtoken');


const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');
const catcherro=(fn)=>{
    return (req,res,next)=>{fn(req,res,next).catch((e)=>next(new AppError(e.message,404)))}
    }



    exports.RigAds=catcherro(async (req,res,next)=>{
     
        getNamefiles=(name)=>{
            var p0=name.split('.');
            return `${uuidv4()}.${p0[1]}`
        }
        if(!req.files){
            return next(new AppError(e.message, 404, '100'));
        }else{

            let data=req.files.photo;
            let dataName=getNamefiles(data.name);

            data.mv(`./uploads/${dataName}`);
            const content=req.body.content;
            const destination=req.body.destination;
            const source=req.body.source;
            const ship=req.body.ship;
            const state=req.body.state;
            db.query('INSERT INTO  ads VALUES(DEFAULT,?,?,?,?,?,?)',[destination,source,ship,content,state,dataName]).then((row,filds)=>{
        
            res.status(200).json({
                msg: dataName,
                
                length : row[0].length,
                data:row[0]
            })
    
        }).catch(function (e) {
            console.log(e.message);
                return next(new AppError(e.message, 404, '100'));
            })
            
        }
        
    });















    // exports.upload=catcherro(async (req,res,next)=>{
      
    //     var getname=(name)=>{
    //         var s=  name.split('.');
    //         var a=uuidv4();
           
    //         return `${a}.${s[1]}`
    //       }

    
    //   try {
    //     if(!req.files){
    //         res.status(400).json({
    //             statusbare: 'nodata'
    //         })
    //     }else{

            
    //         let datalist=[];
    //         let balam = req.files.photo;
    //         _.forEach(_.keysIn(balam),(key)=>{
    //             let data=balam[key];
                    
    //             data.mv(`./uploads/${getname(data.name)}`)
    //             datalist.push(data.name);
    //         })

    //         res.send({
    //             status: true,
    //             message: 'Files are uploaded',
    //             data1: datalist
    //         });
            
    //     }
    //   } catch (error) {
    //     next(new AppError(error, 500,'200'))
    //   }
    // });