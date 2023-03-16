const admin = require("firebase-admin");
const credentials = require("./key.json");
express = require('express'),
    router = express.Router();

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});
const db = admin.firestore();

router.route('/create').post((req, res) => {
    console.log(req.body);
    try {
        const id = req.body.Email;
        const userJson = {
            Email: req.body.Email,
            Name: req.body.Name,
            Password: req.body.Password,
            User_Type: req.body.User_Type,
            Gender: req.body.Gender

        };
        const response = db.collection("users").doc(id).set(userJson);
        res.send(req.body);
    }
    catch {
        res.send("eroor write");
    }
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
                const response = db.collection("users").doc(id).collection("calorie").doc(userJson.Namefood).set(foodcalorieobj);
                res.send(req.body);
            }
        });

    }
    catch {
        res.send("eroor write");
    }
});



router.route('/read/:id').get(async (req, res) => {
    try {
        const user = db.collection("users").doc(req.params.id);
        const arr = await user.get();
        res.send(arr.data());
    }
    catch {
        console.log("error reading");
        res.send("error reading");
    }



});


module.exports = router;