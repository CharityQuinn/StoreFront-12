// Require sql
var mysql = require("mysql");

// Require Inquirer
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Establish port 3306
  port: 3306,

  // Username
  user: "root",

  // Password
  password: "Root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  askUser();
});

function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
}

// The first should ask them the ID of the product they would like to buy.
//* The second message should ask how many units of the product they would like to buy.
function askUser() {
  inquirer
  .prompt({
    name: "action",
    type: "list",
    message: "What would you like to buy from our Store?",
    choices: [
      "Mops",
      "Shoes",
      "Socks",
      "Umbrella",
      "Hats",
      "Water Bottles",
      "Lunch-Box",
      "Televisions",
      "Laundry-Basket",
      "Vitamins",
      "exit"

    ]
  })
  .then(function(answer) {
    switch(answer.action) {
      case "Products":
      products();
      break;

      case "Departments":
      departments();
      break;

      case "price":
      price();
      break;

      case "quantity":
      quantity();
      break;
    }
  })

}


function products () {

}

function departments () {

}

function price () {

}

function quantity () {

}