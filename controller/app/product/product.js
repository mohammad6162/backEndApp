const AppError = require('../../../error/error')
const db = require('../../../mysql/configDB').conDB;
const express = require('express');
const request = require('request');
const upload = require('../../upload');
const fs = require('fs');

const catcherro = (fn) => {
    return (req, res, next) => { fn(req, res, next).catch((e) => next(new AppError(e.message, 404))) }
}

//!  ----------------ثبت آگهی جدید سفری--------------------

exports.saveTrip = catcherro(async (req, res, next) => {



    upload.imageAds(req, res, function (err) {
        const model = req.body.model;
        if (err) {
            console.log(err);
            return next(new AppError('not Upload', 404, '100'));
        } else {

            db.query(`call saveTrip(?)`, [model]
            ).then((row, filds) => {


                res.status(200).json({
                    msg: '',
                    data: row[0][0][0].listid
                })
                console.log(row[0][0][0].listid)




                // sms.smsNewAds(row[0][0][0].listid.join(),mobile)
            }).catch(function (e) {
                console.log(e);
                return next(new AppError(e.message, 404, '100'));
            })
        }
    })






});



//! ------------------------ ویرایش آگهی سغری---------
exports.EditTrip = catcherro(async (req, res, next) => {



    upload.imageAds(req, res, function (err) {
        const model = req.body.model;

        if (err) {
            console.log(err);
            return next(new AppError('not Upload', 404, '100'));
        } else {
            console.log(model);
            db.query(`call EditTrip(?)`, [model]
            ).then((row, filds) => {
                console.log(row[0][0]);

                res.status(200).json({
                    msg: '',
                    length: 1,
                    data: [1]
                })





                // sms.smsNewAds(row[0][0][0].listid.join(),mobile)
            }).catch(function (e) {
                console.log(e);
                return next(new AppError(e.message, 404, '100'));
            })
        }
    })




});

//! ------------------------ تست-------------

exports.test = catcherro(async (req, res, next) => {


    const model = req.body.model;

    const mobile = req.body.mobile;

    // console.log(JSON.parse(model));

    db.query(`SELECT * FROM adsTripExpectation`, [model]
    ).then((row, filds) => {


        res.status(200).json({
            msg: '',
            data: row
        })

    }).catch(function (e) {
        console.log(e);
        return next(new AppError(e.message, 404, '100'));
    })
});


//!  ----------------ثبت آگهی جدید چارتری--------------------

exports.saveRent = catcherro(async (req, res, next) => {



    const objectRent = req.body.model;


    db.query('call rent_saveRent_app(?)', [objectRent]).then((row, filds) => {


        res.status(200).json({
            length: 1,
            data: [{ 'code': row[0][0][0].Lastid }]
        })


        console.log(row[0][0])

        //   sms.smsEditAds( JSON.parse(objectRent).idadsMid,mobile)






    }

    ).catch((error) => {

        next(new AppError(error.message, 404, '100'))
    });




}
)

//! ------------------------ ویرایش آگهی چاتری---------
exports.EditRent = catcherro(async (req, res, next) => {

    const objectRent = req.body.objectRent;
    console.log(JSON.parse(objectRent));
    db.query('call rent_EditRent_app(?)', [objectRent]).then((row) => {









        res.status(200).json({
            length: 1,
            data: [true]
        })




    }

    ).catch((error) => {
        console.log(error)
        next(new AppError(error, 404, '100'))
    });




}
)

//!  ----------------  دریافت شی چارتی برای ویرایش --------------------

exports.getObjRent = catcherro(async (req, res, next) => {
    const idMid = req.body.idAdsMid;

    db.query('CALL getobjRent(?)', [idMid]).then((row, filds) => {


        res.status(200).json({
            length: 1,
            data: row[0][0]
        })
        //   sms.smsEditAds( JSON.parse(objectRent).idadsMid,mobile)

    }

    ).catch((error) => {

        next(new AppError(error.message, 404, '100'))
    });




}
)

//!<<------------- لیست آگهی های سفری من ---------------->>

exports.ppListAdsTrip = catcherro(async (req, res, next) => {
    const model = req.body.model;

    db.query('CALL PP_ListAdsTrip_app(?)', [model]).then((row, filds) => {

        console.log(row[0][0])
        res.status(200).json({
            length: row[0][0].length,
            data: row[0][0]
        })

    }

    ).catch((error) => {
        console.log(error)
        next(new AppError(error.message, 404, '100'))
    });




}
)

//!<<-------------------- لیست آگهی های چاتری من ---------------->>

exports.ppListAdsRent = catcherro(async (req, res, next) => {
    const model = req.body.model;

    db.query('CALL PP_ListAdsRent_app(?)', [model]).then((row, filds) => {

        console.log(row[0][0])
        res.status(200).json({
            length: row[0][0].length,
            data: row[0][0]
        })

    }

    ).catch((error) => {
        console.log(error)
        next(new AppError(error.message, 404, '100'))
    });




}
)
//!<<----------------------  لیست    تایم لاین    ------------------>>
exports.TimeLine = catcherro(async (req, res, next) => {


    const idAdsMid = req.body.idAdsMid;
    const idUser = req.body.idUser;


    console.log(new Date().toString())
    db.query('call listTmeLine(?,?)', [idAdsMid, idUser]
    ).then((row, filds) => {


        console.log(row[0])
        res.status(200).json({
            msg: '',

            length: row[0][0].length,
            data: row[0][0]
        })

    }).catch(function (e) {
        console.log(e);
        return next(new AppError(e.message, 404, '100'));
    })
});

// 16673233493

//!<<----------------------  نمایش اطلاعات شناور به صاحب آگهی   ------------------>>
exports.PpShowInfoShip = catcherro(async (req, res, next) => {


    const idShip = req.body.idShip;



    console.log(idShip);
    db.query('call PPshowInfoShip(?)', [idShip]
    ).then((row, filds) => {
        console.log(row[0][0][0].res)

        if (row[0][0][0].res == null) {
            res.status(200).json({
                msg: '',
                length: 0,
                data: []
            })
        } else {
            res.status(200).json({
                msg: '',
                length: 1,
                data: row[0][0][0].res
            })
        }


    }).catch(function (e) {
        console.log(e);
        return next(new AppError(e.message, 404, '100'));
    })
});

//!<<--------------------------- تایید قراداد سفری و ارسال عکس و بستم آگهی ----------->>
//

exports.acceptAdsTrip = catcherro(async (req, res, next) => {




    upload.signature(req, res, function (err) {

        const model = req.body.model;

        const modeljs = JSON.parse(model);
        console.log(modeljs);


        db.query('call PPAcceptAdsTrip(?)', [model]
        ).then((row, filds) => {


            const resDb = row[0][0][0];

            if (res.err) {
                return next(new AppError('', 404, '100'));
            } else {
                if (res.status) {
                    fs.unlink(`./image/signature/${modeljs.nameFileSignature}`, (err) => {
                        if (err) {
                            return next(new AppError(err, 404, '100'));
                        } else {
                            res.status(200).json({
                                msg: '',

                                length: 1,
                                data: [resDb]
                            })
                        }
                    });
                } else {
                    res.status(200).json({
                        msg: '',

                        length: 1,
                        data: [resDb]
                    })
                }

            }


        }).catch(function (e) {
            console.log(e);
            return next(new AppError(e.message, 404, '100'));
        })

    })


});




//!<<--------------------------- تایید قراداد چاتری و ارسال عکس و بستم آگهی ----------->>
//

exports.acceptAdsRent = catcherro(async (req, res, next) => {




    upload.signature(req, res, function (err) {

        const model = req.body.model;

        const modeljs = JSON.parse(model);
        console.log(modeljs);


        db.query('call PPAcceptAdsRent(?)', [model]
        ).then((row, filds) => {


            const resDb = row[0][0][0];

            if (res.err) {
                return next(new AppError('', 404, '100'));
            } else {
                if (res.status) {
                    fs.unlink(`./image/signature/${modeljs.nameFileSignature}`, (err) => {
                        if (err) {
                            return next(new AppError(err, 404, '100'));
                        } else {
                            res.status(200).json({
                                msg: '',

                                length: 1,
                                data: [resDb]
                            })
                        }
                    });
                } else {
                    res.status(200).json({
                        msg: '',

                        length: 1,
                        data: [resDb]
                    })
                }

            }


        }).catch(function (e) {
            console.log(e);
            return next(new AppError(e.message, 404, '100'));
        })

    })


});

//!<<---------لغو آگهی سفری یا سفری ------>>

exports.PPCencellAds = catcherro(async (req, res, next) => {


    const model = req.body.model;





    db.query('call `PP_CancellAds_app`(?)', [model]
    ).then((row, filds) => {
        console.log(row[0])
        res.status(200).json({
            msg: '',

            length: 1,
            data: true
        })



    }).catch(function (e) {
        console.log(e);
        return next(new AppError(e.message, 404, '100'));
    })
});


//!<<----------------------لغو آگهی سفری یا چاتری ------------->>

exports.PPCencellAdsRent = catcherro(async (req, res, next) => {


    const model = req.body.model;
    const modelJson = JSON.parse(model);



    console.log(new Date().toString())
    db.query('call PPCancellAdsRent(?)', [model]
    ).then((row, filds) => {

        console.log(row[0][0][0].res)
        if (modelJson.keyState == 3) {
            //!---- > ارسال پیامک به طرف قرارداد که نسل شده 
            console.log(`send sms ${row[0][0][0].res}`)
            res.status(200).json({
                msg: '',

                length: 1,
                data: [{ res: true }]
            })
        } else {
            res.status(200).json({
                msg: '',

                length: 1,
                data: [{ res: true }]
            })
        }




    }).catch(function (e) {
        console.log(e);
        return next(new AppError(e.message, 404, '100'));
    })
});


//!<<--------------------------- دریافت اطلاعات بین دو مسیر ----------->>


exports.getInfoRoute = catcherro(async (req, res, next) => {
    const model = req.body.model;



    console.log(model);

    db.query('call getInfoRoute(?)', [model]
    ).then((row, filds) => {


        console.log(row[0][0])
        res.status(200).json({
            msg: '',

            length: 1,
            data: row[0][0]
        })





    }).catch(function (e) {
        console.log(e);
        return next(new AppError(e.message, 404, '100'));
    })
});



//!<<--------------------------- دریافت لیست قرادادها  ----------->>

exports.listContractProduct = catcherro(async (req, res, next) => {
    const model = req.body.model;





    db.query('call contarct_ListContractProductTrip_app(?)', [model]
    ).then((row, filds) => {


        console.log(row[0][0])
        res.status(200).json({
            msg: '',

            length: 1,
            data: row[0][0]
        })





    }).catch(function (e) {
        console.log(e);
        return next(new AppError(e.message, 404, '100'));
    })
});




//!<<----------------  دریافت داده ای قرارداد سفری  برای نمایش کامل ان  ----------->>

exports.loadContractTip = catcherro(async (req, res, next) => {
    const model = req.body.model;





    db.query('call homeProduct_loadContractTrip_app(?)', [model]
    ).then((row, filds) => {


        console.log(row[0][0])
        res.status(200).json({
            msg: '',

            length: 1,
            data: row[0][0]
        })





    }).catch(function (e) {
        console.log(e);
        return next(new AppError(e.message, 404, '100'));
    })
});




//!--------------------  دریافت تصویر امضا-----------


exports.dlImgSig = catcherro(async (req, res, next) => {

    const name = req.query.name
    const options = {
        root: './image/signature'
    };
    res.sendFile(name, options, function (err) {



        if (err) {
            next(new AppError(err.message, 404, '100'))
        }
    })

});




//!<<------------------------ دریافت شی سفری برای ویرایش -------------->>

exports.getobjTrip = catcherro(async (req, res, next) => {


    const idAdsMid = req.body.idAdsMid;



    db.query(`call getobjTrip(?)`, [idAdsMid]
    ).then((row, filds) => {

        console.log(row[0][0])
        res.status(200).json({
            msg: '',

            length: row[0][0].length,
            data: row[0][0]
        })

    }).catch(function (e) {
        console.log(e);
        return next(new AppError(e.message, 404, '100'));
    })
});