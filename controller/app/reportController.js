const AppError = require('../../error/error')
const db = require('../../mysql/configDB').conDB;
const dbRep = require('../../mysql/configDBReport').conDBRep;
const sms = require('../sms')
const upload = require('../upload')
const fs = require('fs')

const catcherro = (fn) => {
    return (req, res, next) => { fn(req, res, next).catch((e) => next(new AppError(e.message, 404))) }
}

//!<<-------------------- گزارش خلاصه از مسیرها -------------->>

exports.reportListRoutes = catcherro(async (req, res, next) => {

    const model = req.body.model;
    console.log(model);


    db.query('call report_listInfoRouts_app(?)', [model]).then((row) => {



        res.status(200).json({
            msg: '',

            length: 1,
            data: row[0][0]
        })


    }
    ).catch((error) => {

        next(new AppError(error.message, 404, '100'))
    });




});



//!<<------------------- گزارش از یک مسیر خاص --------------->>

exports.reportSpecialRoute = catcherro(async (req, res, next) => {

    const model = req.body.model;
    console.log(model);


    dbRep.query('call reposrtSpecialRout(?)', [model]).then((row) => {



        res.status(200).json({
            msg: '',

            length: 1,
            data: row[0][0]
        })


        console.log(row[0][0]);

    }
    ).catch((error) => {

        next(new AppError(error.message, 404, '100'))
    });




});






//!<<------------------- دریافت لیست خلاصه تایپ های شناور --------------->>

exports.reportSummaryTypeShips = catcherro(async (req, res, next) => {



    dbRep.query('call reportCard_listSummaryTypeShips()', []).then((row) => {



        res.status(200).json({
            msg: '',

            length: 0,
            data: row[0][0]
        })


    }
    ).catch((error) => {

        next(new AppError(error.message, 404, '100'))
    });




});




//!<<------------------- خاص دریافت  اطلاعات  تایپ  شناور --------------->>

exports.reportSpecialTypeShip = catcherro(async (req, res, next) => {

    const model = req.body.model;
    console.log(model);


    dbRep.query('call reportSpecialTypeShip(?)', [model]).then((row) => {



        res.status(200).json({
            msg: '',

            length: 0,
            data: row[0][0]
        })


    }
    ).catch((error) => {

        next(new AppError(error.message, 404, '100'))
    });




});







//!<<------------------- خاص دریافت  اطلاعات  تایپ  شناور --------------->>

exports.getListQuize = catcherro(async (req, res, next) => {

    const typeAds = req.body.typeAds
    console.log(req.body);


    dbRep.query('call reportCard_listQuizeSurvay_app(?)', [typeAds]).then((row) => {



        res.status(200).json({
            msg: '',

            length: 0,
            data: row[0][0]
        })

        console.log(row[0][0])

    }
    ).catch((error) => {

        next(new AppError(error.message, 404, '100'))
    });




});




//!<<------------------- ثبت نظر سنجی ----------- --------------->>

exports.regSurvay = catcherro(async (req, res, next) => {

    const model = req.body.model
    console.log(model);


    dbRep.query('call reportCard_regSurvay_app(?)', [model]).then((row) => {



        res.status(200).json({
            msg: '',

            length: 0,
            data: [true]
        })



    }
    ).catch((error) => {

        next(new AppError(error.message, 404, '100'))
    });




});