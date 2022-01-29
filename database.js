const mongoose = require('mongoose');

class Database {
    constructor() {
        this.connect();
    }
    connect() {
        const mongoose = require("mongoose")
        mongoose.connect("mongodb+srv://username:username@projectname.i8met.mongodb.net/databaseName?retryWrites=true&w=majority")
        .then(() => { console.log("Database Connection Successful!") })
        .catch((err) => { console.log("Unable to connect to the Database. Error: ", err) })
    }
}

module.exports = new Database();