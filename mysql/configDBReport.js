const mysql = require('mysql2');



const db = mysql.createPool({
    database: process.env.DBNAMERep,
    password: process.env.DBPASS,
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    port: process.env.DBPORT

});


db.addListener('error', function () { console.log('ERROR') });

exports.conDB = db.promise();


//========================== report Tiket =====================//

const dbTiket = mysql.createPool({
    database: process.env.DBNAMERep,
    password: process.env.DBPASS,
    user: process.env.DBUSER,
    host: process.env.DBHOST

});


dbTiket.addListener('error', function () { console.log('ERROR') });

exports.conDBRep = dbTiket.promise();
