const mongoose = require('mongoose');

const databaseConn = () => {
 
    const mongodb = process.env.MONGO_DB_URL;
    mongoose.connect(mongodb)
    .then(() => {
        console.log("Database Connected Lived")
    }).catch((err) => {
        console.log("Database Not Connected")
    })
}

module.exports = databaseConn
