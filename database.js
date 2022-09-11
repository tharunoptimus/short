const mongoose = require('mongoose');
const MongoURI = process.env.MONGODB_URI
class Database {
    constructor() {
        this.connect();
    }
    connect() {
        mongoose.connect(MongoURI)
        .then(() => { console.log("Database Connection Successful!") })
        .catch((err) => { console.log("Unable to connect to the Database. Error: ", err) })
    }
}

module.exports = new Database();