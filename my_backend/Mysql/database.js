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
  pool.query(`select * from test_record`, (err, result, fields) => {


    if (err) {
      return console.log(err);
    }
    //  console.log(result);
    res.send(result);

  })

  //   var adr = req.params.id;
  // var sql = 'select * FROM test_record';
  // await pool.query(sql, [adr], function (err, result) {
  //   if (err) throw err;
  //   console.log(result[0]);
  //   res.send(result[0]);
  // });
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



router.route('/get_limited_doctors_in_patient_appoint').post(async(req, res,next) => {
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




module.exports = router;