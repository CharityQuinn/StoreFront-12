// Require sql, inquirer, console.table
var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  // Establish port 3306
  port: 3306,
  // Username
  user: "root",
  // Password
  password: "password",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  askUser();
});

var prodArr = [];
const queryString = connection.query("SELECT products.product_name FROM products", function (err, res) {
  prodArr = res;
  console.log("This is the prodArr " + prodArr);
  // if (err) throw err;
  // console.log(res);
  //  for (i = 0; i < queryString.length; i++) {
  //   prodArr = queryString.product_name[i];
  //    prodArr = push(prodArr[i]);
  //   console.log(prodArr);
  // }
  connection.end();
});


// The first should ask them the ID of the product they would like to buy.
//* The second message should ask how many units of the product they would like to buy.
function askUser() {
  inquirer
    .prompt([{
      name: "action",
      type: "list",
      message: "What would you like to buy from our Store?",
      choices: ['Dr. Martens shoes', 'Wannamaker hats', 'Bezos Umbrellas', 'Dr. Martens Socks', 'Lifefactory Water Bottles', 'Lifefactory Lunch Boxes', 'TSL Televisions', 'Lifefactory Laundry Basket', 'Unicare Vitamins'
    ]
    }, {
      name: "howMany",
      type: "input",
      message: "How many of the units would you like to buy?",
      validate: function (input) {
        return !isNAN(input);
      },
      filter: function (input) {
        return parseInt(input);
      }
    }
    
  ]).then(({action, howMany}) => {
      switch (answer.action) {
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


function products() {
  const queryString = database.query("SELECT products.product_name FROM products WHERE products.product_name.contains({action})")

}

function departments() {

}

function price() {

}

function quantity() {

}