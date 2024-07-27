const AppError = require('../../../error/error')
const db = require('../../../mysql/configDB').conDB;
const { query } = require('express');

const catcherro = (fn) => {
    return (req, res, next) => { fn(req, res, next).catch((e) => next(new AppError(e.message, 404))) }
}


exports.valuesBalam = catcherro(async (req, res, next) => {

    db.query('SELECT * FROM valuesBalam').then((row, filds) => {

        res.status(200).json({
            msg: '',

            length: row[0].length,
            data: row[0]
        })

    }).catch(e => next(new AppError(e.message, 404, '100')))
});

exports.countListDataAdmin = catcherro(async (req, res, next) => {
    db.query('call countListDataAdmin()').then((row, filds) => {

        res.status(200).json({
            msg: '',

            length: row[0][0].length,
            data: row[0][0]
        })

    }).catch(e => next(new AppError(e.message, 404, '100')))
});



exports.ListParentGroupAdmin = catcherro(async (req, res, next) => {
    const model = req.body.model;

    db.query('call ListParentGroupAdmin(?)', [model]).then((row, filds) => {

        res.status(200).json({
            msg: '',

            length: row[0][0].length,
            data: row[0][0]
        })

    }).catch(e => next(new AppError(e.message, 404, '100')))
});





exports.ListchildGroupAdmin = catcherro(async (req, res, next) => {
    const model = req.body.model;

    db.query('call ListchildGroupAdmin(?)', [model]).then((row, filds) => {

        res.status(200).json({
            msg: '',

            length: row[0][0].length,
            data: row[0][0]
        })

    }).catch(e => next(new AppError(e.message, 404, '100')))
});


exports.updateValueBalamAdmin = catcherro(async (req, res, next) => {
    const id = req.body.id;
    const value = req.body.value;

    db.query('UPDATE valuesBalam SET valuesBalam.value= ? WHERE id = ? ', [value, id]).then((row, filds) => {

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

//====================================================================

exports.updateParentGroupAdmin = catcherro(async (req, res, next) => {
    const id = req.body.id;
    const name = req.body.name;

    db.query('call updateParentGroupAdmin(?,?)', [id, name]).then((row, filds) => {

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


exports.updateChildGroupAdmin = catcherro(async (req, res, next) => {
    const id = req.body.id;
    const name = req.body.name;

    db.query('call updateChildGroupAdmin(?,?)', [id, name]).then((row, filds) => {

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
exports.deleteChildGroupAdmin = catcherro(async (req, res, next) => {
    const id = req.body.id;

    db.query('call deleteChildGroupAdmin(?)', [id]).then((row, filds) => {

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
exports.deleteParentGroupAdmin = catcherro(async (req, res, next) => {
    const id = req.body.id;

    db.query('call deleteGroupAdmin(?)', [id]).then((row, filds) => {

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



exports.getIdAdmin = catcherro(async (req, res, next) => {
    const codemeli = req.body.codemeli;


    db.query('call getIdAdmin(?)', [codemeli]).then((row, filds) => {

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



exports.insertParentGroupAdmin = catcherro(async (req, res, next) => {
    const name = req.body.name;

    db.query('call insertParentGroupAdmin(?)', [name]).then((row, filds) => {

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



exports.insertChildGroupAdmin = catcherro(async (req, res, next) => {
    const idParent = req.body.idParent;
    const name = req.body.name;

    db.query('call insertChildGroupAdmin(?,?)', [idParent, name]).then((row, filds) => {

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





exports.updateAccountStateAdmin = catcherro(async (req, res, next) => {
    const model = req.body.model;

    db.query('call updateAccountStateAdmin(?)', [model]).then((row, filds) => {

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



exports.insertAdmin = catcherro(async (req, res, next) => {
    const codemeli = req.body.codemeli;
    const mobile = req.body.mobile;
    const name = req.body.fname;
    const family = req.body.family;
    const password = req.body.password;
    const date = req.body.date;
    const time = req.body.time;

    console.log(codemeli);

    db.query(`call insertAdmin(?,?,?,?,?,?)`, [name, family, codemeli, mobile, password, date, time]).then((row, filds) => {

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



exports.ListAdmin = catcherro(async (req, res, next) => {
    db.query('call ListAdmin()')
        .then((row, filds) => {

            res.status(200).json({
                msg: '',

                length: row[0].length,
                data: row[0][0]

            })

        }).catch(function (e) {
            console.log(e.message);
            return next(new AppError(e.message, 404, '100'));
        })
});



exports.listPermissions = catcherro(async (req, res, next) => {
    db.query('SELECT * from permissions')
        .then((row, filds) => {

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