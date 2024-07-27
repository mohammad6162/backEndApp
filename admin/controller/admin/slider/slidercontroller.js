const AppError = require('../../../../error/error')
const db = require('../../../../mysql/configDB').conDB;
const { query } = require('express');
const upload = require('../../upload');

const catcherro = (fn) => {
    return (req, res, next) => { fn(req, res, next).catch((e) => next(new AppError(e.message, 404))) }
}



//*---------=======----------- recive image slider ------====-----
exports.sendSliderImage = catcherro(async (req, res, next) => {

    const name = req.query.name
    const options =
    {
        root: './image/slider'
    };
    res.sendFile(name, options, function (err) {
        if (err) {
            next(new AppError(err.message, 404, '100'))
        }
    })
});



//*  ---------------- ثبت عکس اسلایدر --------------------
exports.insertSlider = catcherro(async (req, res, next) => {
    upload.imageSlider(req, res, function (err) {
        const model = req.body.model;

        if (err) {
            console.log(err);
            return next(new AppError('not Upload', 404, '100'));
        }
        else {
            db.query(`call insert_Slider_Admin(?)`, [model]
            ).then((row, filds) => {
                res.status(200).json({
                    msg: '',
                    length: 1,
                    // data: row[0][0][0].listid
                    data: [{ 'state': 'ok' }]
                });

            }).catch(function (e) {
                console.log(e);
                return next(new AppError(e.message, 404, '100'));
            })
        }
    })

});



//*================================ لیست قرارداد ها ==============================*/
exports.listSlider = catcherro(async (req, res, next) => {
    const model = req.body.model;


    db.query('call List_Slider_Admin(?)', [model])
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
exports.deleteSlider = catcherro(async (req, res, next) => {
    const id = req.body.id;
    const idAdmin = req.body.idAdmin;


    db.query('call delete_Slider_Admin(?,?)', [id, idAdmin]).then((row, filds) => {

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


//*================================ ویرایش  ==============================*/
exports.updateSlider = catcherro(async (req, res, next) => {
    const model = req.body.model;


    db.query('call updateSliderAdmin(?)', [model]).then((row, filds) => {

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
