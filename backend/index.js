const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(bodyparser.json());

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
    let payload = jwt.verify(token,'secretKey');
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
            let Bearer = jwt.sign(payload,'secretKey');
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
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let address = req.body.address;
    let zipCode = req.body.zipCode;
    let qr = `INSERT INTO users(name, email, password, address, zipCode) VALUES ("${name}","${email}","${password}","${address}","${zipCode}")`;
    db.query(qr, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).send({
            message: "data Inserted",
        });
    });
});

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
app.get("/event",verifyToken, (req, res) => {
    //console.log('getting event information');
    let qr = "SELECT * FROM events";
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


// Insert query API
app.post("/event",verifyToken, (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let active = 1;
    if (title == undefined || description == undefined) {
        res.status(401).send({
            message: "Invalid Data",
        });
    } else {
        let qr = `INSERT INTO events(title, description, active) VALUES ('${title}','${description}','${active}')`;
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

app.listen(3002, () => {
    console.log("Server running...");
});
