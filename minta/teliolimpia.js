const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");


app.use(cors());
app.use(bodyparser.json());

const db = mysql.createConnection(
    {
        user:"root",
        host:"localhost",
        port:3307,
        password:"",
        database:"teliolimpia"
    }
);

app.get("/", (req, res) => {
    res.send("Működik a szerver.");
});


app.get("/v", (req,res) => {
    const sql = "SELECT * FROM versenyzok";
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

app.get("/helyszin", (req,res) => {
    const sql = "SELECT varos, helyszin FROM sportagak";
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

app.get("/erem", (req,res) => {
    const sql = "SELECT helyezes, orszag FROM rpgyorskorcsolyaeredmenyek";
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

app.get("/magyar", (req,res) => {
    const sql = "SELECT sportagak.sportagneve, sportagak.helyszin, magyarermesek.helyezes, rpgytavok.tav FROM magyarermesek INNER JOIN sportagak ON sportagak.sportagID = magyarermesek.sportagID INNER JOIN rpgytavok ON rpgytavok.tavID = magyarermesek.tavID";
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});


app.listen(3000, () => {

    console.log("A téliolimpia szervere a 3000-es porton fut.");

}); 
