const AppError = require('../../../../error/error')
const db = require('../../../../mysql/configDB').conDB;
const { query } = require('express');
const upload = require('../../upload');

const catcherro = (fn) => {
    return (req, res, next) => { fn(req, res, next).catch((e) => next(new AppError(e.message, 404))) }
}



exports.listTickets = catcherro(async (req, res, next) => {
    const model = req.body.model;


    db.query('call List_Ticket_Admin(?)', [model]).then((row, filds) => {

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




exports.listTicketsAnswer = catcherro(async (req, res, next) => {
    const ticketCode = req.body.ticketCode;


    db.query('call List_Ticket_Answer_Admin(?)', [ticketCode]).then((row, filds) => {

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




//*================================ ثبت تیکت پاسخ ==============================*/
exports.insertTicketAnswerAdmin = catcherro(async (req, res, next) => {
    const idAdmin = req.body.idAdmin;
    const description = req.body.description;
    const ticketId = req.body.ticketId;

    const logDesc = ' تیکت به شماره ' + ticketId + 'پاسخ داده شد ';

    db.query('call insert_TicketAnswer_Admin(?,?,?,?)', [idAdmin, description, ticketId, logDesc]).then((row, filds) => {

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



//*================================ بسته شدن  تیکت پاسخ ==============================*/
exports.deleteTicket = catcherro(async (req, res, next) => {
    const idAdmin = req.body.idAdmin;
    const ticketId = req.body.ticketId;

    const logDesc = ' تیکت به شماره ' + ticketId + '  بسته شد ';

    db.query('call delete_ticket_Admin(?,?,?)', [ticketId, idAdmin, logDesc]).then((row, filds) => {

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
