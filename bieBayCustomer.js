var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "biebay"
});

connection.connect(function(err) {
	if (err) throw err;
	console.log('');
	console.log("Bieber says What's Good?!\nProducts on Sale: ");
	console.log('');
	viewItems()
});

function viewItems() {
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		for (var i = 0; i < res.length; i++) {
		console.log(res[i].item_id + '.' + res[i].product_name + '  |  Price: ' + res[i].price);
		}
		console.log('')
		question1()
	});
}

function question1() {
	inquirer.prompt([
		{
			type: 'input',
			message: 'What product would you want today?',
			name: 'userInput'
		}
	]).then(function (answer) {
		connection.query("SELECT * FROM products", function (err,res) {
			for (var i = 0; i < res.length; i++) {
				if (answer.userInput === JSON.stringify(res[i].items_id)) {
					console.log('product');
				}
			}
			question2()
		})
	})
}

function question2() {
	inquirer.prompt ([
		{
			type: 'input',
			message: "Quantity?",
			name: 'userInput'
		}
	]).then(function (answer) {
		connection.query("SELECT * FROM products", function (err,res){
			for (var i = 0; i < res.length; i++)
		{
			if (answer.userInput === JSON.stringify(res[i].stock_quantity)) {
				console.log('Buy')
				}
			}
		});
	});	
}
