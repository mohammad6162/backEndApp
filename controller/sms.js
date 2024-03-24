const request = require('request');


exports. smsNewAds=(code,tel) => {request.post({
    url: 'http://ippanel.com/api/select',
    body: {
"op":"pattern",
"user":"09172121917",
"pass":"kWyE7@Xhnq",
"fromNum":"3000505",
"toNum":tel,
"patternCode":"5xkx0csjkayb1oo",
"inputData":[
    {"code":code},
    
]
},
    json: true,
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {

        console.log(response.body);
    } else {
console.log("whatever you want");
    
    }
});}


exports.smsEditAds=(code,tel) => {request.post({
    url: 'http://ippanel.com/api/select',
    body: {
"op":"pattern",
"user":"09172121917",
"pass":"kWyE7@Xhnq",
"fromNum":"3000505",
"toNum":tel,
"patternCode":"f3e5rq3nxg9dmn0",
"inputData":[
    {"code":code},
    
]
},
    json: true,
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {

        console.log(response.body);
    } else {
console.log("whatever you want");
    
    }
});}


exports.statetender=(code,tel) => {request.post({
    url: 'http://ippanel.com/api/select',
    body: {
"op":"pattern",
"user":"09172121917",
"pass":"kWyE7@Xhnq",
"fromNum":"3000505",
"toNum":tel,
"patternCode":"reh6lil72eztiuj",
"inputData":[
    {"code":code,'state': 'مناقصه  بسته شد'}
    
]
},
    json: true,
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {

        console.log(response.body);
    } else {
console.log("whatever you want");
    
    }
});}


exports.winnerOne=(code,tel) => {request.post({
    url: 'http://ippanel.com/api/select',
    body: {
"op":"pattern",
"user":"09172121917",
"pass":"kWyE7@Xhnq",
"fromNum":"3000505",
"toNum":tel,
"patternCode":"a8ac6ecvwqtbq70",
"inputData":[
    {"code":code}
    
]
},
    json: true,
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {

        console.log(response.body);
    } else {
console.log("whatever you want");
    
    }
});}




exports.Otp=(code,tel,hashcode) => {request.post({
    url: 'http://ippanel.com/api/select',
    body: {
"op":"pattern",
"user":"09172121917",
"pass":"kWyE7@Xhnq",
"fromNum":"3000505",
"toNum":tel,
"patternCode":"kajgpd8wxh2gqqp",
"inputData":[
    {"code":code,'idcode':hashcode}
    
]
},
    json: true,
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {

        console.log(response.body);
    } else {
console.log("whatever you want");
    
    }
});}


//*---- اطلاع به کسانی که در آگهی لغو شده برنده شدهاند

exports.AdsCancelUserWinner=(code,tel)=>{
    request.post(
        {
     
         url:'https://api.sms-webservice.com/api/V3/SendTokenSingle',
         body : {
             "ApiKey": '425-232e752dff3344ab98c1db3ed6111998',
             "TemplateKey": 'uEVjPs4XXPcg',
             "Destination": tel,
             "p1": code
             
           },
           
         json: true,
     }, function (error, response, body) {
         if (!error && response.statusCode === 200) {
             
             console.log(response.body);
            
         } else {
     console.log("whatever you want");
   
         
         }
     
         
     
     
     
     })
}

//*----- پیام محدود شدن حساب کاربری به دلیل لغو بیش از 2 عدد در ماه

exports.blockUserFromOverFlowCancelAds=(name,tel)=>{
    request.post(
        {
     
         url:'https://api.sms-webservice.com/api/V3/SendTokenSingle',
         body : {
             "ApiKey": '425-232e752dff3344ab98c1db3ed6111998',
             "TemplateKey": 'Y5HpczZDVSHl',
             "Destination": tel,
             "p1": name
             
           },
           
         json: true,
     }, function (error, response, body) {
         if (!error && response.statusCode === 200) {
             
             console.log(response.body);
            
         } else {
     console.log("whatever you want");
   
         
         }
     
         
     
     
     
     })
}