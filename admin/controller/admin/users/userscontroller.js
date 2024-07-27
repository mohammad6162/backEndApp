const AppError = require('../../../../error/error')
const db = require('../../../../mysql/configDB').conDB;
const { query } = require('express');

const catcherro = (fn) => {
    return (req, res, next) => { fn(req, res, next).catch((e) => next(new AppError(e.message, 404))) }
}


exports.listUsers = catcherro(async (req, res, next) => {
    const model = req.body.model;



    db.query('call listUsers(?)', [model]).then((row, filds) => {

        res.status(200).json({
            msg: '',

            length: row[0][0].length,
            data: row[0][0]

        })

        console.log(row[0][0])

    }).catch(function (e) {
        console.log(e.message);
        return next(new AppError(e.message, 404, '100'));
    })
});



//*================================  پروفایل کاربر ==============================*/
exports.userProfile = catcherro(async (req, res, next) => {
    const id = req.body.id;


    db.query('call getProfile_user_byId_admin(?)', [id])
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



//=============================================  group


exports.listParentGroup = catcherro(async (req, res, next) => {

    db.query('SELECT * from parent_group').then((row, filds) => {

        res.status(200).json({
            msg: 'ok',

            length: row[0].length,
            data: row[0]
        })

    }).catch(function (e) {
        console.log(e.message);
        return next(new AppError(e.message, 404, '100'));
    })
});


//============================================= child parent group


exports.listChildGroup = catcherro(async (req, res, next) => {

    const idParent = req.body.idParent;
    db.query('SELECT DISTINCT child_group.id , child_group.nameChild,child_group.idParent FROM child_group, parent_group WHERE parent_group.id = child_group.idParent AND  child_group.idParent = ?',
        [idParent]).then((row, filds) => {

            res.status(200).json({
                msg: 'ok',

                length: row[0].length,
                data: row[0]
            })

        }).catch(function (e) {
            console.log(e.message);
            return next(new AppError(e.message, 404, '100'));
        })
});



exports.listUsersPopUpAdmin = catcherro(async (req, res, next) => {

    const search = req.body.search;
    db.query('call ListUsers_popUp_Admin(?)', [search]).then((row, filds) => {

        res.status(200).json({
            msg: 'ok',

            length: row[0][0].length,
            data: row[0][0]
        })

    }).catch(function (e) {
        console.log(e.message);
        return next(new AppError(e.message, 404, '100'));
    })
});



exports.setGroupUsers = catcherro(async (req, res, next) => {
    const listUser = req.body.listUser;
    const value0 = req.body.value0;

    db.query('call setGroupUsers(?,?)', [listUser, value0]).then((row, filds) => {

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



//=======================================================  update user

exports.updateUserAdmin = catcherro(async (req, res, next) => {
    const codemeli = req.body.codemeli;
    const mobile = req.body.mobile;
    const name = req.body.name;
    const family = req.body.family;
    const id_city = req.body.id_city;
    const idTypeUser = req.body.id_type_user
    const email = req.body.email;
    const id = req.body.id;
    const idParent = req.body.idParent;

    db.query('call updateUserAdmin(?,?,?,?,?,?,?,?,?)',
        [name, family, codemeli, mobile, email, id_city, idParent, idTypeUser, id]).then((row, filds) => {
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


