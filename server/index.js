import express from "express";
import {createConnection} from "mysql";
import cors from "cors";
import jwt from "jsonwebtoken";
import 'dotenv/config';

const app = express();

//to make app more scalable use mvc or another pattern:
//https://www.geeksforgeeks.org/mvc-design-pattern/
//But overall need to split logic to controller and action
// to be able to import one fucntion from another file and execute in inside function
// app.get('/', (req, res)=>{ controllerAction(req, res) });

const db = createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    multipleStatements: true
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    const q = "SELECT * FROM Flowtrack_services WHERE Photo <> ''";
    db.query(q, (err, data) => {
        if (err) return console.log(err);
        return res.json(data);
    })
});

app.post('/add', (req, res) => {
    const author = req.body.author;
    if (!author) return res.json({token:'no token'})
    const decoded = jwt.verify(author, 'SecretKey').username;
    const insert_service = "INSERT INTO Flowtrack_services (`Name`) VALUES (?)"
    const insert_name = [
        req.body.service.trim()
    ];
    const q = "INSERT INTO Flowtrack (`Author`, `Service`, `Description`, `Price`) VALUES (?)"
    const values = [
        decoded,
        req.body.service.trim(),
        req.body.desc.trim(),
        req.body.price.trim()
    ];
    db.query(insert_service, [insert_name], (err, _) => {
        if (err) return console.log(err);
    })
    db.query(q, [values], (err, data) => {
        if (err) return console.log(err);
        return res.json(data);
    })
});

app.post('/library', (req, res) => {
    const token = req.body.token;
    const decoded = jwt.verify(token, 'SecretKey').username;

    const info = '';
    const q = [
        "SELECT * FROM Flowtrack Where Author=?",
        "SELECT * FROM Flowtrack_services"
    ];
    const values = [decoded];
    db.query(q.join(';'), [values], (err, data) => {
        if (err) return console.log(err);
        return res.json(data);
    })
});

app.post('/header', (req, res) => {
    const token = req.body.token;
    if (!token) return res.json({token:'no token'})
    const decoded = jwt.verify(token, 'SecretKey').username;
    const q = "SELECT username, photo FROM Flowtrack_users Where username=?"
    const values = [decoded];
    db.query(q, [values], (err, data) => {
        if (err) return console.log(err);
        // data = JSON.parse(JSON.stringify(data));
        return res.json(data);
    });
});


app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const q = "DELETE FROM Flowtrack Where ID = ?"
    db.query(q, [id], (err, data) => {
        if (err) return console.log(err);
        return res.json("delete success");
    })
})

app.post('/updateget/:id', (req, res) => {
    let id = '';
    if (req.params.id.length !== 9)
        id = req.params.id
    else {
        const q = "SELECT Name FROM Flowtrack_services";
        db.query(q, (err, data) => {
            if (err) return console.log(err);
            return res.json(data);
        })
    }
    if (id != '') {
        const q = "SELECT * FROM Flowtrack Where `ID`=?"
        const value = [id]
        db.query(q, [value], (err, data) => {
            if (err) return console.log(err);
            return res.json(data);
        })
    }
});

app.put('/update/:id', (req, res) => {
    let id = '';
    if (req.params.id != '')
        id = req.params.id
    else
        return res.json('error');
    if (req.body.service != '') {
        const q = "UPDATE Flowtrack SET Service=? Where `ID`=?"
        const value = [
            req.body.service.trim()
        ]
        db.query(q, [...value, id], (err, data) => {
            if (err) return console.log(err);
        })
    }
    if (req.body.desc != '') {
        const q = "UPDATE Flowtrack SET Description=? Where `ID`=?"
        const value = [
            req.body.desc.trim()
        ]
        db.query(q, [...value, id], (err, data) => {
            if (err) return console.log(err);
        })
    }
    if (req.body.price != '') {
        const q = "UPDATE Flowtrack SET Price=? Where `ID`=?"
        const value = [
            req.body.price.trim()
        ]
        db.query(q, [...value, id], (err, data) => {
            if (err) return console.log(err);
        })
    }
    return res.json('success');
});

app.post('/login', (req, res) => {
    if (req.body.username.trim() == '') return console.log(err);
    const q = "SELECT password FROM Flowtrack_users Where username=?"
    const values = [
        req.body.username
    ];
    db.query(q, [values], (err, data) => {
        if (err) return console.log({ success: false, message: err });
        data = JSON.parse(JSON.stringify(data));
        if (data.length == 0) return res.json({ success: false, message: 'invalid login' })
        if (data[0].password === req.body.password) {
            const token = jwt.sign({ username: req.body.username }, 'SecretKey');
            return res.json({ success: true, token: token });
        }
        else
            return res.json({ success: false, message: 'invalid password' });
    })
});

app.post('/register', (req, res) => {
    if (req.body.username.trim() == '') return console.log(err);
    const q = "INSERT INTO Flowtrack_users (`username`, `password`, `photo`) VALUES (?)"
    const values = [
        req.body.username,
        req.body.password,
        req.body.photo
    ];
    db.query(q, [values], (err, data) => {
        if (err) return console.log(err);
        return res.json(data);
    })
});

app.post('/addsub', (req, res) => {
    const token = req.body.author;
    if (!token) return res.json({token:'no token'})
    const decoded = jwt.verify(token, 'SecretKey').username;
    const q = "INSERT INTO Flowtrack (`Author`, `Service`) VALUES (?)"
    const values = [
        decoded,
        req.body.sub
    ];
    db.query(q, [values], (err, data) => {
        if (err) return console.log(err);
        return res.json(data);
    })
});

app.listen(8800, () => { });