const {
  createPool
} = require('mysql');

const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'remote_care',
  connectionLimit: 10
})

express = require('express'),
  router = express.Router();



router.route('/get_test_record/:id').get(async (req, res) => {
  var email = req.params.id;
  var sql = 'select * FROM test_record where Temail = ?';
  pool.query(sql, [email], function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});



router.route('/get_user_type/:id').get(async (req, res) => {


  var email = req.params.id;
  var sql = 'select * FROM user where email = ?';
  pool.query(sql, [email], function (err, result) {
    if (err) throw err;
    // console.log(result[0]);
    res.send(result[0]);
  });
});


router.route('/get_all_docs_in_patient_appoint/:id').get(async (req, res) => {
  var pateintemail = req.params.id;
  var sql = 'select * FROM user where user_type = "2"';
  var array1 = [];
  pool.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});



router.route('/get_limited_doctors_in_patient_appoint').post(async (req, res, next) => {
  var email = req.body.email;
  var array1 = [];
  var l = 0;

  var length = req.body.dataarray.length;

  for (let item of req.body.dataarray) {
    // console.log(item.email);
    var sql = 'SELECT * FROM patient_appointment WHERE p_email = ? AND d_email = ?';
    pool.query(sql, [email, item.email], function (err, result) {
      if (err) throw err;
      // console.log(result);

      if (result.length === 0) {
        // console.log(item.email);
        array1.push(item.name);

      }
      if (l === length - 1) {
        // console.log(array1);
        res.send(array1);
      }
      l++;

    });
  }
});



router.route('/get_pending_and_confirmed_appoint/:id').get(async (req, res) => {
  var pateintemail = req.params.id;

  var sql = 'SELECT * FROM patient_appointment WHERE p_email = ?';
  pool.query(sql, [pateintemail], function (err, result) {
    if (err) throw err;
    res.send(result);

  });
});


router.route('/DoctorSideshowACCEPTEDAPPOINT/:id').get(async (req, res) => {
  var Doctoremail = req.params.id;

  var sql = 'SELECT * FROM doctor_appointment WHERE d_email = ? and appoint_status="Accepted"';
  pool.query(sql, [Doctoremail], function (err, result) {
    if (err) throw err;
    res.send(result);

  });
});

router.route('/DoctorPendingAppoint/:id').get(async (req, res) => {
  var Doctoremail = req.params.id;

  var sql = 'SELECT * FROM doctor_appointment WHERE d_email = ? and appoint_status="Pending"';
  pool.query(sql, [Doctoremail], function (err, result) {
    if (err) throw err;
    res.send(result);

  });
});



router.route('/RejectAppointment').post(async (req, res, next) => {
  var docemail = req.body.doc_email;
  var patemail = req.body.pat_email;

  console.log(docemail);


  var sql = "DELETE FROM patient_appointment WHERE p_email = ? AND d_email = ?";
  pool.query(sql, [patemail, docemail], function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) deleted");
  });

  var sql = "DELETE FROM doctor_appointment WHERE p_email = ? AND d_email = ?";
  pool.query(sql, [patemail, docemail], function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) deleted");
  });

  res.send("deleted Appoint");
});


router.route('/AcceptAppointment').post(async (req, res, next) => {
  var docemail = req.body.doc_email;
  var patemail = req.body.pat_email;
  var time = req.body.time1;
  var date = req.body.date1;

  console.log(docemail);


  var sql = "UPDATE patient_appointment SET appoint_status = 'Accepted',Time1 = ?,Date1 = ? WHERE p_email = ? AND d_email = ?";
  pool.query(sql, [time, date, patemail, docemail], function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });


  var sql = "UPDATE doctor_appointment SET appoint_status = 'Accepted',Time1 = ?,Date1 = ? WHERE p_email = ? AND d_email = ?";
  pool.query(sql, [time, date, patemail, docemail], function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });

  res.send("updated Appoint");
});




router.route('/RequestAppoint').post(async (req, res, next) => {
  var docname = req.body.doc_name;
  var patemail = req.body.pat_email;

  var patname = "";
  var sql = 'SELECT * FROM user WHERE email = ?';
  pool.query(sql, [patemail], function (err, result) {
    if (err) throw err;
    patname = result[0].name;
  });


  var sql = 'SELECT * FROM user WHERE name = ?';
  pool.query(sql, [docname], function (err, result) {
    if (err) throw err;
    console.log(result[0].email);
    console.log(patname);
    var sql1 = "INSERT INTO patient_appointment (p_name, p_email,appoint_status,d_name,d_email) VALUES ?";
    var values = [
      [patname, patemail, 'Pending', docname, result[0].email]
    ];
    pool.query(sql1, [values], function (err, result) {
      if (err) throw err;
      console.log("1 record inserted in pateint");
    });

    var sql1 = "INSERT INTO doctor_appointment (d_name, d_email,appoint_status,p_name,p_email) VALUES ?";
    var values = [
      [docname, result[0].email, 'Pending', patname, patemail]
    ];
    pool.query(sql1, [values], function (err, result) {
      if (err) throw err;
      console.log("1 record inserted in pateint");
    });
  });
  res.send("updated Appoint");
});



router.route('/queryfood').post((req, res) => {
  console.log(req.body);
  try {
    const id = req.body.Email;
    const userJson = {
      Namefood: req.body.Namefood
    };
    console.log("asdasd   ", userJson);
    const request = require('request');
    var query = userJson.Namefood;

    request.get({
      url: 'https://api.calorieninjas.com/v1/nutrition?query=' + query,
      headers: {
        'X-Api-Key': 'tss9OJ5+zRf9qtV6t8HILA==Gq0oiP3o3a2KBq5B'
      },
    }, function (error, response, body) {
      if (error) return console.error('Request failed:', error);
      else if (response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
      else {
        console.log("-------------");
        console.log(body);
        var obj = JSON.parse(body);

        console.log(obj.items[0].calories);
        const foodcalorieobj = {
          foodname: userJson.Namefood,
          calorie: obj.items[0].calories
        };

        var date_time = new Date();
        var day = ("0" + date_time.getDate()).slice(-2);
        var month = ("0" + (date_time.getMonth() + 1)).slice(-2);
        var year = date_time.getFullYear();

        var date = year + "-" + month + "-" + day;
        //===============

        var check = false;
        var caloriecountsum = 0;
        var sql = 'SELECT * FROM consumed_calories WHERE p_email = ? and date_log = ?';
        pool.query(sql, [id, date], function (err, result) {
          if (err) throw err;

          console.log(result.length);
          console.log(date);

          if (result.length === 1) {
            caloriecountsum = result[0].Calories;
            caloriecountsum = caloriecountsum + foodcalorieobj.calorie;
            var sql = "UPDATE consumed_calories SET Calories = ? WHERE p_email = ? AND date_log = ?";
            pool.query(sql, [caloriecountsum, id, date], function (err, result) {
              if (err) throw err;
              console.log(result.affectedRows + " record(s) updated");
            });
          }
          else {
            var sql1 = "INSERT INTO consumed_calories (p_email,date_log,Calories) VALUES ?";
            var values = [
              [id, date, foodcalorieobj.calorie]
            ];
            pool.query(sql1, [values], function (err, result) {
              if (err) throw err;
              console.log("1 record inserted in pateint");
            });
            res.send(req.body);
          }


        });
        console.log(check);


      }
    });

  }
  catch {
    res.send("eroor write");
  }
});


router.route('/getCaloriegraph/:id').get(async (req, res) => {
  var pateintemail = req.params.id;
  var sql = 'select * FROM consumed_calories where p_email = ?';

  pool.query(sql, [pateintemail], function (err, result) {
    if (err) throw err;
    res.send(result);
    // console.log(result);
  });
});


router.route('/getSteps/:id').get(async (req, res) => {
  var pateintemail = req.params.id;
  // console.log(pateintemail);
  var sql = 'select * FROM daily_steps where Demail = ?';

  pool.query(sql, [pateintemail], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});


router.route('/getStepsgraph_weekly/:id').get(async (req, res) => {
  var pateintemail = req.params.id;
  var sql = 'select * FROM weekly_steps where Demail = ?';

  pool.query(sql, [pateintemail], function (err, result) {
    if (err) throw err;
    res.send(result);
    // console.log(result);
  });
});



router.route('/getStepsgraph_Monthly/:id').get(async (req, res) => {
  var pateintemail = req.params.id;
  var sql = 'select extract(MONTH from date_log) as month,sum(steps_daily) as steps from weekly_steps where Demail = ?  group by month';

  pool.query(sql, [pateintemail], function (err, result) {
    if (err) throw err;
    res.send(result);
    // console.log(result);
  });
});


router.route('/getCaloriesBurntgraph_Monthly/:id').get(async (req, res) => {
  var pateintemail = req.params.id;
  var sql = 'select extract(MONTH from date_log) as month,sum(Burnt_Calories) as totalburntCalories from weekly_steps where Demail = ?  group by month';

  pool.query(sql, [pateintemail], function (err, result) {
    if (err) throw err;
    res.send(result);
    // console.log(result);
  });
});


router.route('/getCaloriesConsumedgraph_Monthly/:id').get(async (req, res) => {
  var pateintemail = req.params.id;
  var sql = 'select extract(MONTH from date_log) as month,sum(Calories) as totalConsumedCalories from consumed_calories where p_email = ?  group by month';

  pool.query(sql, [pateintemail], function (err, result) {
    if (err) throw err;
    res.send(result);
    // console.log(result);
  });
});



router.route('/getStepsgraph_weekly_range/:id/:from/:to').get(async (req, res) => {
  var pateintemail = req.params.id;
  var from = req.params.from;
  var to = req.params.to;





  const query = 'SELECT * FROM `weekly_steps` ' +
    'WHERE `Demail`=? AND date_log BETWEEN ? AND ?';

  const values = [pateintemail, from + "T19:00:00.000Z", to + "T19:00:00.000Z"];                                // id >= 2 AND id <= 4

  pool.query(query, values, (error, result) => {  // sends queries

    if (error) throw error;
    res.send(result);
  });

});


router.route('/getCaloriegraph/:id/:from/:to').get(async (req, res) => {
  var pateintemail = req.params.id;
  var from = req.params.from;
  var to = req.params.to;


  const query = 'SELECT * FROM `consumed_calories` ' +
    'WHERE `p_email`=? AND date_log BETWEEN ? AND ?';

  const values = [pateintemail, from + "T19:00:00.000Z", to + "T19:00:00.000Z"];

  pool.query(query, values, (error, result) => {  // sends queries

    if (error) throw error;
    res.send(result);
  });


});

router.route('/get_appointment_history/:id').get(async (req, res) => {
  var pateintemail = req.params.id;

  var sql = 'SELECT * FROM appointment_history WHERE p_email = ?';
  pool.query(sql, [pateintemail], function (err, result) {
    if (err) throw err;
    res.send(result);

  });
});


module.exports = router;