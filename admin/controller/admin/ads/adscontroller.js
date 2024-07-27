const AppError = require('../../../../error/error')
const db = require('../../../../mysql/configDB').conDB;
const { query } = require('express');
const upload = require('../../upload');

const catcherro = (fn) => {
    return (req, res, next) => { fn(req, res, next).catch((e) => next(new AppError(e.message, 404))) }
}

exports.ListAdsRentAdmin = catcherro(async (req, res, next) => {
    const model = req.body.model;


    db.query('call List_Ads_Rent_Admin(?)', [model])
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

//&================================ لیست آگهی های سفری ==============================*/

exports.listAdsTrip = catcherro(async (req, res, next) => {
    const model = req.body.model;


    db.query('call ListTripAdsAdmin(?)', [model])
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




exports.ListMyAdsRentAdmin = catcherro(async (req, res, next) => {
    const ColumSort = req.body.columSort;
    const TypeSort = req.body.typeSort;
    const search = req.body.search;
    const page = req.body.page;
    const lenght = req.body.lenght;
    const idAdmin = req.body.idAdmin;


    db.query('call ListMyAdsRentAdmin(?,?,?,?,?,?)', [ColumSort, TypeSort, search, lenght, page, idAdmin])
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






exports.ListPartAdsAdmin = catcherro(async (req, res, next) => {
    const idAds = req.body.idAds;
    const idProduct = req.body.idProduct;



    db.query('call ListPartAdsAdmin(?,?)', [idAds, idProduct])
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


//===============================================================

exports.ListAdsTripMe = catcherro(async (req, res, next) => {


    const idUser = req.body.idUser;



    db.query('SELECT * FROM `summaryTripUser` WHERE idUserRegAds =? ORDER BY id DESC', [idUser]
    ).then((row, filds) => {

        res.status(200).json({
            msg: '',

            length: row[0].length,
            data: row[0]
        })

    }).catch(function (e) {
        console.log(e);
        return next(new AppError(e.message, 404, '100'));
    })
});


exports.ListAdsRentMe = catcherro(async (req, res, next) => {


    const idUser = req.body.idUser;



    db.query('SELECT * FROM `summaryRent` WHERE idUserRegAds =? ORDER BY id DESC', [idUser]
    ).then((row, filds) => {

        res.status(200).json({
            msg: '',

            length: row[0].length,
            data: row[0]
        })

    }).catch(function (e) {
        console.log(e);
        return next(new AppError(e.message, 404, '100'));
    })
});


exports.GetAllDataAdsTrip = catcherro(async (req, res, next) => {


    const idListAds = req.body.idListAds;



    db.query('call getDataAdsTrip(?)', [idListAds]
    ).then((row, filds) => {

        res.status(200).json({
            msg: '',

            length: row[0][0].length,
            data: row[0][0]
        })

    }).catch(function (e) {
        console.log(e);
        return next(new AppError(e.message, 404, '100'));
    })
});



exports.addNewTrip = catcherro(async (req, res, next) => {

    const TableListAds = req.body.TableListAds;
    const TableAdsTrp = req.body.TableAdsTrp;
    const mobile = req.body.mobile;

    db.query('call saveTripClient(?,?)', [TableListAds, TableAdsTrp]).then((row, filds, query1) => {

        console.log(row[0][0][0]);
        res.status(200).json({
            length: row[0].length,
            data: row[0][0][0]['listIdAds']
        })
        //  sms.smsNewAds(row[0][0][0]['listIdAds'],mobile)

    }

    ).catch((error) => {
        console.log(query.sql);
        console.log(error.message);
        next(new AppError(error.message, 404, '100'))
    });

});




//!  ----------------ثبت آگهی جدید سفری--------------------

exports.saveTrip = catcherro(async (req, res, next) => {

    upload.imageAds(req, res, function (err) {
        const model = req.body.model;
        if (err) {
            console.log(err);
            return next(new AppError('not Upload', 404, '100'));
        } else {

            db.query(`call saveTrip(?)`, [model]
            ).then((row, filds) => {

                // res.status(200).json({
                //     msg: '',
                //     length : 1,
                //     data: row[0][0][0].listid
                // })
                // console.log(row[0][0][0])

                if (row[0][0][0].err) {
                    return next(new AppError('not Upload', 500, '100'));
                }
                else {
                    res.status(200).json({
                        msg: '',
                        length: 1,
                        data: row[0][0][0].listid
                    });
                }
                // sms.smsNewAds(row[0][0][0].listid.join(),mobile)
            }).catch(function (e) {
                console.log(e);
                return next(new AppError(e.message, 404, '100'));
            })
        }
    })

});


//*<<--------------------list cityPort----------------------

exports.ListCityPort = catcherro(async (req, res, next) => {

    const name = req.body.name;

    db.query('call listSeaPort(?)'
        , [name]).then((row, filds) => {

            res.status(200).json({
                msg: '',

                length: row[0].length,
                data: row[0][0]
            })

        }).catch(function (e) {
            console.log(e);
            return next(new AppError(e.message, 404, '100'));
        })
});



exports.listFlagcontry = catcherro(async (req, res, next) => {

    db.query('SELECT * FROM `country`').then((row, filds) => {

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


exports.Rules = catcherro(async (req, res, next) => {
    const stateRules = req.body.stateRules;

    db.query('SELECT rules FROM `rules` WHERE stateRules= ?', [stateRules]).then((row, filds) => {

        res.status(200).json({
            msg: '',

            length: row[0].length,
            data: row[0]
        })

    }).catch(e => next(new AppError(e.message, 404, '100')))
});



exports.getDetailAdsRent = catcherro(async (req, res, next) => {
    const adsIdMid = req.body.adsIdMid;


    db.query('call getDetailAdsRentAdmin(?)', [adsIdMid])
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




//*  ----------------ثبت آگهی جدید چارتری--------------------

exports.SaveRent = catcherro(async (req, res, next) => {
    const objectRent = req.body.objectRent;
    const mobile = req.body.mobile;

    console.log(JSON.parse(objectRent))
    console.log(objectRent)

    db.query('call InsertRentNewExpectationClient(?)', [objectRent]).then((row, filds) => {
        res.status(200).json({
            length: 1,
            data: [{ 'code': row[0][0][0].Lastid }]
        })

        //   sms.smsEditAds( JSON.parse(objectRent).idadsMid,mobile)

    }).catch((error) => {
        next(new AppError(error.message, 404, '100'))
    });
});


//* ------------------------ ویرایش آگهی چاتری---------
exports.EditRent = catcherro(async (req, res, next) => {
    const objectRent = req.body.objectRent;
    console.log(JSON.parse(objectRent));
    db.query('call EditRentClient(?)', [objectRent]).then((row) => {


        if (!row[0][0][0].err) {
            res.status(401);
        }
        else {
            console.log([row[0][0][0].res])
            res.status(200).json({
                length: 1,
                data: [row[0][0][0].res]
            })
        }
    }
    ).catch((error) => {
        console.log(error)
        next(new AppError(error, 404, '100'))
    });

});

//*--------------------لیست محبوبترین  اسکله های مقصد ----------------------
exports.ListPoplurSeaPort = catcherro(async (req, res, next) => {


    db.query('call listPoplurSeaPort()'
    ).then((row, filds) => {

        res.status(200).json({
            msg: '',

            length: row[0].length,
            data: row[0][0]
        })

    }).catch(function (e) {
        console.log(e);
        return next(new AppError(e.message, 404, '100'));
    })
});


//*------------------------ درج شی چاتر در سرور - جدول موقت چاتر--------
exports.saveRentNew = catcherro(async (req, res, next) => {

    const objectRent = req.body.objectRent;

    const mobile = req.body.mobile;

    console.clear()
    // console.log(objectRent);

    db.query('call InsertRentNewExpectationClient(?)', [objectRent]).then((row, filds) => {

        res.status(200).json({
            length: 1,
            data: [{ 'code': row[0][0][0].Lastid }]
        })
        //   sms.smsEditAds( JSON.parse(objectRent).idadsMid,mobile)

    }
    ).catch((error) => {
        console.log(query.sql);
        console.log(error.message);
        next(new AppError(error.message, 404, '100'))
    });
});



//*  ----------------  دریافت شی چارتی برای ویرایش --------------------
exports.getObjRent = catcherro(async (req, res, next) => {
    const idMid = req.body.idAdsMid;

    db.query('CALL getobjRent(?)', [idMid]).then((row, filds) => {
        res.status(200).json({
            length: 1,
            data: row[0][0]
        })
        //   sms.smsEditAds( JSON.parse(objectRent).idadsMid,mobile)

    }).catch((error) => {
        next(new AppError(error.message, 404, '100'))
    });
})






//*--------- برای گزینه ویرایش- ثبت شی چاتر در جدول چاتر موقت -----------
exports.saveRentEdit = catcherro(async (req, res, next) => {
    const objectRent = req.body.objectRent;

    const mobile = req.body.mobile;

    console.log(objectRent);

    db.query('call EditRentClient(?)', [objectRent]).then((row) => {

        console.log(row[0][0]);
        res.status(200).json({
            length: row[0].length,
            data: []
        })
        //   sms.smsEditAds( JSON.parse(objectRent).idadsMid,mobile)

    }).catch((error) => {
        console.log(query.sql);
        console.log(error.message);
        next(new AppError(error.message, 404, '100'))
    });
});


//* =============================== ویرایش آگهی سفری  ============
exports.EditTrip = catcherro(async (req, res, next) => {

    upload.imageAds(req, res, function (err) {
        const model = req.body.model;

        if (err) {
            console.log(err);
            return next(new AppError('not Upload', 404, '100'));
        }
        else {
            db.query(`call EditTrip(?)`, [model]
            ).then((row, filds) => {


                res.status(200).json({
                    msg: '',
                    length: 1,
                    data: [1]
                })
                // sms.smsNewAds(row[0][0][0].listid.join(),mobile)
            }).catch(function (e) {
                console.log(e);
                return next(new AppError(e.message, 404, '100'));
            })
        }
    })
});



//*<<-------------------- لیست آگهی های سفری از نوع اسمال------------>>
exports.listSmallAdsTrip = catcherro(async (req, res, next) => {
    const model = req.body.model;
    console.log(model)
    db.query('call listSmallAdsTripForShip(?)', [model]).then((row, filds) => {
        console.log(row[0][0])
        res.status(200).json({
            msg: '',

            length: row[0].length,
            data: row[0][0]
        })

    }).catch((e) => {
        console.log(e)
        next(new AppError(e.message, 404, '100'))
    })
});



//*<<------------------- نمایش آگهی سفری  برای شناور -------------------->>

exports.showAdsTripForShipper = catcherro(async (req, res, next) => {
    const model = req.body.idAdsMid;
    console.log(model)
    db.query('call PS_ShowAdsTrip_app(?)', [model]).then((row, filds) => {

        res.status(200).json({
            msg: '',

            length: row[0].length,
            data: row[0][0]
        })

    }).catch((e) => {
        console.log(e);
        next(new AppError(e.message, 404, '100'))
    })
});



//*<<-------------------  لیست آماری برای تابلوی پیشنهادات  -------------------->>

exports.reporttStatistecsAdsProposal = catcherro(async (req, res, next) => {
    const idAdsMid = req.body.idAdsMid;

    db.query('call gn_reportStatistecsAdsProposal_app(?)', [idAdsMid]).then((row, filds) => {
        console.log(row[0][0])
        res.status(200).json({
            msg: '',

            length: row[0].length,
            data: row[0][0]
        })

    }).catch((e) => {
        console.log(e)
        next(new AppError(e.message, 404, '100'))
    })
});



//*<<-------------------   ثبت پیشنهاد سفری  -------------------->>
exports.addProposal = catcherro(async (req, res, next) => {
    const model = req.body.model;


    db.query('call Ps_addProposal_app(?)', [model]).then((row, filds) => {
        console.log(row[0][0])
        res.status(200).json({
            msg: '',

            length: row[0].length,
            data: row[0][0]
        })

    }).catch((e) => {
        console.log(e)
        next(new AppError(e.message, 404, '100'))
    })
});



//*<<-------------------- لیست آگهی های چاتری از نوع اسمال------------>>
exports.listSmallAdsRent = catcherro(async (req, res, next) => {
    const model = req.body.model;
    console.log(model)
    db.query('call ps_ListAdsRent_app(?)', [model]).then((row, filds) => {
        console.log(row[0][0])
        res.status(200).json({
            msg: '',

            length: row[0].length,
            data: row[0][0]
        })

    }).catch((e) => {
        console.log(e)
        next(new AppError(e.message, 404, '100'))
    })
});



//*<<------------------- نمایش آگهی چاتری  برای شناور -------------------->>

exports.showAdsRentForShipper = catcherro(async (req, res, next) => {
    const model = req.body.idAdsMid;
    console.log(model)
    db.query('call PS_ShowAdsRentForShipper_app(?)', [model]).then((row, filds) => {
        console.log(row[0][0])
        res.status(200).json({
            msg: '',

            length: row[0].length,
            data: row[0][0]
        })

    }).catch((e) => {
        console.log(e)
        next(new AppError(e.message, 404, '100'))
    })
});



//*<<------------ لیست پیشنهادات کاربر ------------------->>
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


//*<<-------------------  لیست برای تابلوی پیشنهادات  -------------------->>

exports.panelListProposal = catcherro(async (req, res, next) => {
    const model = req.body.model;


    db.query('call gn_listProposal_app(?)', [model]).then((row, filds) => {
        console.log(row[0][0])
        res.status(200).json({
            msg: '',

            length: row[0].length,
            data: row[0][0]
        })

    }).catch((e) => {
        console.log(e)
        next(new AppError(e.message, 404, '100'))
    })
});


exports.updateAdsTripStatusAdmin = catcherro(async (req, res, next) => {
    const status = req.body.status0;
    const idAds = req.body.idAds
    const idAdmin = req.body.idAdmin

    db.query('call update_AdsTripStatus_Admin(?,?,?)', [status, idAdmin, idAds]).then((row, filds) => {

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



//*================================ ویرایش وضعیت اگهی چاتری ==============================*/
exports.updateAdsRentStatusAdmin = catcherro(async (req, res, next) => {
    const status = req.body.status0;
    const idAds = req.body.idAds
    const idAdmin = req.body.idAdmin

    db.query('call update_AdsRent_Status_Admin(?,?,?)', [status, idAdmin, idAds]).then((row, filds) => {

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