const AppError = require('../../../../error/error')
const db = require('../../../../mysql/configDB').conDB;
const { query } = require('express');

const catcherro = (fn) => {
    return (req, res, next) => { fn(req, res, next).catch((e) => next(new AppError(e.message, 404))) }
}


exports.urlImageDocUser = catcherro(async (req, res, next) => {

    const name = req.query.name
    const options = {
        root: './image/docUser/'
    };
    res.sendFile(name, options, function (err) {



        if (err) {
            next(new AppError(err.message, 404, '100'))
        }
    })

});



exports.urlImageDocShip = catcherro(async (req, res, next) => {

    const name = req.query.name
    const options = {
        root: './image/docShip/'
    };
    res.sendFile(name, options, function (err) {



        if (err) {
            next(new AppError(err.message, 404, '100'))
        }
    })

});