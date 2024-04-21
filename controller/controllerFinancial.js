const AppError = require('../error/error')
const db = require('../mysql/configDB').conDB;
const jwt = require('jsonwebtoken');
const { query } = require('express');

const catcherro = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((e) => next(new AppError(e.message, 404)))


    }
}

//!<<------------------- دریافت لیست تخفیفها ----------------->>
exports.InitializationInvoice = catcherro(async (req, res, next) => {
    const model = req.body.model;


    db.query('call financial_InitializationInvoice(?)', [model]).then((row, filds) => {
        console.log(row[0][0][0])

        if (row[0][0][0].err) {
            return next(new AppError(e.message, 404, '100'));
        } else {
            res.status(200).json({
                msg: '',

                length: row[0].length,
                data: [row[0][0][0].res]
            })
        }


    }).catch(function (e) {
        console.log(e.message);
        return next(new AppError(e.message, 404, '100'));
    })
});




//!<<-------------------  گردش مالی آنلاین  ----------------->>
exports.getListTurnoverPaymant = catcherro(async (req, res, next) => {
    const idUserInfo = req.body.idUserInfo;


    db.query('call finnacial_listTurnoverPaymant_app(?)', [idUserInfo]).then((row, filds) => {
        res.status(200).json({
            msg: '',

            length: row[0].length,
            data: row[0][0]
        })


    }).catch(function (e) {
        console.log(e.message);
        return next(new AppError(e.message, 404, '100'));
    })
});



//!<<-------------------  گردش مالی کیف پول  ----------------->>
exports.getListTurnoverWallet = catcherro(async (req, res, next) => {
    const idUserInfo = req.body.idUserInfo;


    db.query('call finnacial_listTurnoverWallet_app(?)', [idUserInfo]).then((row, filds) => {
        res.status(200).json({
            msg: '',

            length: row[0].length,
            data: row[0][0]
        })
        console.log(row[0][0])
    }).catch(function (e) {
        console.log(e.message);
        return next(new AppError(e.message, 404, '100'));
    })
});



//!<<------------------------- چک کرن کدتخفیف ----------------->>
exports.checkOfferCode = catcherro(async (req, res, next) => {
    const model = req.body.model;

    console.log(model);
    db.query('call financial_checkcodeOffer(?)', [model]).then((row, filds) => {

        res.status(200).json({
            msg: '',

            length: row[0].length,
            data: row[0][0]
        })
        console.log(row[0])
    }).catch(function (e) {
        console.log(e.message);
        return next(new AppError(e.message, 404, '100'));
    })
});




//!<<------------------------- چک کرن کدتخفیف ----------------->>
exports.getNameMarketer = catcherro(async (req, res, next) => {
    const codeMarketer = req.body.codeMarketer;

    console.log(codeMarketer);
    db.query('call financial_getNameMarketer(?)', [codeMarketer]).then((row, filds) => {

        res.status(200).json({
            msg: '',

            length: row[0].length,
            data: row[0][0]
        })
        console.log(row[0][0])
    }).catch(function (e) {
        console.log(e.message);
        return next(new AppError(e.message, 404, '100'));
    })
});





//!<<-------------------------  تایید نهایی فاکتور طرف دوم  ----------------->>
exports.acceptInvoiceSideTow = catcherro(async (req, res, next) => {
    const model = req.body.model;


    db.query('call financial_RegInvoice(?)', [model]).then((row, filds) => {

        res.status(200).json({
            msg: '',

            length: 1,
            data: row[0][0]
        })


        console.log(row[0][0])




    }).catch(function (e) {
        console.log(e.message);
        return next(new AppError(e.message, 404, '100'));
    })





});