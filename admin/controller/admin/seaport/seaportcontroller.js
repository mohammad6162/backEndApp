const AppError = require('../../../../error/error')
const db = require('../../../../mysql/configDB').conDB;
const { query } = require('express');

const catcherro = (fn) => {
    return (req, res, next) => { fn(req, res, next).catch((e) => next(new AppError(e.message, 404))) }
}


exports.listSeaport = catcherro(async (req, res, next) => {

    db.query('SELECT DISTINCT seaport.id, name_seaport,lat,lng,active_seaport,image,city.`name`  AS `nameCity` ,province.`name` AS `nameProvince` FROM seaport,city,province WHERE city.id = seaport.id_city AND city.id_province = province.id').then((row, filds) => {

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

//============================================================


exports.ListSeaPortAdmin = catcherro(async (req, res, next) => {
    const ColumSort = req.body.columSort;
    const TypeSort = req.body.typeSort;
    const search = req.body.search;
    const page = req.body.page;
    const lenght = req.body.lenght;


    db.query('call ListSeaPortAdmin(?,?,?,?,?)', [ColumSort, TypeSort, search, lenght, page])
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




exports.updateStatusSeaportAdmin = catcherro(async (req, res, next) => {
    const id = req.body.id;
    const status = req.body.status;

    db.query('call updateStatusSeaportAdmin(?,?)',
        [id, status]).then((row, filds) => {
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

//===========================================================   insert seaport



exports.insertSeaportAdmin = catcherro(async (req, res, next) => {
    const nameSeaport = req.body.nameSeaport;
    const lat = req.body.lat;
    const lng = req.body.lng;
    const image = req.body.image;
    const idCity = req.body.idCity;

    db.query(`call insertSeaportAdmin(?,?,?,?,?)`,
        [idCity, nameSeaport, lat, lng, image,]).then((row, filds) => {
            res.status(200).json({
                msg: '',

                ength: 1,
                data: [{ 'state': 'ok' }]
            })

        }).catch(function (e) {
            console.log(e.message);
            return next(new AppError(e.message, 404, '100'));
        })
});



exports.ListAllSeaportAdmin = catcherro(async (req, res, next) => {
    const model = req.body.model;

    db.query('call ListAllSeaportAdmin(?)', [model])
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


//https://www.xvideos.com/video30048633/propertysex_-_rich_dude_fucks_hot_home_insurance_agent

//https://www.xvideos.com/video31939753/teens_first_time_squirting_is_on_step-dads_cock

//https://www.xvideos.com/video32481609/cops_or_cock_for_keisha_grey

//https://www.xvideos.com/video42780509/ashly_anderson_in_step_dad_takes_advantage_of_passive_stepdaughter

////https://www.xvideos.com/video38930827/amirah_adara_ass_fucked_by_anissa_kate_s_boyfriend

////https://www.xvideos.com/video28325533/hot_hard_anal_outdoor_threesome_with_2_very_hot_latinas_babes

//https://www.xvideos.com/video32409145/hot_arab_babe_gets_naughty_with_doctor#show-related