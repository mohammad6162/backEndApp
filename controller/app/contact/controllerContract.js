const AppError = require('../../../error/error')
const db = require('../../../mysql/configDB').conDB;
const dbRep = require('../../../mysql/configDB').conDBRep;
const sms = require('../../sms')
const upload = require('../../upload')
const fs = require('fs')

const catcherro = (fn) => {
    return (req, res, next) => { fn(req, res, next).catch((e) => next(new AppError(e.message, 404))) }
}



//!--------------------resive image contartc-----------


exports.dlImgSign = catcherro(async (req, res, next) => {

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






//!-------------------- ارسال مدارک و مشخصات کاربر-----------


exports.timeLineContract = catcherro(async (req, res, next) => {

    const model = req.body.model;
    db.query('call contract_timeLineContract(?)', [model]).then((row) => {

        console.log(row[0][0]);

        res.status(200).json({
            length: row[0][0].length,
            data: row[0][0]
        })

    }
    ).catch((error) => {

        next(new AppError(error.message, 404, '100'))
    });





});
//!<<------------------ ابطال قرداد -------------------------->>


exports.CancellContract = catcherro(async (req, res, next) => {

    const model = req.body.model;
    console.log(model)
    db.query('call `contract_cancell`(?)', [model]).then((row) => {

        console.log(row[0]);

        res.status(200).json({
            length: 1,
            data: [true]
        })

    }
    ).catch((error) => {

        next(new AppError(error.message, 404, '100'))
    });





});




//!<<----------------  دریافت داده ای قرارداد سفری  برای نمایش کامل ان  ----------->>

exports.initTechnicalContentTripAdvertiser = catcherro(async (req, res, next) => {
    const model = req.body.model;





    db.query('call contract_initTechnicalContractTrip_app(?)', [model]
    ).then((row, filds) => {


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



//!<<----------------  دریافت داده ای قرارداد چاتری  برای نمایش کامل ان  ----------->>

exports.initTechnicalContentRentAdvertiser = catcherro(async (req, res, next) => {
    const model = req.body.model;





    db.query('call contract_initTechnicalContractRent_app(?)', [model]
    ).then((row, filds) => {


        if (row[0][0][0].err) {
            return next(new AppError(e.message, 404, '100'));
        } else {
            console.log(row[0][0])
            res.status(200).json({
                msg: '',

                length: 1,
                data: row[0][0]
            })
        }






    }).catch(function (e) {
        console.log(e);
        return next(new AppError(e.message, 404, '100'));
    })
});





//!<<----------------   دریافت اطلاعات فنی چاتری برای صاحب شناور  ----------->>

exports.initTechnicalContentRentOwnerShip = catcherro(async (req, res, next) => {
    const idContratc = req.body.idContratc;





    db.query('call contarct_initTechnicalContractRentOwnerShip_app(?)', [idContratc]
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




//!<<----------------   دریافت اطلاعات فنی سفری برای صاحب شناور  ----------->>

exports.initTechnicalContentTripOwnerShip = catcherro(async (req, res, next) => {
    const idContratc = req.body.idContratc;





    db.query('call contarct_initTechnicalContractTripOwnerShip_app(?)', [idContratc]
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

















//!<<----------------   تایید و امضای قرداد سفری توسط صاحب آگهی  ----------->>

exports.signAndAcceptContarctTripAdvertiser = catcherro(async (req, res, next) => {



    upload.signature(req, res, function (err, signature) {
        const model = req.body.model;

        if (err) {
            console.log(e);
            return next(new AppError(e.message, 404, '100'));
        } else {




            db.query('call contract_SignAndAcceptContarctTripAdvertiser_app(?)', [model]
            ).then((row, filds) => {

                if (row[0][0][0].err) {
                    return next(new AppError(e.message, 404, '100'));
                } else {
                    console.log(row[0][0])
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
        }
    });


});





//!<<----------------   تایید و امضای قرداد چاتری توسط صاحب آگهی  ----------->>

exports.signAndAcceptContarctRentAdvertiser = catcherro(async (req, res, next) => {



    upload.signature(req, res, function (err, signature) {
        const model = req.body.model;

        if (err) {
            console.log(e);
            return next(new AppError(e.message, 404, '100'));
        } else {




            db.query('call contract_SignAndAcceptContarctRentAdvertiser_app(?)', [model]
            ).then((row, filds) => {

                if (row[0][0][0].err) {
                    return next(new AppError(e.message, 404, '100'));
                } else {
                    console.log(row[0][0])
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
        }
    });


});





//!<<----------------   تایید و امضای قرداد سفری توسط صاحب شناور  ----------->>

exports.signAndAcceptContarctTripOwnerShip = catcherro(async (req, res, next) => {



    upload.signature(req, res, function (err, signature) {
        const model = req.body.model;

        if (err) {
            console.log(e);
            return next(new AppError(e.message, 404, '100'));
        } else {




            db.query('call contract_SignAndAcceptContarctTripOwnerShip_app(?)', [model]
            ).then((row, filds) => {

                if (row[0][0][0].err) {
                    return next(new AppError(e.message, 404, '100'));
                } else {
                    console.log(row[0][0])
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
        }
    });


});





//!<<----------------   تایید و امضای قرداد چاتری توسط صاحب شناور  ----------->>

exports.signAndAcceptContarctRentOwnerShip = catcherro(async (req, res, next) => {



    upload.signature(req, res, function (err, signature) {
        const model = req.body.model;

        if (err) {
            console.log(e);
            return next(new AppError(e.message, 404, '100'));
        } else {




            db.query('call contract_SignAndAcceptContarctRentOwnerShip_app(?)', [model]
            ).then((row, filds) => {

                if (row[0][0][0].err) {
                    return next(new AppError(e.message, 404, '100'));
                } else {
                    console.log(row[0][0])
                    res.status(200).json({
                        msg: '',

                        length: 1,
                        data: []
                    })
                }







            }).catch(function (e) {
                console.log(e);
                return next(new AppError(e.message, 404, '100'));
            })
        }
    });


});





//!<<---------------------- دریافت کامل قرداداد سفری-------------------->>


exports.fullLoadContractTrip = catcherro(async (req, res, next) => {
    const idContract = req.body.idContract;





    db.query('call contarct_fullLoadContractTrip_app(?)', [idContract]
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


//!<<---------------------- دریافت کامل قرداداد چاتری-------------------->>


exports.fullLoadContractRent = catcherro(async (req, res, next) => {
    const idContract = req.body.idContract;



    console.log(idContract)

    db.query('call contarct_fullLoadContractRent_app(?)', [idContract]
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













//!<<--------------------------  دریافت آخرین متن قرارداد سفری/چاتر ----------->>

exports.getLastContentContarct = catcherro(async (req, res, next) => {
    const model = req.body.typeAds;
    db.query('call contract_lastContentContract_app(?)', [typeAds]
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
