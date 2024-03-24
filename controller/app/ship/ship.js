const AppError = require('../../../error/error')
const db = require('../../../mysql/configDB').conDB;
const express = require('express');

const request = require('request');


const catcherro = (fn) => {
    return (req, res, next) => { fn(req, res, next).catch((e) => next(new AppError(e.message, 404))) }
}





//!<<------------ لیست پیشنهادات کاربر ------------------->>




exports.listProposalUser = catcherro(async (req, res, next) => {


    const model = req.body.model;



    db.query(`call PS_listProposalUser_app(?)`, [model]
    ).then((row, filds) => {

        console.log(row[0][0][0])
        res.status(200).json({
            length: 12,
            msg: '',
            data: row[0][0]
        })







    }).catch(function (e) {
        console.log(e);
        return next(new AppError(e.message, 404, '100'));
    })
});


//!<<----------------------- لیست شناورهای کاربر---------------------->>

exports.listShipUser = catcherro(async (req, res, next) => {


    const idUser = req.body.idUser;
    console.log(idUser)


    db.query(`call listShipUser(?)`, [idUser]
    ).then((row, filds) => {

        console.log(row[0][0][0]['List'][1])
        res.status(200).json({
            length: 12,
            msg: '',
            data: row[0][0][0].List == null ? [] : row[0][0][0].List
        })






        // sms.smsNewAds(row[0][0][0].listid.join(),mobile)
    }).catch(function (e) {
        console.log(e);
        return next(new AppError(e.message, 404, '100'));
    })
});



//*<<-----------------------  پیش ثبت نام شناور --------------------->>

exports.PSpreRegistertionShip = catcherro(async (req, res, next) => {

    const model = req.body.model;
    console.log(model);
    db.query('call PSpreRegistertaionShip(?)', [model]).then((row, filds) => {
        console.log([row[0][0][0].lastid]);

        if (row[0][0][0].err == 1) {
            res.status(500).json({});
        } else {
            res.status(200).json({
                msg: '',

                length: 1,
                data: [row[0][0][0].lastid]
            })
        }


    }).catch(function (e) {
        console.log(e.message);
        return next(new AppError(e.message, 404, '100'));
    })






});
