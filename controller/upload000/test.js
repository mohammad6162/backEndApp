const request = require('request');
           
    console.log( new smsSetWin(12,34,12))
     request.post(
   {

    url:'https://api.sms-webservice.com/api/V3/SendTokenSingle',
    body : {
        "ApiKey": '425-b39fa30588d44947ba8dsssdfsdferwerd',
        "TemplateKey": 'forgetPass',
        "Destination": 9172121917,
        "p1": "2321"
        
      },
      
    json: true,
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {
        
        console.log(response.body);
        res.status(200).json({success:true});
    } else {
console.log("whatever you want");
next(new AppError(error.message, 404, '100'))
    
    }

    



})




// --------------- پاسخ سرور

// {
//     Success: true,
//     ErrorCode: null,
//     Error: null,
//     Result: [
//       {
//         UserTraceId: null,
//         Id: 14195063000,
//         Sender: 2930002190,
//         FinalText: 'رمز عبور شما برای ورورد به اتوماسیون دفاتر پیشخوان برابر با  2321  می باشد'
//       }
//     ]
//   }
// GET /value/test 200 3888.916 ms - 16