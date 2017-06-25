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
	console.log('');
	console.log("Bieber says What's Good?! Thank you for always Beliebing!\nCheck out my products on sale: ");
	console.log('');
	viewItems();
	function viewItems() {
		connection.query("SELECT `item_id`, `product_name`, `price` FROM `products`", function(err, data) {
			if (err) throw err;
			for (var i = 0; i < data.length; i++) {
				itemList.push(data[i]);
				console.log("id", itemList[i].item_id + ":", itemList[i].product_name, "$" + itemList[i].price);
		}
		inquirer.prompt([
			{
				type: 'input',
				message: 'What product would you want today? (choose by item id number)',
				name: 'itemChoice'
			}
		]).then(function (response) {
			idChosen = response.itemChoice;
			connection.query("SELECT `item_id`, `product_name`, `price`, `stock_quantity` FROM `products` WHERE `item_id` = ?", [idChosen], function(err, data) {
					if (idChosen > itemList.length) {
						console.log('\nID invalid. Please enter one from list\n');
						initialPromopt()
					}
					else {
						console.log("You have chosen product", data[0].product_name, "for $" + data[0].price);
						checkAmount();
						// console.log()
						// console.log(response.itemChoice)
					}

				
				function checkAmount () {
					inquirer.prompt ([
						{
							type: 'input',
							message: 'What is the number of ' + data[0].product_name + '\'s you want to buy?',
							name: 'quantity'
						}
					]).then(function (response) {
						quantityChosen = response.quantity;
						 if (data[0].stock_quantity > quantityChosen) {
						 	total = data[0].price * quantityChosen;
						 	changeStock = data[0].stock_quantity - quantityChosen;

						 	console.log("Your amount due is: $" + total + (". Thank you and come again!"));
						 	connection.query("UPDATE `products` SET `stock_quantity` = ?  WHERE `item_id` = ?", [changeStock, idChosen])
						 }
						 else {
						 	console.log("Unable to complete. We do not have the sufficient inventory for your quantity request. Biebs says My Bad and to choose again");
						 	console.log("There are", data[0].stock_quantity, "in stock");
						 	console.log("Please choose a different quantity");
						 	checkAmount();
						 }
					}) 
				}
			})
		})
	})
	}
})
