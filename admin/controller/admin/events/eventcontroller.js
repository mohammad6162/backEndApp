const AppError = require('../../../../error/error')
const db = require('../../../../mysql/configDB').conDB;
const { query } = require('express');

const catcherro = (fn) => {
    return (req, res, next) => { fn(req, res, next).catch((e) => next(new AppError(e.message, 404))) }
}


//*================================ لیست لاگ شناور ها  ==============================*/
exports.listLogShipUser = catcherro(async (req, res, next) => {
    const model = req.body.model;


    db.query('call List_log_ShipUser_Admin(?)', [model])
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



//*================================ لیست لاگ تیکت ها  ==============================*/
exports.listLogTickets = catcherro(async (req, res, next) => {
    const model = req.body.model;


    db.query('call List_log_Ticket_Admin(?)', [model])
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



//*================================ لیست  تخفیف ها  ==============================*/
exports.listLogDiscount = catcherro(async (req, res, next) => {
    const model = req.body.model;


    db.query('call List_log_Discount_Admin(?)', [model])
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


//*================================ لیست  اسلایدر ها  ==============================*/
exports.listLogSlider = catcherro(async (req, res, next) => {
    const model = req.body.model;


    db.query('call List_log_Slider_Admin(?)', [model])
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
exports.deleteLogDiscount = catcherro(async (req, res, next) => {
    const id = req.body.id;


    db.query('call deleteLogDiscountAdmin(?)', [id]).then((row, filds) => {

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



//==================================================================
exports.deleteLogTicket = catcherro(async (req, res, next) => {
    const id = req.body.id;


    db.query('call deleteLogTicketAdmin(?)', [id]).then((row, filds) => {

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


//&=============================== slider ===================================
exports.deleteLogSlider = catcherro(async (req, res, next) => {
    const id = req.body.id;


    db.query('call deleteLogSliderAdmin(?)', [id]).then((row, filds) => {

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

//&=============================== ship user log delete ===================================
exports.deleteLogShipUser = catcherro(async (req, res, next) => {
    const id = req.body.id;


    db.query('call deleteLogShipUserAdmin(?)', [id]).then((row, filds) => {

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