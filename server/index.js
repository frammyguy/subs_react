import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
    host: 'mysql.apexhosting.gdn',
    user: 'apexMC1473088',
    password: 'H#pXkkgG8SbaexeB6azGXMlm',
    database: 'apexMC1473088',
    multipleStatements: true
});

app.use(express.json());
app.use(cors());

app.post('/add', (req, res)=>{
    const q = "INSERT INTO Flowtrack (`Author`, `Service`, `Description`, `Price`) VALUES (?)"
    const values = [
        req.body.author,
        req.body.service,
        req.body.desc,
        req.body.price,
    ];
    db.query(q, [values], (err, data)=>{
        if (err)  return console.log(err);
        return res.json(data);
    })
})

app.get('/', (req, res)=>{
    const q = "SELECT * FROM Flowtrack_services";
    db.query(q, (err, data)=>{
        if (err) return console.log(err);
        return res.json(data);
    })
});

app.get('/library', (req, res)=>{
    const info = '';
    const q = [
        "SELECT * FROM Flowtrack",
        "SELECT * FROM Flowtrack_services"
    ];
    db.query(q.join(';'), (err, data)=>{
        if (err) return console.log(err);
        return res.json(data);
    })
});

app.delete('/library/:id', (req, res)=>{
    const id = req.params.id;
    const q = "DELETE FROM Flowtrack Where ID = ?"
    db.query(q, [id], (err, data)=>{
        if (err)  return console.log(err);
        return res.json("delete success");
    })
})

app.put('/library/:id', (req, res)=>{
    const id = req.params.id;
    const q = "UPDATE Flowtrack SET `Author`=?,`Service`=?,`Description`=?,`Price`=? Where `ID`=?"
    const values = [
        req.body.author,
        req.body.service,
        req.body.desc,
        req.body.price,
    ]
    db.query(q, [...values, id], (err, data)=>{
        if (err)  return console.log(err);
        return res.json("update success");
    })
})

app.listen(8800, ()=>{
});