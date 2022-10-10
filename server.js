const express = require('express');
const cors = require('cors');
const databaseConn = require('./Database/databaseConn');
const app = express();


const users = require('./Route/User')
const program = require('./Route/Program')
const subprogram = require('./Route/Subprogram')
const search = require('./Route/Search');

require("dotenv/config");
app.use(express.json());
app.use(cors());
databaseConn();


app.use( "/api/user" , users);
app.use("/api/program" , program);
app.use("/api/subprogram" , subprogram);
app.use("/api/search" , search)

const port = process.env.SERVER_PORT
app.listen( port , ()=>{
    console.log(`Server is running on ${port}`)
} )