const AppError = require('../../error/error')
const db = require('../../mysql/configDB').conDB;
const express = require('express');
var url = require('url');
const jwt = require('jsonwebtoken');
const app = require('../../app');
const https = require('https');
const request = require('request');

const app1 = express();
const catcherro = (fn) => {
    return (req, res, next) => { fn(req, res, next).catch((e) => next(new AppError(e.message, 404))) }
}



exports.ver = catcherro(async (req, res, next) => {

    db.query('SELECT * FROM valuesBalam WHERE id=1').then((row, filds) => {

        res.status(200).json({
            msg: '',

            length: row[0].length,
            data: row[0]
        })

    }).catch(e => next(new AppError(e.message, 404, '100')))
});

exports.listcity = catcherro(async (req, res, next) => {
    const page = req.body.page;
    const name = req.body.name;

    db.query('call listCity(?,?)', [page, name]).then((row, filds) => {

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

exports.checkCodemeli = catcherro(async (req, res, next) => {
    const codeMeli = req.body.codeMeli


    db.query('SELECT id FROM userInfo WHERE codeMeli = ?', [codeMeli]).then((row, filds) => {

        res.status(200).json({
            msg: '',

            length: 1,
            data: [
                { 'status': row[0] ?? 'noUser' }
            ]
        })

    }).catch(function (e) {
        console.log(e.message);
        return next(new AppError(e.message, 404, '100'));
    })
});

exports.listcountry = catcherro(async (req, res, next) => {



    db.query('SELECT * FROM `country`').then((row, filds) => {

        res.status(200).json({
            msg: '',

            length: row[0].length,
            data: row[0]
        })

    }).catch(function (e) {
        console.log(e.message);
        return next(new AppError(e.message, 404, '100'));
    })
});


exports.listostan = catcherro(async (req, res, next) => {

    const id_country = req.body.id_country;

    db.query('SELECT * FROM `province` WHERE id_country=?', [id_country]).then((row, filds) => {

        res.status(200).json({
            msg: '',

            length: row[0].length,
            data: row[0]
        })

    }).catch(function (e) {
        console.log(e.message);
        return next(new AppError(e.message, 404, '100'));
    })
});
exports.listCity = catcherro(async (req, res, next) => {

    const id_ostan = req.body.id_ostan;

    db.query('SELECT * FROM `city` WHERE id_province=?', [id_ostan]).then((row, filds) => {

        res.status(200).json({
            msg: '',

            length: row[0].length,
            data: row[0]
        })

    }).catch(function (e) {
        console.log(e.message);
        return next(new AppError(e.message, 404, '100'));
    })
});




exports.sendSms = catcherro(async (req, res, next) => {

    // const text=req.body.txt;
    // const user='ms_online'
    // const pass='61616262'
    // const tel='50002410655460'
    const mobile = req.body.mobile
    const hash = req.body.hash;
    const code = req.body.code;
    const urlsms = `http://ippanel.com:8080/?apikey=sH-nUB06hE6UAcYAAOC3Qbb2xnY1Asvep2VxF2TiVRA=&pid=kajgpd8wxh2gqqp&fnum=3000505&tnum=${mobile}&p1=code&p2=idcode&v1=${code}&v2=${hash}`;

    request.get({ uri: urlsms }, function (err, httpResponse, body) {
        if (err) {
            next(new AppError(err.message, 404, '101'));
        } else {
            res.status(200).json({
                'length': 1,
                'data': [
                    { statuss: 'sendsms' }
                ]
            })
        }
    });
})

//SELECT * FROM `account_type`
exports.listTypeUser = catcherro(async (req, res, next) => {



    db.query('SELECT * FROM `account_type`').then((row, filds) => {

        res.status(200).json({
            msg: '',

            length: 1,
            data: row[0]
        })

    }).catch(function (e) {
        console.log(e.message);
        return next(new AppError(e.message, 404, '100'));
    })
});


//*================================================= لیست شهرها بر اساس آی استان و جستجوی شهر
exports.ListCity = catcherro(async (req, res, next) => {
    const idProvince = req.body.idProvince;
    const city = req.body.city;
    const page = req.body.page;

    console.log(idProvince);

    db.query(`call listCityApp(?,?,?)`, [page, city, idProvince]).then((row, filds) => {
        console.log(row[0])
        res.status(200).json({
            length: row[0][0].length,
            data: row[0][0]
        })

    }).catch((error) => {
        console.log(query.sql);
        console.log(error.message);
        next(new AppError(error.message, 404, '100'))
    });
})