const AppError = require('../../../error/error')
const db = require('../../../mysql/configDB').conDB;
const dbRep = require('../../../mysql/configDB').conDBRep;
const sms = require('../../sms')
const upload = require('../../upload')
const fs = require('fs')

const catcherro = (fn) => {
    return (req, res, next) => { fn(req, res, next).catch((e) => next(new AppError(e.message, 404))) }
}

//*-------------------- ارسال مدارک و مشخصات کاربر-----------


exports.sendAuthUser = catcherro(async (req, res, next) => {

    const model = req.body.model;
    const modelJson = JSON.parse(model);
    console.log(model);
    upload.docUser(req, res, function (err) {


        if (err) {
            console.log(err);

            return next(new AppError('', 404, '100'));
        } else {


            db.query('call addNewModelAuthUserApp(?)', [model]).then((row) => {

                console.log(row[0][0][0]);

                if (!row[0][0][0].err) {
                    res.status(200).json({
                        length: row[0][0].length,
                        data: row[0][0]
                    })
                } else {
                    return next(new AppError('', 404, '100'));
                }

            }
            ).catch((error) => {

                next(new AppError(error.message, 404, '100'))
            });






        }
    })




});


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




//----------------------- check imo -------------

exports.checkimo = catcherro(async (req, res, next) => {

    const model = req.body.model;
    console.log(model);
    db.query('call checkImo(?)', [model]).then((row, filds) => {

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




//*---------------- ارسال اطلاعات مدل شناور بارج و یدکش به سرور-----------


exports.sendAuthShipUserBarjYadak = catcherro(async (req, res, next) => {

    const model = req.body.model;
    console.log(model);
    db.query('call saveShipBarjUser(?)', [model]).then((row) => {





        console.log(JSON.stringify(row[0][0][0]));

        if (!row[0][0][0].err) {
            res.status(200).json({
                length: row[0][0].length,
                data: [row[0][0][0].res]
            })
        }
        else {

            res.status(500).json({});

        }






    }
    ).catch((error) => {
        console.log(error.message);
        next(new AppError(error.message, 404, '100'))
    });




});














//*---------------- ارسال اطلاعات مدل شناور به سرور-----------


exports.sendAuthShipUser = catcherro(async (req, res, next) => {



    try {
        upload.uploadDocShipUser(req, res, function (err,) {

            const model = req.body.model;

            console.log(model);

            if (err) {
                res.status(400).json({});
            } else {

                db.query('call saveShipUser(?)', [model]).then((row) => {





                    console.log(JSON.stringify(row[0][0][0]));

                    if (!row[0][0][0].err) {
                        res.status(200).json({
                            length: row[0][0].length,
                            data: [row[0][0][0].res]
                        })
                    }
                    else {

                        res.status(500).json({});

                    }






                }
                ).catch((error) => {
                    console.log(error.message);
                    next(new AppError(error.message, 404, '100'))
                });
            }

        })

    } catch (error) {
        res.status(404).json({});
    }




});

//*---------------- نوع ویرایش ارسال اطلاعات مدل شناور به سرور-----------


exports.sendAuthShipUserEdit = catcherro(async (req, res, next) => {



    try {
        upload.uploadDocShipUser(req, res, function (err,) {

            const model = req.body.model;

            console.log(model);

            if (err) {
                res.status(400).json({});
            } else {

                db.query('call EditShipUser(?)', [model]).then((row) => {





                    console.log(JSON.stringify(row[0][0][0]));

                    if (!row[0][0][0].err) {
                        res.status(200).json({
                            length: 0,
                            data: []
                        })
                    }
                    else {

                        res.status(500).json({});

                    }






                }
                ).catch((error) => {
                    console.log(error.message);
                    next(new AppError(error.message, 404, '100'))
                });
            }

        })

    } catch (error) {
        res.status(404).json({});
    }




});
//*----------------   ثبت تیکت -----------


exports.sendTiket = catcherro(async (req, res, next) => {

    const model = req.body.model;


    dbRep.query('call rigtiket(?)', [model]).then((row) => {





        console.log(row[0][0]);

        if (!row[0][0].err) {
            res.status(200).json({
                length: row[0][0].length,
                data: row[0][0]
            })

            //!todo : پیامک ثبت تیکیت
        }
        else {

            res.status(500).json({});

        }






    }
    ).catch((error) => {
        console.log(error.message);
        next(new AppError(error.message, 404, '100'))
    });




});