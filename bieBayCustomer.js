var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root"
	database: "bieBay"
});

connection.connect(function(err) {
	if (err) throw err;
	console.log('');
	console.log("Bieber says What's Good?!\nProducts on Sale: ");
	console.log('');
	viewItems()
});