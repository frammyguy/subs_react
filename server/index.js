import express from "express";
import mysql from "mysql";
import cors from "cors";
import cookieSession from "cookie-session";
import 'dotenv/config';
import passport from "passport";

const app = express();

//to make app more scalable use mvc or another pattern:
//https://www.geeksforgeeks.org/mvc-design-pattern/
//But overall need to split logic to controller and action
// to be able to import one fucntion from another file and execute in inside function
// app.get('/', (req, res)=>{ controllerAction(req, res) });

const db = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    multipleStatements: true
});

app.use(express.json());
app.use(cors());
app.use(cookieSession(
    {
        name: "session",
        keys: ["flowtrack"],
        maxAge: 24 * 60 * 60 * 100
    }
));

app.post('/add', (req, res) => {
    const q = "INSERT INTO Flowtrack (`Author`, `Service`, `Description`, `Price`) VALUES (?)"
    const values = [
        req.body.author,
        req.body.service,
        req.body.desc,
        req.body.price,
    ];
    db.query(q, [values], (err, data) => {
        if (err) return console.log(err);
        return res.json(data);
    })
})

app.get('/', (req, res) => {
    const q = "SELECT * FROM Flowtrack_services";
    db.query(q, (err, data) => {
        if (err) return console.log(err);
        return res.json(data);
    })
});

app.get('/library', (req, res) => {
    const info = '';
    const q = [
        "SELECT * FROM Flowtrack",
        "SELECT * FROM Flowtrack_services"
    ];
    db.query(q.join(';'), (err, data) => {
        if (err) return console.log(err);
        return res.json(data);
    })
});

app.delete('/library/:id', (req, res) => {
    const id = req.params.id;
    const q = "DELETE FROM Flowtrack Where ID = ?"
    db.query(q, [id], (err, data) => {
        if (err) return console.log(err);
        return res.json("delete success");
    })
})

app.put('/update/:id', (req, res) => {
    let id = '';
    if (req.params.id != '')
        id = req.params.id
    else
        return res.json('error');
    if (req.body.author != '') {
        const q = "UPDATE Flowtrack SET Author=? Where `ID`=?"
        const value = [
            req.body.author
        ]
        db.query(q, [...value, id], (err, data) => {
            if (err) return console.log(err);
        })
    }
    if (req.body.service != '') {
        const q = "UPDATE Flowtrack SET Service=? Where `ID`=?"
        const value = [
            req.body.service
        ]
        db.query(q, [...value, id], (err, data) => {
            if (err) return console.log(err);
        })
    }
    if (req.body.desc != '') {
        const q = "UPDATE Flowtrack SET Description=? Where `ID`=?"
        const value = [
            req.body.desc
        ]
        db.query(q, [...value, id], (err, data) => {
            if (err) return console.log(err);
        })
    }
    if (req.body.price != '') {
        const q = "UPDATE Flowtrack SET Price=? Where `ID`=?"
        const value = [
            req.body.price
        ]
        db.query(q, [...value, id], (err, data) => {
            if (err) return console.log(err);
        })
    }
    return res.json('success');
})

app.listen(8800, () => { });