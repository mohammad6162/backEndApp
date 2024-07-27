const AppError = require('../../../../error/error')
const db = require('../../../../mysql/configDB').conDB;
const { query } = require('express');

const catcherro = (fn) => {
    return (req, res, next) => { fn(req, res, next).catch((e) => next(new AppError(e.message, 404))) }
}



exports.listUsersIDentity = catcherro(async (req, res, next) => {
    const model = req.body.model


    db.query('call listUsersIDentityAdmin(?)', [model]).then((row, filds) => {

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



exports.getIdentyFileAuthUser = catcherro(async (req, res, next) => {
    const userID = req.body.userID;
    db.query('call getIdentyFileAuthUserAdmin(?)', [userID]).then((row, filds) => {

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



exports.updateStatusUsers = catcherro(async (req, res, next) => {
    const userID = req.body.userID;
    const authState = req.body.authState
    const idAccountState = req.body.idAccountState

    db.query('call updateStatusUsersToAdmin(?,?,?)', [idAccountState, authState, userID]).then((row, filds) => {

        res.status(200).json({
            msg: '',

            length: 1,
            data: true
        })

    }).catch(function (e) {
        console.log(e.message);
        return next(new AppError(e.message, 404, '100'));
    })
});


// * ------------------------    چک کردن وضعیت فایل کارت ملی و تصویر تعهد هر شخص -------

exports.checkDocPerson = catcherro(async (req, res, next) => {
    const idUser = req.body.idUser;

    db.query('call checkIdentityDocPerson(?)', [idUser]).then((row, filds) => {
        console.log(row[0][0])
        res.status(200).json({
            length: 1,
            data: row[0][0]
        })
    }).catch((error) => {
        console.log(query.sql);
        console.log(error.message);
        next(new AppError(error.message, 404, '100'))
    });
})


//-----------------------ارسال otp-------------

exports.sendOtp = catcherro(async (req, res, next) => {

    const mobile = req.body.mobile;
    const codeMeli = req.body.codeMeli;
    const otpCode = req.body.code;
    const hashcode = req.body.hashcode;
    console.log(req.body);

    sms.Otp(otpCode, mobile, hashcode);
    res.status(200).json({
        msg: '',

        length: 1,
        data: [true]
    });
});



//*--------------------Send new Auth Model-----------


exports.sendNewAuthModel = catcherro(async (req, res, next) => {

    const model = req.body.model;
    const modelJson = JSON.parse(model);
    console.log(model);

    db.query('call addNewModelAuthUserApp(?)', [model]).then((row) => {
        console.log(row[0][0][0]);

        if (row[0][0][0].err == 0) {
            res.status(200).json({
                length: row[0][0].length,
                data: row[0][0]
            })
        }
        else if (row[0][0][0].err == 1) {
            fs.unlink(`./image/image/${modelJson.pathNational}`, (err) => {
                if (err) console.log(err);
            })

            fs.unlink(`./image/image/${modelJson.pathAgreement}`, (err) => {
                if (err) console.log(err);
            })

            res.status(500).json({});
        }
        else {
            res.status(200).json({
                length: row[0][0].length,
                data: row[0][0]
            })
        }
    }).catch((error) => {
        console.log(query.sql);
        console.log(error.message);
        next(new AppError(error.message, 404, '100'))
    });


});
