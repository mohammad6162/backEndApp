const AppError=require('../../../error/error')
const db=require('../../../mysql/configDB').conDB;
const { query } = require('express');

const catcherro=(fn)=>{
    return (req,res,next)=>{fn(req,res,next).catch((e)=>next(new AppError(e.message,404)))}
    }
 

exports.listUsers=catcherro(async (req,res,next)=>{
    const langhtList=req.body.langhtList;
    const sort=req.body.sort;
    const typeAccount=req.body.typeAccount;
    const page=req.body.page;
    const nameSort=req.body.nameSort;
    const search=req.body.search0;


db.query('call listUser(?,?,?,?,?,?)',[langhtList,page,sort,nameSort,typeAccount,search]).then((row,filds)=>{

    res.status(200).json({
        msg: '',
        
        length : row[0][0].length,
        data:row[0][0]
        
    })

}).catch(function (e) {
    console.log(e.message);
        return next(new AppError(e.message, 404, '100'));
    })
});




//=============================================  group


exports.listParentGroup=catcherro(async (req,res,next)=>{
  
    db.query('SELECT * from parent_group').then((row,filds)=>{
    
        res.status(200).json({
            msg: 'ok',
            
            length : row[0].length,
            data:row[0]
        })

    }).catch(function (e) {
        console.log(e.message);
            return next(new AppError(e.message, 404, '100'));
        })
});

