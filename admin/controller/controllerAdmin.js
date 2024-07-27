const AppError = require('../../error/error')
const db = require('../../mysql/configDB').conDB;
const jwt = require('jsonwebtoken');
const { query } = require('express');

const catcherro = (fn) => {
    return (req, res, next) => { fn(req, res, next).catch((e) => next(new AppError(e.message, 404))) }
}



exports.loginAdmin = catcherro(async (req, res, next) => {
    const codemeli = req.body.codemeli;
    const password = req.body.password;
    console.log(codemeli, password)
    db.query('call login_Admin(?,?)', [codemeli, password]).then((row, filds) => {

        res.status(200).json({
            msg: '',

            length: row[0].length,
            data: row[0][0]


        })
        console.log(row[0][0]);
    }).catch(function (e) {
        console.log(e.message);
        return next(new AppError(e.message, 404, '100'));
    })
});



// exports.ListAcountState=catcherro(async (req,res,next)=>{


//     db.query('SELECT * FROM  account_state').then((row,filds)=>{

//         res.status(200).json({
//             msg: '',

//             length : row[0].length,
//             data:row[0]
//         })

//     }).catch(function (e) {
//         console.log(e.message);
//             return next(new AppError(e.message, 404, '100'));
//         })
// });


exports.InsertAcountState = catcherro(async (req, res, next) => {
    const name = req.body.name;
    const message = req.body.message;


    db.query('INSERT INTO account_state (id,name,message) VALUES(DEFAULT,?,?)', [name, message]).then((row, filds) => {

        res.status(200).json({
            msg: '',

            length: row[0].length,
            data: [row[0]]
        })

    }).catch(function (e) {
        console.log(e.message);
        return next(new AppError(e.message, 404, '100'));
    })
});


exports.ListAcountState = catcherro(async (req, res, next) => {


    db.query('SELECT * FROM  account_state').then((row, filds) => {

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


exports.listUsers = catcherro(async (req, res, next) => {
    const columOrder = req.body.columOrder;
    const typeOrder = req.body.typeOrder;
    const id_type_user = req.body.id_type_user;
    const page = req.body.page;


    db.query('call listUser(?,?,?,?)', [page, id_type_user, columOrder, typeOrder]).then((row, filds) => {

        res.status(200).json({
            msg: '',

            length: row[0][0].length,
            data: row

        })

    }).catch(function (e) {
        console.log(e.message);
        return next(new AppError(e.message, 404, '100'));
    })
});






exports.set_id_state = catcherro(async (req, res, next) => {
    const idUser = req.body.iduser;
    const idAccountState = req.body.idAccountState

    db.query('UPDATE userInfo set userInfo.id_account_state = ?  WHERE id=?', [idAccountState, idUser]).then((row, filds) => {

        res.status(200).json({
            msg: '',

            length: 1,
            data: [{ 'state': 'ok' }]
        })

    }).catch(function (e) {
        console.log(e.message);
        return next(new AppError(e.message, 404, '100'));
    })
});




exports.rigUser = catcherro(async (req, res, next) => {
    const codemeli = req.body.codemeli;
    const mobile = req.body.mobile;
    const name = req.body.name;
    const family = req.body.family;
    const id_city = req.body.id_city;
    const id_type_user = req.body.id_type_user
    const email = req.body.email;

    console.log(codemeli);

    db.query(`call rigUserAdmin(?,?,?,?,?,?)`, [name, family, codemeli, mobile, id_city, id_type_user]).then((row, filds) => {

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




