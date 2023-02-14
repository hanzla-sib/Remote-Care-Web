const cron = require('node-cron');
const {
    createPool
  } = require('mysql');
  const util = require('util');
  const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'remote_care',
    connectionLimit: 10
  })
  
  express = require('express'),
    router = express.Router();
  


var type = "1";

cron.schedule('* * * * *', function() {
  
var FCM = require('fcm-node');
var serverKey = 'AAAAgQVMLiE:APA91bG-OszIG4VfKvtJ6eHON7W3brRhp6mghsEfQSJRXLxr8L4R1CR4vWMIN82qR5BePqCblbVTuGXS09uoKq_wGH6gISTT9bJOuE1KwFJfJ7ekxmKY-wolSxmYgD0-1zqDAIjv6guZ';
var fcm = new FCM(serverKey);


var user_array=[];

var sql = 'select * FROM user where user_type = ?';
pool.query(sql, [type], function (err, result) {
    if (err) throw err;

    for(var i=0;i<result.length;i++){
        if(result[i].user_token===null||result[i].user_token===""){

        }
        else{
            
            var message = {
                to:result[i].user_token,
                    notification: {
                        title: 'Remote Care',
                        body: 'ITS Running Time \nStand Up!',
                    },
                
                    data: { //you can send only notification or only data(or include both)
                        title: 'ok cdfsdsdfsd',
                        body: '{"name" : "okg ooggle ogrlrl","product_id" : "123","final_price" : "0.00035"}'
                    }
                
                };
                
                fcm.send(message, function(err, response) {
                    if (err) {
                        console.log("Something has gone wrong!"+err);
                        console.log("Respponse:! "+response);
                    } else {
                        // showToast("Successfully sent with response");
                        console.log("Successfully sent with response: ", response);
                    }
                
                });
        }
       
    }
    
   
});



  });