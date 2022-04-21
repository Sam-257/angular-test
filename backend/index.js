const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const mailgun = require("mailgun-js");
const DOMAIN = 'sandboxe8a00f82967c4d9687b9208590e9890d.mailgun.org';

const app = express();
app.use(cors());
app.use(bodyparser.json());

require('dotenv').config();

let api_key = process.env.API_KEY;
const port = process.env.PORT || 3002;
const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN});

//Mysql connect
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "angular-test",
    port: 3306,
});

//checking if db is connected
db.connect((err) => {
    if (err) {
        console.error(err, "Error while connecting to Database");
    } else {
        console.log("Connected to database");
    }
});

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send({
            message: "Unauthorized RequestAccess"
        })
    }
    let token = req.headers.authorization.split(' ')[1];
    if(token === 'null'){
        return res.status(401).send({
            message: "Unauthorized RequestAccess"
        });
    }
    let payload = jwt.verify(token,api_key);
    if(!payload){
        return res.status(401).send({
            message: "Unauthorized RequestAccess"
        });
    }
    next();
}


// API for login

app.post("/login",(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    let qr = `SELECT id,password FROM users WHERE email = "${ email }"`
    db.query(qr,(err,result)=>{
        if (err) throw err;
        if(result.length == 0){
            res.status(401).send({
                message: "Invalid email",
                auth: false
            })
        } else if (result[0].password != password){
            //console.log(result[0].password);
            res.status(401).send({
                message: 'Invalid Password',
                auth: false
            })
        } else{
            let payload = {subject: result[0].id};
            let Bearer = jwt.sign(payload,api_key);
            res.status(200).send({
                message: 'Allow login',
                auth: true,
                Bearer,
                id: result[0].id

            })
        }

    })
})


//API for user
//Select Query
app.get("/user",(req,res) =>{
    let qr = "SELECT * FROM users";
    db.query(qr,(err,result) => {
        if (err) throw err;
        res.status(200).send({
            data: result
        })
    });
});

// Select single data
app.get("/user/:id",(req,res) =>{
    let id = req.params.id;
    let qr = `SELECT * FROM users WHERE id = "${id}"`;
    db.query(qr,(err,result) => {
        if (err) throw err;
        res.status(200).send({
            data: result
        })
    });
});

// Insert query API
app.post("/user", (req, res) => {
    let payload = req.body;
    let email = req.body.email;
    let token = jwt.sign(payload,api_key);
    const data = {
        from: 'noreply@axiomio.com',
        to: email,
        subject: 'Email Verification',
        html: `<h2> Click on the link to activate your account </h2>
        <a href = 'http://localhost:4200/emailVerification/${token}'>Click Here</a>
        `
    };
    mg.messages().send(data, (error, body) => {
        if (error) throw error;
        console.log(body);
        
    });
    
});

app.get("/activate/:token",(req,res)=>{
    let token = req.params.token;
    if(token){
        jwt.verify(token,api_key,(err,decodedToken) => {
            if (err){
                res.status(401).send({
                    message: 'Check again',
                });
                
            }
            let name = decodedToken.name;
            let email = decodedToken.email;
            let password = decodedToken.password;
            let address = decodedToken.address;
            let zipCode = decodedToken.zipCode;
            let qr = `INSERT INTO users(name, email, password, address, zipCode) VALUES ("${name}","${email}","${password}","${address}","${zipCode}")`;
            db.query(qr, (err, result) => {
                if (err) throw err;
                console.log(result);
                res.status(200).send({
                    message: "data Inserted",
                });
            });
        });
    } else{
        res.status(200).send({
           message: "Token not Available"
        });
   }
});

// app.post("/user", (req, res) => {
//     let name = req.body.name;
//     let email = req.body.email;
//     let password = req.body.password;
//     let address = req.body.address;
//     let zipCode = req.body.zipCode;
//     let qr = `INSERT INTO users(name, email, password, address, zipCode) VALUES ("${name}","${email}","${password}","${address}","${zipCode}")`;
//     db.query(qr, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.status(200).send({
//             message: "data Inserted",
//         });
//     });
// });

//Update Query
app.put("/user/:id",(req,res)=>{
    let id = req.params.id;
    let name = req.body.name;
    let email = req.body.email;
    let address = req.body.address;
    let zipCode = req.body.zipCode;
    let qr = `UPDATE users SET name = "${name}", email = "${email}", address = "${address}", zipCode = "${zipCode}" WHERE id = "${id}"`;
    db.query(qr,(err,result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).send({
            message: "data Updated"
        })
    });
    
});

// Delete query
app.delete("/user/:id", (req, res) => {
    let id = req.params.id;
    let qr = `DELETE FROM users WHERE id = '${id}'`;
    db.query(qr, (err, result) => {
        if (err) throw err;
        res.status(200).send({
            message: "data deleted",
        });
    });
});




// API for events---------------------------------------------
// Select query API
app.get("/event/:user_id",verifyToken, (req, res) => {
    //console.log('getting event information');
    let user_id = req.params.user_id;
    let qr = `SELECT * FROM events WHERE user_id = '${user_id}'`;
    db.query(qr, (err, result) => {
        if (err) {
            console.error(err, "error in select query");
        }
        if (result.length > 0) {
            res.status(200).send({
                data: result,
            });
        }
    });
});

// Before
app.get("/event/before/:user_id",verifyToken, (req, res) => {
    //console.log('getting event information');
    let user_id = req.params.user_id;
    let qr = `SELECT * FROM events WHERE user_id = '${user_id}' AND event_start > CURRENT_TIMESTAMP`;
    db.query(qr, (err, result) => {
        if (err) {
            console.error(err, "error in select query");
        }
        if (result.length > 0) {
            res.status(200).send({
                data: result,
            });
        }
    });
});

// ongoing
app.get("/event/ongoing/:user_id",verifyToken, (req, res) => {
    //console.log('getting event information');
    let user_id = req.params.user_id;
    let qr = `SELECT * FROM events WHERE user_id = '${user_id}' AND event_start < CURRENT_TIMESTAMP AND event_end > CURRENT_TIMESTAMP`;
    db.query(qr, (err, result) => {
        if (err) {
            console.error(err, "error in select query");
        }
        if (result.length > 0) {
            res.status(200).send({
                data: result,
            });
        }
    });
});

// After
app.get("/event/after/:user_id",verifyToken, (req, res) => {
    //console.log('getting event information');
    let user_id = req.params.user_id;
    let qr = `SELECT * FROM events WHERE user_id = '${user_id}'  AND event_end < CURRENT_TIMESTAMP`;
    db.query(qr, (err, result) => {
        if (err) {
            console.error(err, "error in select after query");
        }
        if (result.length > 0) {
            res.status(200).send({
                data: result,
            });
        }
    });
});

// Insert query API
app.post("/event",verifyToken, (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let user_id = req.body.user_id;
    let event_start = req.body.event_start;
    let event_end = req.body.event_end;
    event_start = event_start.replace('T',' ');
    event_start = event_start.replace('.000Z','');
    event_end = event_end.replace('T',' ');
    event_end = event_end.replace('.000Z','');
    if (title == undefined || description == undefined || title == '' || description == '') {
        res.status(401).send({
            message: "Invalid Data",
        });
    } else {
        let qr = `INSERT INTO events(title, description, user_id, event_start, event_end) VALUES ('${title}','${description}','${user_id}','${event_start}','${event_end}')`;
        db.query(qr, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.status(200).send({
                message: "data Inserted",
            });
        });
    }
});

// Delete query
app.delete("/event/:sno",verifyToken, (req, res) => {
    let sno = req.params.sno;
    let qr = `DELETE FROM events WHERE sno = '${sno}'`;
    db.query(qr, (err, result) => {
        if (err) throw err;
        res.status(200).send({
            message: "data deleted",
        });
    });
});

app.listen(port, () => {
    console.log("Server running...");
});
