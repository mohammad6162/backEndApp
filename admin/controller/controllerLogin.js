const AppError = require('../../error/error')
const db = require('../../mysql/configDB').conDB;
const jwt = require('jsonwebtoken');

const catcherro = (fn) => {
    return (req, res, next) => { fn(req, res, next).catch((e) => next(new AppError(e.message, 404))) }
}



exports.RegisterUser = catcherro(async (req, res, next) => {
    const codemeli = req.body.codemeli;
    const mobile = req.body.mobile;
    const name = req.body.name;
    const family = req.body.family;
    const id_city = req.body.id_city;
    const id_type_user = req.body.id_type_user

    console.log(codemeli);

    db.query(`call rigProduct(?,?,?,?,?,?)`, [name, family, codemeli, mobile, id_city, id_type_user]).then((row, filds) => {

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

exports.LoginUser = catcherro(async (req, res, next) => {
    const codeMeli = req.body.codeMeli;
    const mobile = req.body.mobile;




    db.query(`call login(?,?)`, [codeMeli, mobile]).then((row, filds) => {

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