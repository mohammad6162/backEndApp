const AppError = require('../../../../error/error')
const db = require('../../../../mysql/configDB').conDB;
const { query } = require('express');

const catcherro = (fn) => {
    return (req, res, next) => { fn(req, res, next).catch((e) => next(new AppError(e.message, 404))) }
}


exports.ListRoutesAdmin = catcherro(async (req, res, next) => {
    const ColumSort = req.body.columSort;
    const TypeSort = req.body.typeSort;
    const search = req.body.search;
    const page = req.body.page;
    const lenght = req.body.lenght;


    db.query('call ListRoutesAdmin(?,?,?,?,?)', [ColumSort, TypeSort, search, lenght, page])
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

//*<<--------------------------- دریافت اطلاعات بین دو مسیر ----------->>
exports.getInfoRoute = catcherro(async (req, res, next) => {
    const model = req.body.model;

    console.log(model);

    db.query('call getInfoRoute(?)', [model]).then((row, filds) => {
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


//==================================================================
exports.deleteRoutesAdmin = catcherro(async (req, res, next) => {
    const id = req.body.id;

    db.query('call deleteRouteAdmin(?)', [id]).then((row, filds) => {

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



exports.insertRouteAdmin = catcherro(async (req, res, next) => {
    const s1 = req.body.seaportFirst;
    const s2 = req.body.seaportEnd;
    const space = req.body.space;
    const day = req.body.day;

    db.query(`call insertRouteAdmin(?,?,?,?)`,
        [s1, s2, space, day]).then((row, filds) => {
            res.status(200).json({
                msg: '',

                ength: 1,
                data: [{ 'state': 'ok' }]
            })

        }).catch(function (e) {
            console.log(e.message);
            return next(new AppError(e.message, 404, '100'));
        })
});

