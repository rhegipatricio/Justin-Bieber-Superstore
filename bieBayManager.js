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
				inventorySale();
				break;

			case 'View Low Inventory':
				lowStock();
				break;

			case 'Add to Inventory';
				addInventory();
				break;

			case 'Add New Product':
				addProduct();
				break;
		}
	})

	function inventorySale () {
		connection.query('SELECT `item_id`, `product_name`, `department_name`, `price`, `stock_quantity` FROM `products`', function (err, data) {
			if (err) throw err;

			for (var i = 0; i < data.length; i++) {
				console.log('ID', data[i].item_id + '  Product', data[i].product_name + ' Stock',data[i].stock_quantity)
			}
		})
	}

	function lowStock () {
		connection.query('SELECT `item_id`, `product_name`, `department_name`, `price`, `stock_quantity` FROM `products` WHERE `stock_quantity` < 15', function (err, data) {
			if (err) throw err;

			for (var i = 0; i < data.length; i++) {
				console.log('Product: ', data[i].product_name + ' Stock left: ', data[i].stock_quantity);
			}
		})
	}

	function addInventory () {
		connection.query('SELECT `item_id`, `product_name`, `department_name`, `price`, `')		
			}
		})
	}

	function addProduct () {
		inquirer.prompt ([
			{
				type: 'input',
				message: 'Product to add: ',
				name: 'productName'
			}, {
				type: 'input',
				message: 'Department: ',
				name: 'departmentName'
			}, {
				type: 'input',
				message: 'Price: $ ',
				name: 'price'
			}, {
				type: 'input',
				message: 'Stock Quantity: ',
				name: 'stockQuantity'
			}, {
				type: 'input',
				message: 'Autograph (choice 0 or 1, 0 for no and 1 for yes) ',
				name: 'autographed'
			}
		]).then(function (res) {
			connection.query("INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`, `autographed`) VALUES (?,?,?,?,?)", [res.productName, res.departmentName, res.price, res.stockQuantity, res.autographed], function(err, data) {

				if (err) throw err;
				console.log("New product aded to inventory in Products database");
			})
		})

	}