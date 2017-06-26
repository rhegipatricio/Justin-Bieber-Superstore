var mysql = require("mysql");
var inquirer = require("inquirer");
var listInventory = [];
//connects to my created biebay database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "biebay"
});
connection.connect(function(err) {
    if (err) throw err;
    console.log('Manager login');
    inquirer.prompt([
        {
            type: 'list',
            message: 'Choose a selection',
            name: 'adminChoice',
            choices: ["View Current Products", "View Low Inventory", "Add Items to Inventory", "Add New Product"]
        }
    ]).then(function (res) {
        switch (res.adminChoice) {
            case 'View Current Products':
                inventorySale();
                break;
            case 'View Low Inventory':
                lowStock();
                break;
            case 'Add Items to Inventory':
                addInventory();
                break;
            case 'Add New Product':
                addProduct();
                break;
        }
    });
    function inventorySale() {
        connection.query('SELECT `item_id`, `product_name`, `department_name`, `price`, `stock_quantity` FROM `products`', function (err, data) {
            if (err) throw err;

            console.log('\nStock Availability');
            for (var i = 0; i < data.length; i++) {
                console.log('ID', data[i].item_id + ' *' + data[i].product_name + ' Stock', data[i].stock_quantity)
            }
        })
    }
    function lowStock() {
        connection.query('SELECT `item_id`, `product_name`, `department_name`, `price`, `stock_quantity` FROM `products` WHERE `stock_quantity` < 15', function (err, data) {
            if (err) throw err;
            for (var i = 0; i < data.length; i++) {
                console.log('Product: ', data[i].product_name + ' Stock remaining: ', data[i].stock_quantity);
            }
        })
    }
    function addInventory() {
        connection.query('SELECT `product_name` FROM `products`', function (err, data) {
            if (err) throw err;
            for (var i = 0; i < data.length; i++) {
                listInventory.push(data[i].product_name)
            }
            inquirer.promopt([
                {
                    type: 'list',
                    message: 'Choose a product item',
                    name: 'productChoice',
                    choices: listInventory
                }, {
                    type: 'input',
                    message: 'Add to product stock: ',
                    name: 'stockQuantity'
                }
            ]).then(function (res) {
                connection.query('UPDATE `products` SET `stock_quantity` = ? WHERE `product_name` = ?', [res.stockQuantity, res.productChoice], function (err, data) {
                    if (err) throw err;
                    console.log('Stock updated for ' + res.productChoice);
                })
            })
        })
    }
    function addProduct() {
        inquirer.prompt([
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
                message: 'Autograph (choice 0 or 1, 0 for Yes and 1 for No) ',
                name: 'autograph'
            }
        ]).then(function (res) {
            connection.query("INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`, `autograph`) VALUES (?,?,?,?,?)", [res.productName, res.departmentName, res.price, res.stockQuantity, res.autograph], function (err, data) {
                if (err) throw err;
                console.log("New product aded to inventory in Products database");
            })
        })
    }
});