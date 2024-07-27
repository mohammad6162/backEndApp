const AppError = require('../../../../error/error')
const db = require('../../../../mysql/configDB').conDB;
const { query } = require('express');
const upload = require('../../upload');

const catcherro = (fn) => {
    return (req, res, next) => { fn(req, res, next).catch((e) => next(new AppError(e.message, 404))) }
}


//*================================ فاکتور  ==============================*/
exports.financialGetModelInvoiceAdmin = catcherro(async (req, res, next) => {
    const invoiceMid = req.body.invoiceMid;


    db.query('call financial_GetModelInvoice_Admin(?)', [invoiceMid])
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





exports.ListcontactContract = catcherro(async (req, res, next) => {
    const model = req.body.model;


    db.query('call ListcontactContractAdmin(?)', [model])
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


//*================================ لیست قرارداد ها ==============================*/
exports.ListContracts = catcherro(async (req, res, next) => {
    const model = req.body.model;


    db.query('call ListContractsAdmin(?)', [model])
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


//*================================ ثبت قرارداد ==============================*/
exports.insertcontactContract = catcherro(async (req, res, next) => {
    const content = req.body.content;
    const isTrip = req.body.isTrip;
    const idAdmin = req.body.idAdmin;


    db.query('call insertContentContractAdmin(?,?,?)', [content, isTrip, idAdmin]).then((row, filds) => {

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


//*================================ ویرایش قرارداد ==============================*/
exports.updateContentConstract = catcherro(async (req, res, next) => {
    const content = req.body.content;
    const isTrip = req.body.isTrip;
    const id = req.body.id;


    db.query('call updateContentConstractAdmin(?,?,?)', [content, isTrip, id]).then((row, filds) => {

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




//*<<---------------------- دریافت کامل قرداداد سفری-------------------->>
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



exports.updateContractStatusAdmin = catcherro(async (req, res, next) => {
    const status = req.body.status0;
    const idContract = req.body.idContract
    const idAdmin = req.body.idAdmin

    db.query('call update_ContractStatus_Admin(?,?,?)', [status, idAdmin, idContract]).then((row, filds) => {

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