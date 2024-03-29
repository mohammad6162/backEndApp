const AppError = require('../error/error')
const db = require('../mysql/configDB').conDB;
const express = require('express');
const uploadBalams = require('./upload')
const jwt = require('jsonwebtoken');
const app = require('../app');
var each = require('foreach');
const request = require('request');
const { map } = require('../app');
const sms = require('./sms');

const { query } = require('express');


const fs = require('fs');
const { Console } = require('console');

const catcherro = (fn) => {
    return (req, res, next) => { fn(req, res, next).catch((e) => next(new AppError(e.message, 404))) }
}



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

// exports.ver=catcherro(async (req,res,next)=>{

//         db.query('SELECT * FROM valuesBalam WHERE id=1').then((row,filds)=>{

//             res.status(200).json({
//                 msg: '',

//                 length : row[0].length,
//                 data:row[0]
//             })

//         }).catch(e=>next(new AppError(e.message,404,'100')))
// });

// exports.listcity=catcherro(async (req,res,next)=>{
//     const page=req.body.page;
//     const name=req.body.name;

//     db.query('call listCityApp(?,?)',[page,name]).then((row,filds)=>{

//         res.status(200).json({
//             msg: '',

//             length : row[0][0].length,
//             data:row[0][0]
//         })

//     }).catch(function (e) {
//         console.log(e.message);
//             return next(new AppError(e.message, 404, '100'));
//         })
// });

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

exports.listFlagcontry = catcherro(async (req, res, next) => {

    const page = req.body.page;
    const countri = req.body.countri;


    db.query('call listCountriesApp(?)', [countri]).then((row, filds) => {

        console.log(row[0][0])
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



exports.IdentityMobile = catcherro(async (req, res, next) => {

    const mobile = req.body.mobile;
    const codeMeli = req.body.codeMeli;
    const otpCode = req.body.otpCode;
    const hashcode = req.body.hashcode;


    // sms.Otp(otpCode,mobile,hashcode);
    res.status(200).json({
        msg: '',

        length: 1,
        data: [true]
    });

    // db.query('call listCountriesApp(?,?)',[countri,page]).then((row, filds) => {

    //     res.status(200).json({
    //         msg: '',

    //         length: row[0][0].length,
    //         data: row[0][0]
    //     })

    // }).catch(function (e) {
    //     console.log(e.message);
    //     return next(new AppError(e.message, 404, '100'));
    // })
});


exports.InfoRouteBetweenSeaport = catcherro(async (req, res, next) => {

    const seaportA = req.body.seaportA;
    const seaportB = req.body.seaportB;



    db.query(`SELECT * FROM  routes_Info  WHERE (routes_Info.IdseaportEnd = ? And routes_Info.IdseaportFirst = ?) OR (routes_Info.IdseaportFirst = ? And routes_Info.IdseaportEnd = ?) `, [seaportA, seaportB, seaportA, seaportB]).then((row, filds) => {

        res.status(200).json({
            msg: '',

            length: row[0].length,
            data: row[0]
        })

    }).catch(e => next(new AppError(e.message, 404, '100')))
});


//!---------------- دریافت لیست تما اسکله ها با تعداد اسکله واقع در آن کشور------->>
exports.ListCityPort = catcherro(async (req, res, next) => {

    const name = req.body.name;




    db.query('call listSeaPort(?)'
        , [name]).then((row, filds) => {

            console.log(JSON.stringify(row[0][0]));

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


//--------------------لیست محبوبترین  اسکله های مقصد ----------------------
exports.ListPoplurSeaPort = catcherro(async (req, res, next) => {






    db.query('call listPoplurSeaPort()'
    ).then((row, filds) => {
        console.log(JSON.stringify(row[0][0]));
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

//--------------------لیست آگهی های سفری من --------------------
exports.ListAdsTripMe = catcherro(async (req, res, next) => {


    const idUser = req.body.idUser;



    db.query('call modelSummaryTripClient(?)', [idUser]
    ).then((row, filds) => {

        res.status(200).json({
            msg: '',

            length: row[0][0].length,
            data: row[0][0]
        })


        console.log(row[0][0])
    }).catch(function (e) {
        console.log(e);
        return next(new AppError(e.message, 404, '100'));
    })
});
//----------------------لیست آگهی های چاتر من ----------------

exports.ListAdsRentMe = catcherro(async (req, res, next) => {


    const idUser = req.body.idUser;



    db.query('call modelSummaryRentClient(?)', [idUser]
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

//----------------------لیست پیشنهادات سفری برای کاربر   ----------------

exports.ListProposalTrip = catcherro(async (req, res, next) => {


    const idAdsMid = req.body.idAdsMid;



    db.query('call listProposalTrip(?)', [idAdsMid]
    ).then((row, filds) => {


        console.log(row[0])
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



//*---------------------- ثبت برندگان مناقصه  ----------------
exports.rigWinner = catcherro(async (req, res, next) => {


    const model = req.body.model;



    db.query('call setWinnerCloseTender(?)', [model]
    ).then((row, filds) => {


        console.log(row[0][0][0])
        res.status(200).json({
            msg: '',

            length: row[0][0].length,
            data: row[0][0]
        })

        each(row[0][0][0].res, function (value, index, array) {
            // if(value.number==1){
            //     sms.winnerOne(value.idAdsMid,value.tel)
            // }else{
            //     sms.winnerTwo(value.idAdsMid,value.tel)
            // }
            console.log(value);
        })


    }).catch(function (e) {
        console.log(e);
        return next(new AppError(e.message, 404, '100'));
    })
});










//----------------------نمایش نظرات دیگران در مورد یک کاربر  ----------------

exports.ResponseSurvayUser = catcherro(async (req, res, next) => {


    const idUser = req.body.idUser;



    db.query('call showSurvayUsera(?)', [idUser]
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

//---------------------- نمایش اطلاعات فنی شناور کاربر----------------
exports.infoShipUser = catcherro(async (req, res, next) => {


    const idShipUser = req.body.idShipUser;



    db.query('call infoShipUser(?)', [idShipUser]
    ).then((row, filds) => {

        res.status(200).json({
            msg: '',

            length: row[0][0].length,
            data: row[0][0]
        })
        console.log(row[0][0])
    }).catch(function (e) {
        console.log(e);
        return next(new AppError(e.message, 404, '100'));
    })
});














//---------------------نمایش تمام آگهی های سفری --------------
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



//-------------------- حذف آگهی سفری----------------


exports.DelAdsTrip = catcherro(async (req, res, next) => {


    const idListAds = req.body.idListAds;



    db.query('call delAdsTripApp(?)', [idListAds]
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


//----------------------  دریافت یک شی از آگهی سفری---------


exports.ReciveDataOneAdsTrip = catcherro(async (req, res, next) => {


    const idadsMid = req.body.idadsMid;



    db.query(`call objectAdsTripExpectation(?)`, [idadsMid]
    ).then((row, filds) => {


        res.status(200).json({
            msg: '',

            length: row[0][0].length,
            data: [row[0][0][0]]
        })

    }).catch(function (e) {
        console.log(e);
        return next(new AppError(e.message, 404, '100'));
    })
});





//------------------ برای ویرایش سفری -درج در جدول ادیت سفری ----------------


//-----------------------ثبت آگهی جدید سفری -----------
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




}
)




//----------------------- برای گزینه ویرایش- ثبت شی چاتر در جدول چاتر موقت -----------
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






    }

    ).catch((error) => {
        console.log(query.sql);
        console.log(error.message);
        next(new AppError(error.message, 404, '100'))
    });




}
)

//*---- لیست شهرها بر اساس آی استان و جستجوی شهر
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


        //   sms.smsEditAds( JSON.parse(objectRent).idadsMid,mobile)






    }

    ).catch((error) => {
        console.log(query.sql);
        console.log(error.message);
        next(new AppError(error.message, 404, '100'))
    });




}
)


//*------------------------ درج شی چاتر در سرور - جدول موقت چاتر--------


//*------------------------ حذف آگهی -------

exports.DelAdsTripRent = catcherro(async (req, res, next) => {

    //* به شرط اینکه کسی قیمت نداده باشد

    const idadsMid = req.body.idAdsMid;

    const mobile = req.body.mobile;




    db.query('call delAds(?)', [idadsMid]).then((row, filds) => {

        console.log(row[0][0][0]);


        if (row[0][0][0].res == 1) {
            res.status(404).json({
                length: 1,
                data: [{ error: 'errorMysql' }]
            })
        } else {
            res.status(200).json({
                length: 1,
                data: row[0][0]
            })
        }



        //   sms.smsEditAds( JSON.parse(objectRent).idadsMid,mobile)






    }

    ).catch((error) => {
        console.log(query.sql);
        console.log(error.message);
        next(new AppError(error.message, 404, '100'))
    });




}
)

//*------------------------  بستن مناقصه چاتر بدون پیشنهاد -------

exports.CloseTenderRentNoProposal = catcherro(async (req, res, next) => {

    //* به شرط اینکه کسی قیمت نداده باشد

    const idadsMid = req.body.idadsMid;

    const mobile = req.body.mobile;




    db.query('call closeTenderNoProposalRent(?)', [idadsMid]).then((row, filds) => {


        res.status(200).json({
            length: 1,
            data: []
        })


        //   sms.smsEditAds( JSON.parse(objectRent).idadsMid,mobile)






    }

    ).catch((error) => {
        console.log(query.sql);
        console.log(error.message);
        next(new AppError(error.message, 404, '100'))
    });




}
)



//*------------------------  ارسال تصویر کارت ملی و تعهد نامه     -------

exports.SendNational = catcherro(async (req, res, next) => {





    const model = req.body.model;
    const modeljosn = JSON.parse(model);
    console.log(model);


    db.query('call insertIdentity(?)', [model]).then((row, filds) => {

        console.log(row[0][0][0].err)

        if (1 + 1 == 1) {
            res.status(200).json({
                length: 1,
                data: []
            })
        } else {
            if (modeljosn.national.length > 0) {
                fs.unlink(`./image/image/${modeljosn.national}`, (err) => {
                    if (err) console.log(err);
                })
            }
            if (modeljosn.agreement.length > 0) {
                fs.unlink(`./image/image/${modeljosn.agreement}`, (err) => {
                    if (err) console.log(err);
                })
            }

            res.status(404).json({
                length: 0,
                data: []
            });
        }




        //   sms.smsEditAds( JSON.parse(objectRent).idadsMid,mobile)






    }

    ).catch((error) => {
        console.log(query.sql);
        console.log(error.message);
        next(new AppError(error.message, 404, '100'))
    });




}
)


//*------------------------    چک کردن وضعیت فایل کارت ملی و تصویر تعهد هر شخص -------

exports.checkDocPerson = catcherro(async (req, res, next) => {



    const idUser = req.body.idUser;





    db.query('call checkIdentityDocPerson(?)', [idUser]).then((row, filds) => {

        console.log(row[0][0])
        res.status(200).json({
            length: 1,
            data: row[0][0]
        })


        //   sms.smsEditAds( JSON.parse(objectRent).idadsMid,mobile)






    }

    ).catch((error) => {
        console.log(query.sql);
        console.log(error.message);
        next(new AppError(error.message, 404, '100'))
    });




}
)


//*------------------------  بستن مناقصه سفری بدون پیشنهاد -------

exports.CloseTenderTripNoProposal = catcherro(async (req, res, next) => {

    //* به شرط اینکه کسی قیمت نداده باشد

    const idadsMid = req.body.idadsMid;

    const mobile = req.body.mobile;


    console.log(idadsMid)
    db.query('call closeTenderNoProposalTrip(?)', [idadsMid]).then((row, filds) => {


        res.status(200).json({
            length: 1,
            data: []
        })


        //   sms.smsEditAds( JSON.parse(objectRent).idadsMid,mobile)






    }

    ).catch((error) => {
        console.log(query.sql);
        console.log(error.message);
        next(new AppError(error.message, 404, '100'))
    });




}
)




//*-----------------------   لیست پیشنهادات بعد از بسته شدن آگهی   -----------
exports.listProposalJustShow = catcherro(async (req, res, next) => {

    const idAdsMid = req.body.idAdsMid;

    db.query('call listProposalJustShow(?)', [idAdsMid]).then((row) => {


        res.status(200).json({
            length: row[0].length,
            data: row[0][0]
        })



    }

    ).catch((error) => {
        console.log(query.sql);
        console.log(error.message);
        next(new AppError(error.message, 404, '100'))
    });




}
)

//*----------------- لغو آگهی----------------


exports.cancelAds = catcherro(async (req, res1, next) => {

    const model = req.body.model;
    const modelTojs = JSON.parse(model);

    db.query('call cancelAds(?)', [model]).then((row) => {

        res0 = row[0][0][0];
        console.log(res0);
        // {
        //     err: 0,
        //     UserBloc: [ { tel: '09172121917', name: 'حسن عباسی' } ],
        //     userWin: [ '2147483647', '09172121917' ]
        //   }


        if (res0.err == 0) {
            res1.status(200).json({
                length: row[0].length,
                data: row[0][0]
            })

            each(res0.UserBloc, function (value, index, array) {

                sms.blockUserFromOverFlowCancelAds(res0.UserBloc[0].name, res0.UserBloc[0].tel)
            })

            each(res0.userWin, function (value, index, array) {

                sms.AdsCancelUserWinner(modelTojs.idAdsMid, res0.userWin[index])
            })
        }



    }

    ).catch((error) => {
        console.log(query.sql);
        console.log(error.message);
        next(new AppError(error.message, 404, '100'))
    });




}
)
//*--------------------Send new Auth Model-----------


exports.sendNewAuthModel = catcherro(async (req, res, next) => {

    const model = req.body.model;
    const modelJson = JSON.parse(model);
    console.log(model);

    db.query('call addNewModelAuthUserApp(?)', [model]).then((row) => {



        console.log(row[0][0][0]);

        if (row[0][0][0].err == 0) {
            res.status(200).json({
                length: row[0][0].length,
                data: row[0][0]
            })
        } else if (row[0][0][0].err == 1) {
            fs.unlink(`./image/image/${modelJson.pathNational}`, (err) => {
                if (err) console.log(err);
            })
            fs.unlink(`./image/image/${modelJson.pathAgreement}`, (err) => {
                if (err) console.log(err);
            })
            res.status(500).json({});
        } else {
            res.status(200).json({
                length: row[0][0].length,
                data: row[0][0]
            })
        }





    }

    ).catch((error) => {
        console.log(query.sql);
        console.log(error.message);
        next(new AppError(error.message, 404, '100'))
    });


});












//*--------------------resive image ads-----------


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
//!--------------------resive image ads-----------


exports.dlImgAds = catcherro(async (req, res, next) => {

    const name = req.query.name
    const options = {
        root: './image/imageAds'
    };
    res.sendFile(name, options, function (err) {



        if (err) {
            next(new AppError(err.message, 404, '100'))
        }
    })

});





//!<<--------------------  ورود و عضویت   -------------->>


exports.login = catcherro(async (req, res, next) => {

    const mobile = req.body.mobile
    const codeMeli = req.body.codeMeli

    console.log(req.body);

    db.query(`call gn_login_app(?,?)`, [mobile, codeMeli]).then((row, filds) => {

        console.log(row[0][0]);
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



//!<<--------------------  ثبت نام کاربر  -------------->>


exports.regUser = catcherro(async (req, res, next) => {

    const model = req.body.model


    console.log(req.body.model);

    db.query(`call gn_regUser_app(?)`, [model]).then((row, filds) => {

        console.log(row[0][0]);

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



//!<<--------------------  ثبت شکایت   -------------->>

exports.sendWarnign = catcherro(async (req, res, next) => {

    const model = req.body.model


    console.log(req.body.model);

    db.query(`call gn_regWarnign_app(?)`, [model]).then((row, filds) => {

        console.log(row[0][0]);

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

//=============================== test functions=============

exports.test = catcherro(async (req, res, next) => {


    console.log(JSON.stringify(req.headers))




    next()



}





);
















/////////////////

class smsSetWin {
    constructor(tel, number, idAdsMin) {
        this.tel = tel;
        this.number = number;
        this.idAdsMid = idAdsMid;
    }


}
