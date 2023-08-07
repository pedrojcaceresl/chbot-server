
const mongoose = require("mongoose");
const { MONGO_URI, DB_NAME } = require("./index");

const dbConnection = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            dbName: DB_NAME
        });
        console.log("DB connected succesfully");
    } catch (error) {
        console.log("Could not connect to database, retrying... ");
    }
}

module.exports = dbConnection;