const AppError = require('../../../../error/error')
const db = require('../../../../mysql/configDB').conDB;
const { query } = require('express');

const catcherro = (fn) => {
    return (req, res, next) => { fn(req, res, next).catch((e) => next(new AppError(e.message, 404))) }
}



exports.insertShipAdmin = catcherro(async (req, res, next) => {
    const name = req.body.name;
    const idProduct = req.body.idProduct;
    const weight = req.body.weight;
    const listWeight = req.body.listWeight;
    const countWeight = req.body.countWeight;
    const idShip = req.body.idShip;


    db.query('call insertShipAdmin(?,?,?,?,?,?)', [name, idProduct, weight, countWeight, listWeight, idShip]).then((row, filds) => {

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



exports.ListShipAdmin = catcherro(async (req, res, next) => {
    const ColumSort = req.body.columSort;
    const TypeSort = req.body.typeSort;
    const search = req.body.search;
    const page = req.body.page;
    const lenght = req.body.lenght;


    db.query('call ListShipAdmin(?,?,?,?,?)', [ColumSort, TypeSort, search, lenght, page])
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
exports.deleteShipAdmin = catcherro(async (req, res, next) => {
    const id = req.body.id;

    db.query('call deleteShipAdmin(?)', [id]).then((row, filds) => {

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




exports.ListWeightShipAdmin = catcherro(async (req, res, next) => {
    const id = req.body.idShip;
    db.query('call ListWeightShipAdmin(?)', [id])
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
exports.deleteWeightShipAdmin = catcherro(async (req, res, next) => {
    const id = req.body.id;
    const countWeight = req.body.countWeight;
    const idShip = req.body.idShip;

    db.query('call deleteWeightShipAdmin(?,?,?)', [id, countWeight, idShip]).then((row, filds) => {

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



exports.insertWeightShipAdmin = catcherro(async (req, res, next) => {
    const idShip = req.body.idShip;
    const weight = req.body.weight;

    db.query('call insertWeightShipAdmin(?,?)', [idShip, weight]).then((row, filds) => {

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


exports.updateStatusShipAdmin = catcherro(async (req, res, next) => {
    const id = req.body.id;
    const status = req.body.status;
    const logDescripton = req.body.logDescripton;
    const idAdmin = req.body.idAdmin;

    db.query('call updateStatusShipAdmin(?,?,?,?)', [id, status, logDescripton, idAdmin]).then((row, filds) => {
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




exports.ListShipUser = catcherro(async (req, res, next) => {
    const model = req.body.model;
    db.query('call List_ShipUser_Admin(?)', [model])
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





//*<<-------------------   دریافت مدل شناور    -------------------->>
exports.getModelShip = catcherro(async (req, res, next) => {
    const idShip = req.body.idShip;


    db.query('call addShipUser_modelShip_app(?)', [idShip]).then((row, filds) => {
        console.log(row[0][0])
        res.status(200).json({
            msg: '',

            length: 1,
            data: row[0][0]
        })

    }).catch((e) => {
        console.log(e)
        next(new AppError(e.message, 404, '100'))
    })
});



//*<<-----------------------  پیش ثبت نام شناور --------------------->>

exports.PSpreRegistertionShip = catcherro(async (req, res, next) => {

    const model = req.body.model;
    console.log(model);
    db.query('call addShipUser_PishRegShip_app(?)', [model]).then((row, filds) => {
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




//*--------------------resive image ship-----------


exports.dlImgDocShip = catcherro(async (req, res, next) => {

    const name = req.query.name
    const options = {
        root: './image/docship'
    };
    res.sendFile(name, options, function (err) {



        if (err) {
            next(new AppError(err.message, 404, '100'))
        }
    })

});


//!<<----------------------- لیست شناورهای کاربر---------------------->>

exports.delShipUser = catcherro(async (req, res, next) => {

    const idUser = req.body.idUser;
    console.log(idUser)

    db.query(`call addShipUser_DelShip_app(?)`, [idUser]
    ).then((row, filds) => {

        res.status(200).json({
            length: row[0][0].length,
            msg: '',
            data: row[0][0]
        })

        // sms.smsNewAds(row[0][0][0].listid.join(),mobile)
    }).catch(function (e) {
        console.log(e);
        return next(new AppError(e.message, 404, '100'));
    })
});
