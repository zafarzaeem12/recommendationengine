const express = require('express');
const cors = require('cors');
const databaseConn = require('./Database/databaseConn');
const app = express();


const users = require('./Route/User')

require("dotenv/config");
app.use(express.json());
app.use(cors());
databaseConn();


app.use( "/api/user" , users);

app.get('/' , (req,res) => {
    res.send("iam just testing around herou server only")
})

const port = process.env.SERVER_PORT
app.listen( port , ()=>{
    console.log(`Server is running on ${port}`)
} )