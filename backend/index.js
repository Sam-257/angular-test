const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

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

// Select query API
app.get("/event", (req, res) => {
    //console.log('getting event information');
    let qr = "SELECT * FROM events";
    db.query(qr, (err, result) => {
        if (err) {
            console.error(err, "error in select query");
        }
        if (result.length > 0) {
            res.send({
                data: result,
            });
        }
    });
});

// Insert query API
app.post("/event", (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let active = 1;
    if (title == undefined || description == undefined) {
        res.send({
            message: "Invalid Data",
        });
    } else {
        let qr = `INSERT INTO events(title, description, active) VALUES ('${title}','${description}','${active}')`;
        db.query(qr, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send({
                message: "data Inserted",
            });
        });
    }
});

// Delete query
app.delete("/event/:sno", (req, res) => {
    let sno = req.params.sno;
    let qr = `DELETE FROM events WHERE sno = '${sno}'`;
    db.query(qr, (err, result) => {
        if (err) throw err;
        res.send({
            message: "data deleted",
        });
    });
});

app.listen(3002, () => {
    console.log("Server running...");
});
