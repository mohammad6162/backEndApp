const AppError = require('../error/error')
const db = require('../mysql/configDB').conDB;
const uploadBalams = require('./upload')
const jwt = require('jsonwebtoken');
const app = require('../app');

const sms = require('./sms');





const catcherro = (fn) => {
    return (req, res, next) => { fn(req, res, next).catch((e) => next(new AppError(e.message, 404))) }
}


//*<<-------------------- لیست آگهی های سفری از نوع اسمال------------>>
exports.listSmallAdsTrip = catcherro(async (req, res, next) => {
    const model = req.body.model;
    console.log(model)
    db.query('call  ps_ListAdsTrip_app(?)', [model]).then((row, filds) => {
        console.log(row[0])
        res.status(200).json({
            msg: '',

            length: row[0].length,
            data: row[0][0]
        })

    }).catch((e) => {
        console.log(e)
        next(new AppError(e.message, 404, '100'))
    })
});
//*<<-------------------- لیست آگهی های چاتری از نوع اسمال------------>>
exports.listSmallAdsRent = catcherro(async (req, res, next) => {
    const model = req.body.model;
    console.log(model)
    db.query('call ps_ListAdsRent_app(?)', [model]).then((row, filds) => {
        console.log(row[0][0])
        res.status(200).json({
            msg: '',

            length: row[0].length,
            data: row[0][0]
        })

    }).catch((e) => {
        console.log(e)
        next(new AppError(e.message, 404, '100'))
    })
});

//*<<------------------- نمایش آگهی سفری  برای شناور -------------------->>

exports.showAdsTripForShipper = catcherro(async (req, res, next) => {
    const model = req.body.idAdsMid;
    console.log(model)
    db.query('call PS_ShowAdsTrip_app(?)', [model]).then((row, filds) => {

        res.status(200).json({
            msg: '',

            length: row[0].length,
            data: row[0][0]
        })

    }).catch((e) => {
        console.log(e);
        next(new AppError(e.message, 404, '100'))
    })
});
//*<<------------------- نمایش آگهی سفری  برای شناور -------------------->>

exports.showAdsRentForShipper = catcherro(async (req, res, next) => {
    const model = req.body.idAdsMid;
    console.log(model)
    db.query('call PS_ShowAdsRentForShipper_app(?)', [model]).then((row, filds) => {
        console.log(row[0][0])
        res.status(200).json({
            msg: '',

            length: row[0].length,
            data: row[0][0]
        })

    }).catch((e) => {
        console.log(e)
        next(new AppError(e.message, 404, '100'))
    })
});



//*<<-------------------  کارنامه صاحب شناور -------------------->>

exports.reportCardOwnerShip = catcherro(async (req, res, next) => {
    const idUser = req.body.idUser;

    db.query('call reportCard_ownerShip_app(?)', [idUser]).then((row, filds) => {
        console.log(row[0][0])
        res.status(200).json({
            msg: '',

            length: row[0].length,
            data: row[0][0]
        })

    }).catch((e) => {
        console.log(e)
        next(new AppError(e.message, 404, '100'))
    })
});
//*<<-------------------  کارنامه صاحب کالا -------------------->>

exports.repositoryReportCardProduct = catcherro(async (req, res, next) => {
    const idUser = req.body.idUser;

    db.query('call reportCard_ownerProduct_app(?)', [idUser]).then((row, filds) => {
        console.log(row[0][0])
        res.status(200).json({
            msg: '',

            length: row[0].length,
            data: row[0][0]
        })

    }).catch((e) => {
        console.log(e)
        next(new AppError(e.message, 404, '100'))
    })
});


//*<<-------------------  لیست برای تابلوی پیشنهادات  -------------------->>

exports.panelListProposal = catcherro(async (req, res, next) => {
    const model = req.body.model;


    db.query('call gn_listProposal_app(?)', [model]).then((row, filds) => {
        console.log(row[0][0])
        res.status(200).json({
            msg: '',

            length: row[0].length,
            data: row[0][0]
        })

    }).catch((e) => {
        console.log(e)
        next(new AppError(e.message, 404, '100'))
    })
});


//*<<-------------------  لیست آماری برای تابلوی پیشنهادات  -------------------->>

exports.reporttStatistecsAdsProposal = catcherro(async (req, res, next) => {
    const idAdsMid = req.body.idAdsMid;


    db.query('call gn_reportStatistecsAdsProposal_app(?)', [idAdsMid]).then((row, filds) => {
        console.log(row[0][0])
        res.status(200).json({
            msg: '',

            length: row[0].length,
            data: row[0][0]
        })

    }).catch((e) => {
        console.log(e)
        next(new AppError(e.message, 404, '100'))
    })
});



//*<<-------------------   ثبت پیشنهاد سفری  -------------------->>
exports.addProposal = catcherro(async (req, res, next) => {
    const model = req.body.model;


    db.query('call Ps_addProposal_app(?)', [model]).then((row, filds) => {
        console.log(row[0][0])
        res.status(200).json({
            msg: '',

            length: row[0].length,
            data: row[0][0]
        })

    }).catch((e) => {
        console.log(e)
        next(new AppError(e.message, 404, '100'))
    })
});



//*<<-------------------   ثبت پیشنهاد سفری  -------------------->>
exports.test = catcherro(async (req, res, next) => {
    const model = req.body.model;


    res.status(200).json({
        name: 'ali',
        family: 'family'
    })
});