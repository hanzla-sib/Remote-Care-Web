// Import the 'createPool' function from the 'mysql' module
const { createPool } = require('mysql');

// Create a connection pool using the 'createPool' function
// The connection pool allows reusing and managing multiple database connections
const pool = createPool({
  host: 'localhost',     // The hostname or IP address of the MySQL database server
  user: 'root',          // The username to authenticate with the MySQL server
  password: '',          // The password to authenticate with the MySQL server
  database: 'remote_care', // The name of the database to connect to
  connectionLimit: 10    // The maximum number of connections allowed in the pool
});

// Import the 'express' module
express = require('express'),
  router = express.Router();

// More code can follow after this point
// The 'pool' variable can be used to execute database queries using the connection pool

// Define a route for GET requests to '/get_test_record/:id'
router.route('/get_test_record/:id').get(async (req, res) => {
  // Extract the value of 'id' parameter from the request URL
  var email = req.params.id;

  // Define the SQL query to select all records from the 'test_record' table where 'Temail' column matches the provided email
  var sql = 'SELECT * FROM test_record WHERE Temail = ?';

  // Execute the SQL query using the connection pool's 'query' method
  await pool.query(sql, [email], function (err, result) {
    if (err) throw err;

    // Send the result of the query as the response
    res.send(result);
  });
});


router.route('/get_user_type/:id').get(async (req, res) => {


  var email = req.params.id;
  var sql = 'select * FROM user where email = ?';
  await pool.query(sql, [email], function (err, result) {
    if (err) throw err;
    // console.log(result[0]);
    res.send(result[0]);
  });
});


router.route('/get_all_docs_in_patient_appoint/:id').get(async (req, res) => {
  var pateintemail = req.params.id;
  var sql = 'select * FROM user where user_type = "2"';
  var array1 = [];
  await pool.query(sql, function (err, result) {
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
    await pool.query(sql, [email, item.email], function (err, result) {
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
  await pool.query(sql, [pateintemail], function (err, result) {
    if (err) throw err;
    res.send(result);

  });
});


router.route('/DoctorSideshowACCEPTEDAPPOINT/:id').get(async (req, res) => {
  var Doctoremail = req.params.id;

  var sql = 'SELECT * FROM doctor_appointment WHERE d_email = ?';
  await pool.query(sql, [Doctoremail], function (err, result) {
    if (err) throw err;
    res.send(result);

  });
});

router.route('/DoctorPendingAppoint/:id').get(async (req, res) => {
  var Doctoremail = req.params.id;

  var sql = 'SELECT * FROM doctor_appointment WHERE d_email = ? and appoint_status="Pending"';
  await pool.query(sql, [Doctoremail], function (err, result) {
    if (err) throw err;
    res.send(result);

  });
});



router.route('/RejectAppointment').post(async (req, res, next) => {
  var docemail = req.body.doc_email;
  var patemail = req.body.pat_email;

  // console.log(docemail);


  var sql = "DELETE FROM patient_appointment WHERE p_email = ? AND d_email = ?";
  await pool.query(sql, [patemail, docemail], function (err, result) {
    if (err) throw err;
    // console.log(result.affectedRows + " record(s) deleted");
  });

  var sql = "DELETE FROM doctor_appointment WHERE p_email = ? AND d_email = ?";
  await pool.query(sql, [patemail, docemail], function (err, result) {
    if (err) throw err;
    // console.log(result.affectedRows + " record(s) deleted");
  });

  res.send("deleted Appoint");
});


router.route('/AcceptAppointment').post(async (req, res, next) => {
  var docemail = req.body.doc_email;
  var patemail = req.body.pat_email;
  var time = req.body.time1;
  var date = req.body.date1;

  // console.log(docemail);


  var sql = "UPDATE patient_appointment SET appoint_status = 'Accepted',Time1 = ?,Date1 = ? WHERE p_email = ? AND d_email = ?";
  await pool.query(sql, [time, date, patemail, docemail], function (err, result) {
    if (err) throw err;
    // console.log(result.affectedRows + " record(s) updated");
  });


  var sql = "UPDATE doctor_appointment SET appoint_status = 'Accepted',Time1 = ?,Date1 = ? WHERE p_email = ? AND d_email = ?";
  await pool.query(sql, [time, date, patemail, docemail], function (err, result) {
    if (err) throw err;
    // console.log(result.affectedRows + " record(s) updated");
  });

  res.send("updated Appoint");
});




router.route('/RequestAppoint').post(async (req, res, next) => {
  var docname = req.body.doc_name;
  var patemail = req.body.pat_email;

  var patname = "";
  var sql = 'SELECT * FROM user WHERE email = ?';
  await pool.query(sql, [patemail], function (err, result) {
    if (err) throw err;
    patname = result[0].name;
  });


  var sql = 'SELECT * FROM user WHERE name = ?';
  await pool.query(sql, [docname], function (err, result) {
    if (err) throw err;
    // console.log(result[0].email);
    // console.log(patname);
    var sql1 = "INSERT INTO patient_appointment (p_name, p_email,appoint_status,d_name,d_email) VALUES ?";
    var values = [
      [patname, patemail, 'Pending', docname, result[0].email]
    ];
    pool.query(sql1, [values], function (err, result) {
      if (err) throw err;
      // console.log("1 record inserted in pateint");
    });

    var sql1 = "INSERT INTO doctor_appointment (d_name, d_email,appoint_status,p_name,p_email) VALUES ?";
    var values = [
      [docname, result[0].email, 'Pending', patname, patemail]
    ];
    pool.query(sql1, [values], function (err, result) {
      if (err) throw err;
      // console.log("1 record inserted in pateint");
    });
  });
  res.send("updated Appoint");
});





router.route('/getCaloriegraph/:id').get(async (req, res) => {
  var pateintemail = req.params.id;
  var sql = 'select * FROM consumed_calories where p_email = ?';

  await pool.query(sql, [pateintemail], function (err, result) {
    if (err) throw err;
    res.send(result);
    // console.log(result);
  });
});


router.route('/getSteps/:id').get(async (req, res) => {
  var pateintemail = req.params.id;
  // console.log(pateintemail);
  var sql = 'select * FROM daily_steps where Demail = ?';

  await pool.query(sql, [pateintemail], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});


router.route('/getStepsgraph_weekly/:id').get(async (req, res) => {
  var pateintemail = req.params.id;
  var sql = 'select * FROM weekly_steps where Demail = ?';

  await pool.query(sql, [pateintemail], function (err, result) {
    if (err) throw err;
    res.send(result);
    // console.log(result);
  });
});



router.route('/getStepsgraph_Monthly/:id').get(async (req, res) => {
  var pateintemail = req.params.id;
  var sql = 'select extract(MONTH from date_log) as month,sum(steps_daily) as steps from weekly_steps where Demail = ?  group by month';

  await pool.query(sql, [pateintemail], function (err, result) {
    if (err) throw err;
    res.send(result);
    // console.log(result);
  });
});


router.route('/getCaloriesBurntgraph_Monthly/:id').get(async (req, res) => {
  var pateintemail = req.params.id;
  var sql = 'select extract(MONTH from date_log) as month,sum(Burnt_Calories) as totalburntCalories from weekly_steps where Demail = ?  group by month';

  await pool.query(sql, [pateintemail], function (err, result) {
    if (err) throw err;
    res.send(result);
    // console.log(result);
  });
});


router.route('/getCaloriesConsumedgraph_Monthly/:id').get(async (req, res) => {
  var pateintemail = req.params.id;
  var sql = 'select extract(MONTH from date_log) as month,sum(Calories) as totalConsumedCalories from consumed_calories where p_email = ?  group by month';

  await pool.query(sql, [pateintemail], function (err, result) {
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

  await pool.query(query, values, (error, result) => {  // sends queries

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

  await pool.query(query, values, (error, result) => {  // sends queries

    if (error) throw error;
    res.send(result);
  });


});

router.route('/get_appointment_history/:id').get(async (req, res) => {
  var pateintemail = req.params.id;

  var sql = 'SELECT * FROM appointment_history WHERE p_email = ?';
  await pool.query(sql, [pateintemail], function (err, result) {
    if (err) throw err;
    // console.log(result);
    res.send(result);

  });
});

router.route('/get_all_patients').get(async (req, res) => {

  var usertype = "1";
  var sql = 'select * FROM user where user_type = ?';
  await pool.query(sql, [usertype], function (err, result) {
    if (err) throw err;
    // console.log(result);
    res.send(result);
  });
});


router.route('/get_all_users_admin').get(async (req, res) => {

  var usertype1 = "1";
  var usertype2 = "2";
  var sql = 'select * FROM user';
  await pool.query(sql, function (err, result) {
    if (err) throw err;
    // console.log(result);
    res.send(result);
  });
});

router.route('/get_appointment_history_admin_doc/:id').get(async (req, res) => {
  var pateintemail = req.params.id;

  var sql = 'SELECT * FROM appointment_history WHERE d_email = ?';
  await pool.query(sql, [pateintemail], function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);

  });
});


router.route('/get_appointment_current_admin_doc/:id').get(async (req, res) => {
  var Doctoremail = req.params.id;

  var sql = 'SELECT * FROM doctor_appointment WHERE d_email = ?';
  await pool.query(sql, [Doctoremail], function (err, result) {
    if (err) throw err;
    res.send(result);

  });
});


router.route('/get_appointment_history_admin_pat/:id').get(async (req, res) => {
  var pateintemail = req.params.id;

  var sql = 'SELECT * FROM appointment_history WHERE p_email = ?';
  await pool.query(sql, [pateintemail], function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);

  });
});

router.route('/get_appointment_current_admin_pat/:id').get(async (req, res) => {
  var Doctoremail = req.params.id;

  var sql = 'SELECT * FROM doctor_appointment WHERE p_email = ?';
  await pool.query(sql, [Doctoremail], function (err, result) {
    if (err) throw err;
    res.send(result);

  });
});

router.route('/get_appointment_history_doc/:id').get(async (req, res) => {
  var pateintemail = req.params.id;

  var sql = 'SELECT * FROM appointment_history WHERE d_email = ?';
  await pool.query(sql, [pateintemail], function (err, result) {
    if (err) throw err;
    // console.log(result);
    res.send(result);

  });
});



router.route('/get_all_patients_fordoc/:id').get(async (req, res) => {
  var Doctoremail = req.params.id;
  var sql = 'SELECT * FROM doctor_appointment WHERE d_email = ? and appoint_status="Accepted"';
  await pool.query(sql, [Doctoremail], function (err, result) {
    if (err) throw err;
    res.send(result);

  });
});



router.route('/getheartbeat_weekly/:id').get(async (req, res) => {
  var pateintemail = req.params.id;
  var sql = 'select date_log,avg(HeartBeat_daily) as HR FROM heartbeat where Demail = ? GROUP BY date_log';

  await pool.query(sql, [pateintemail], function (err, result) {
    if (err) throw err;
    res.send(result);
    // console.log(result);
  });
});


router.route('/getheartbeat_weekly_range/:id/:from/:to').get(async (req, res) => {
  var pateintemail = req.params.id;
  var from = req.params.from;
  var to = req.params.to;
  const query = 'SELECT date_log,avg(HeartBeat_daily) as HR FROM `heartbeat` ' +
    'WHERE `Demail`=? AND date_log BETWEEN ? AND ? GROUP BY date_log';

  const values = [pateintemail, from + "T19:00:00.000Z", to + "T19:00:00.000Z"];                                // id >= 2 AND id <= 4

  await pool.query(query, values, (error, result) => {  // sends queries

    if (error) throw error;
    res.send(result);
  });

});



router.route('/getHRgraph_Monthly/:id').get(async (req, res) => {
  var pateintemail = req.params.id;
  var sql = 'select extract(MONTH from date_log) as month,AVG(HeartBeat_daily) as HR from heartbeat where Demail = ?  group by month';

  await pool.query(sql, [pateintemail], function (err, result) {
    if (err) throw err;
    res.send(result);
    // console.log(result);
  });
});







module.exports = router;
