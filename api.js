const client = require('./connection.js')
const express = require('express')
const app = express();

app.listen(3300, () => {
    console.log('Server is now listening at port 3300')
});

client.connect();

app.get('/users', (req, res) => {
    client.query(`SELECT * FROM users`, (err, result) => {
        if (!err) {
            console.log(1414, result)
            res.send(result.rows);
        }
    })
    client.end;
})

// get a user by id
app.get('/users/:id', (req, res) => {
    client.query(`SELECT * FROM users WHERE id=${req.params.id}`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    })
    client.end;
})

//add a body parser to convert json to javascript object
const bodyParser = require('body-parser');
app.use(bodyParser.json())

// add a new user
app.post('/users', (req, res) => {
    const user = req.body;
    let insertQuery = `INSERT INTO users(id, firstname, lastname, location)
        values(${user.id}, '${user.firstname}', '${user.lastname}', '${user.location}' )`;
    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send('Insertion was successful')
        }
        else { console.log(err.message) }
    })
    client.end;
})

//update a user
app.put('/users/:id', (req, res) => {
    let user = req.body;
    let updateQuery = `
        update users
        set firstname = '${user.firstname}',
        lastname = '${user.lastname}',
        location = '${user.location}'
        where id = ${user.id}
        `
    client.query(updateQuery, (err, result) => {
        if (!err) {
            res.send('Update was successful')
        }
        else {
            console.log(err.message)
        }
    })
    client.end;
})

//delete a user
app.delete('/users/:id', (req, res) => {
    let insertQuery = `delete from users where id=${req.params.id}`;

    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send('Deletion was successful')
        }
        else {
            console.log(err.message)
        }
    })
})

