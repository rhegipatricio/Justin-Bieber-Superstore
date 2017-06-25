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

	console.log('     ADMIN LOGIN\n');
	initialPrompt();

	function initialPrompt () {
		connection.query('SELECT `item_id`, `product_name`, `price` FROM `products`', function (err, data) {
			if (err) throw err;
			for (var i = 0; i < data.length; i++) {
				itemList.push(data[i]);
				console.log('id', itemsList[i].items_id + ':', itemsList[i].product_name, '$' + itemList[i].price);
			}
			inquirer.prompt([

	}