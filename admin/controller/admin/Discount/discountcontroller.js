const AppError = require('../../../../error/error')
const db = require('../../../../mysql/configDB').conDB;
const { query } = require('express');

const catcherro = (fn) => {
    return (req, res, next) => { fn(req, res, next).catch((e) => next(new AppError(e.message, 404))) }
}


exports.insertOfferAdmin = catcherro(async (req, res, next) => {
    const model = req.body.model;

    const code = JSON.parse(model);

    const logDescripton = " کد تخفیف " + code.codeOffer + " ثبت شد ";

    // console.log(logDescripton);

    db.query(`call insertOfferAdmin(?,?)`, [model, logDescripton]).then((row, filds) => {
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



//*================================ ویرایش تخفیف ها ==============================*/
exports.updateListOfferAdmin = catcherro(async (req, res, next) => {
    const model = req.body.model;

    db.query(`call updateListOfferAdmin(?)`, [model]).then((row, filds) => {
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



exports.ListOfferAdmin = catcherro(async (req, res, next) => {
    const ColumSort = req.body.columSort;
    const TypeSort = req.body.typeSort;
    const search = req.body.search;
    const page = req.body.page;
    const lenght = req.body.lenght;


    db.query('call ListOfferAdmin(?,?,?,?,?)', [ColumSort, TypeSort, search, lenght, page])
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
exports.deleteDiscount = catcherro(async (req, res, next) => {
    const id = req.body.id;
    const idAdmin = req.body.idAdmin;

    const desc = " کد تخفیف به شناسه " + id + " حذف شد ";

    db.query('call deleteDiscountAdmin(?,?,?)', [id, idAdmin, desc]).then((row, filds) => {

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