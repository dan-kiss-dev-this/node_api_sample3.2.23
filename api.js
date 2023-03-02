const client = require('./connection.js')
const express = require('express')
// body parser
const bodyParser = require("body-parser")
const app = express();

app.listen(3300, ()=>{
    console.log("Server is now listening at port 3300")
})

app.use(bodyParser.json())

app.get("/users", (req, res)=>{
    client.query(`SELECT * from users`, (err, result)=>{
        if(!err){
            res.send(result.rows)
        }
        else {
            console.log(1919,'something went wrong')
        }
    })
    client.end
})


client.connect();