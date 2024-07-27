const AppError = require('../../../../error/error')
const db = require('../../../../mysql/configDB').conDB;
const { query } = require('express');

const catcherro = (fn) => {
    return (req, res, next) => { fn(req, res, next).catch((e) => next(new AppError(e.message, 404))) }
}



//*================================ لیست سوالات  ==============================*/
exports.ListQuestions = catcherro(async (req, res, next) => {
    const model = req.body.model;


    db.query('call List_Questions_Admin(?)', [model])
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


//*================================ لیست پاسخ ها  ==============================*/
exports.ListSammerySurvey = catcherro(async (req, res, next) => {
    const model = req.body.model;

    db.query('call List_Sammery_Survey_Admin(?)', [model])
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



//*================================ ثبت سوالات ==============================*/
exports.insertQuizAdmin = catcherro(async (req, res, next) => {
    const model = req.body.model;

    db.query('call insert_Quiz_Admin(?)', [model]).then((row, filds) => {

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



//*================================ ویرایش سوالات ==============================*/
exports.updateQuestions = catcherro(async (req, res, next) => {
    const model = req.body.model;

    db.query('call update_Questions_Admin(?)', [model]).then((row, filds) => {

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