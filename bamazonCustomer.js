// Require sql, inquirer, console.table
var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require('console.table');

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

var userProdName;

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

var prodArr = [];
const queryString = connection.query("SELECT * FROM products", function (err, res) {
  prodArr = res;
  console.table((prodArr));

  askUser();
 
});



// The first should ask them the ID of the product they would like to buy.
//* The second message should ask how many units of the product they would like to buy.
function askUser() {
  inquirer
    .prompt([{
        name: "action",
        type: "list",
        message: "What would you like to buy from our Store?",
        choices: ['Aunt Mabels Mops', 'Dr. Martens shoes', 'Wannamaker hats', 'Bezos Umbrellas', 'Dr. Martens Socks', 'Lifefactory Water Bottles', 'Lifefactory Lunch Boxes', 'TSL Televisions', 'Lifefactory Laundry Basket', 'Unicare Vitamins'],
           
      },
      {
        // Ask user how many of the product they would like to buy
        name: "howMany",
        type: "input",
        message: "How many of the units would you like to buy?",
        validate: function (input) {
          return !isNaN(input);
        }
       
      }
    ]) // process the user choices
    .then(function(answer) {
      // set up variable to hold the user choices
      const item = answer.action;
      const amount = parseInt(answer.howMany);
      // query the db for the necessary info about the product the user chose 
      const queryDB = "SELECT * FROM products WHERE product_name = ?";
      connection.query(queryDB, item, function (err, results) {
        // set up variables for the user's choice, the stock quantity and price of the product
        const dbAmount = parseInt(results[0].stock_quantity);
        const dbPrice = parseInt(results[0].price);
        console.log("amount",amount);
        console.log("item",item);
        console.log("dbAmount",dbAmount);

        if(err) throw err;
        // Validate if there is enough product in stock to fulfill the user's order
        if (amount <= dbAmount && amount > 0) {
         // set variables for the new stock quantity and price for the user
          const newDbAmount = dbAmount - amount;
          const userPrice = dbPrice * amount;
          // update the db with the new stock quantity
          const updateDB = "UPDATE products SET stock_quantity = ? WHERE product_name = ?";
          
          connection.query(updateDB, [newDbAmount, item], function (err, results) {
            // Let the user know we like them and they owe money
            console.log(`Thank you for purchasing ${amount} ${item}.  You owe us around, (this number is rounded) $${userPrice}! Come again soon!`);
            connection.end();
          });
        } else {
          console.log("\r\n Sorry, we do not have that amount.  Please try again. \r\n");
          askUser();
        }
      })
    })

}
