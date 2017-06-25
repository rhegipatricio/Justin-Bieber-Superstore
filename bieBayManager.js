var mysql = require("mysql");
var inquirer = require("inquirer");

var itemList = [];
var idChosen;
var quantityChosen;
var total;
var changeStock;

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "biebay"
})

connection.connect(function(err) {
	if (err) throw err;

	console.log('ADMIN LOGIN');
	

	inquirer.prompt ([
		{
			type: 'list',
			message: 'Choose a selection',
			name: 'adminChoice',
			choices: ["View products for sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
		}
	]).then (function (res) {
		switch (res.adminChoice) {
			case 'View prodcuts for sale':
				inventorySee();
				break;

			case 'View Low Inventory':
				lowStock();
				break;

			case 'Add to Inventory';

				break;

			case 'Add New Product':

				break;
		}
	})