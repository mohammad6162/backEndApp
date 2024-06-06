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




    upload.docUser(req, res, function (err) {
        console.log(req.body);
        const model = req.body.model;

        if (err) {
            console.log(err);

            return next(new AppError(err, 404, '100'));
        } else {


            db.query('call profile_CompeletDateUser_app(?)', [model]).then((row) => {



                res.status(200).json({
                    msg: '',

                    length: 1,
                    data: [true]
                })


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
    db.query('call addShipUser_checkImo_app(?)', [model]).then((row, filds) => {

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


exports.joinYadakBarj = catcherro(async (req, res, next) => {

    const model = req.body.model;
    console.log(model);
    db.query('call addShipUser_joinYadakBarj_app(?)', [model]).then((row) => {





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

                db.query('call addShipUser_saveDateShip_app(?)', [model]).then((row) => {







                    res.status(200).json({
                        length: 1,
                        data: [true]
                    })






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


// exports.sendAuthShipUserEdit = catcherro(async (req, res, next) => {



//     try {
//         upload.uploadDocShipUser(req, res, function (err,) {

//             const model = req.body.model;

//             console.log(model);

//             if (err) {
//                 res.status(400).json({});
//             } else {

//                 db.query('call addShipUser_EditShipUser_app(?)', [model]).then((row) => {





//                     console.log(JSON.stringify(row[0][0][0]));

//                     if (!row[0][0][0].err) {
//                         res.status(200).json({
//                             length: 0,
//                             data: []
//                         })
//                     }
//                     else {

//                         res.status(500).json({});

//                     }






//                 }
//                 ).catch((error) => {
//                     console.log(error.message);
//                     next(new AppError(error.message, 404, '100'))
//                 });
//             }

//         })

//     } catch (error) {
//         res.status(404).json({});
//     }




// });



//*----------------   ثبت تیکت -----------


exports.sendTiket = catcherro(async (req, res, next) => {

    const model = req.body.model;

    console.log(model);
    db.query('call gn_rigTiket_app(?)', [model]).then((row) => {





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