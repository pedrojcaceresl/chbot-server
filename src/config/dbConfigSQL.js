const { Sequelize } = require('sequelize');


const sequelize = new Sequelize({
	dialect: "postgres",
	username: "postgres",
	password: "admin",
	database: "chatbot",
	host: "localhost",
    port: 5434,  
});


module.exports = sequelize;
