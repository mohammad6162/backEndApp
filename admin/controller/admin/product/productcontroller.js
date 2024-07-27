const AppError = require('../../../../error/error')
const db = require('../../../../mysql/configDB').conDB;
const { query } = require('express');

const catcherro = (fn) => {
    return (req, res, next) => { fn(req, res, next).catch((e) => next(new AppError(e.message, 404))) }
}


exports.ListProductAdmin = catcherro(async (req, res, next) => {

    db.query('call ListProductAdmin()')
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



//==================================================================
exports.deleteProductAdmin = catcherro(async (req, res, next) => {
    const id = req.body.id;

    db.query('call deleteProductAdmin(?)', [id]).then((row, filds) => {

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



exports.insertProductAdmin = catcherro(async (req, res, next) => {
    const name = req.body.name;
    const desc = req.body.description;
    const image = req.body.image;


    db.query('call insertProductAdmin(?,?,?)', [name, desc, image]).then((row, filds) => {

        res.status(200).json({
            msg: '',

            length: row[0].length,
            data: [{ 'state': 'ok' }]
        })

    }).catch(function (e) {
        console.log(e.message);
        return next(new AppError(e.message, 404, '100'));
    })
});



exports.updateProductAdmin = catcherro(async (req, res, next) => {
    const name = req.body.name;
    const desc = req.body.description;
    const image = req.body.image;
    const id = req.body.id;


    db.query('call updateProductAdmin(?,?,?,?)', [name, desc, image, id]).then((row, filds) => {

        res.status(200).json({
            msg: '',

            length: row[0].length,
            data: [{ 'state': 'ok' }]
        })

    }).catch(function (e) {
        console.log(e.message);
        return next(new AppError(e.message, 404, '100'));
    })
});



//*<<------------------------ دریافت شی سفری برای ویرایش -------------->>
exports.getDataTripForEdit = catcherro(async (req, res, next) => {
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


//*  ----------------  دریافت شی چارتی برای ویرایش --------------------
exports.getObjRent = catcherro(async (req, res, next) => {
    const idMid = req.body.idAdsMid;

    db.query('CALL getobjRent(?)', [idMid]).then((row, filds) => {
        res.status(200).json({
            length: 1,
            data: row[0][0]
        })
        //   sms.smsEditAds( JSON.parse(objectRent).idadsMid,mobile)

    }).catch((error) => {

        next(new AppError(error.message, 404, '100'))
    });
})