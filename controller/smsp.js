var querystring = require('querystring');
const axios = require('axios');
// import axios from 'axios';
var express = require('express');
var app = express();
apiKey="XXXXXXXXXXXXXX";

host='http://api.sms-webservice.com/api/V3/';
function performRequest(endpoint, method, data) {
  if (method == 'GET') {
    endpoint += '?' + querystring.stringify(data); 
    data=null;
  }
 
 axios({
    method: method,
    url: host+endpoint,
    data: data
  }) .then(function (response) {
    console.log(endpoint);
    console.log( (response.data) );
   
  })
  .catch(function (error) {
    console.log(error);
  });


 
}

function SendSMS(Text,Sender,recipients) {
  performRequest('Send', 'GET', {
      ApiKey: apiKey,
      Text:Text,
      Sender:Sender,
      Recipients:recipients
  });
}
function SendBulk(Text,Sender,Recipients){
  performRequest('SendBulk','POST', {
      ApiKey:apiKey,
     Text:Text,
     Sender:Sender,
     Recipients:Recipients});
}



function SendMultiple(recipients) {
  performRequest('SendMultiple', 'POST', {
      
          ApiKey: apiKey,
          Recipients: recipients
                    
  });
}
function SendTokenSingle() {
  console.log('run send sms');
  performRequest('SendTokenSingle', 'GET', {
      ApiKey: '425-64356039408b42dc8b8d595332559121',
      TemplateKey:'forgetPass	',
      Destination:'09172121917',
      p1:'123123',
     
  });
}

function SendTokenMultiple(templateKey,recipients) {
  performRequest('SendTokenMulti', 'POST', {
      
          ApiKey: apiKey,
          TemplateKey: templateKey,
          Recipients: recipients
                    
  });
}

function TokenList() {
  performRequest('TokenList', 'POST', {
      
          ApiKey: apiKey
                            
  });
}


function StatusById(ids) {
    performRequest('StatusById', 'POST', {
        
            ApiKey: apiKey,
            Ids:ids
                              
    });
  }
  function StatusByUserTraceId(userTraceIds) {
    performRequest('StatusByUserTraceId', 'POST', {
        
            ApiKey: apiKey,
            UserTraceIds:userTraceIds
                              
    });
  }
  function AccountInfo() {
    performRequest('AccountInfo', 'POST', {
        
            ApiKey: apiKey
                              
    });
  }

  exports.sendSms=()=>SendTokenSingle();

