const AppError = require('../../../../error/error')
const db = require('../../../../mysql/configDB').conDB;
const { query } = require('express');

const catcherro = (fn) => {
    return (req, res, next) => { fn(req, res, next).catch((e) => next(new AppError(e.message, 404))) }
}


//*================================ لیست  کیف پول ها  ==============================*/
exports.listWallet = catcherro(async (req, res, next) => {
    const model = req.body.model;


    db.query('call list_wallets_admin(?)', [model])
        .then((row, filds) => {

            res.status(200).json({
                msg: '',

                length: row[0][0].length,
                data: row[0][0]

            })

        }).catch(function (e) {
            console.log(e.message);
            return next(new AppError(e.message, 404, '100'));
        })
});

//*============================= لیست  پرداخت های  کاربر  بر اساس ای دی کاربر  ============================*/
exports.listPaymentUserById = catcherro(async (req, res, next) => {
    const model = req.body.model;


    db.query('call getPayment_user_byId_admin(?)', [model])
        .then((row, filds) => {

            res.status(200).json({
                msg: '',

                length: row[0][0].length,
                data: row[0][0]

            })

        }).catch(function (e) {
            console.log(e.message);
            return next(new AppError(e.message, 404, '100'));
        })
});

//*================================ لیست  کیف پول های کاربر بر اساس آی دی  ==============================*/
exports.listUserByIdWallet = catcherro(async (req, res, next) => {
    const model = req.body.model;


    db.query('call list_userById_wallet_admin(?)', [model])
        .then((row, filds) => {

            res.status(200).json({
                msg: '',

                length: row[0][0].length,
                data: row[0][0]

            })

        }).catch(function (e) {
            console.log(e.message);
            return next(new AppError(e.message, 404, '100'));
        })
});

