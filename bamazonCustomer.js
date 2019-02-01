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

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");

});


// Establish an array to hold the incoming results from the db
let prodArr = [];
const queryString = connection.query("SELECT * FROM products", function (err, res) {
  if (err) throw (err);
  prodArr = res;
  console.log("Available products\n");
  for (var x = 0; x < res.length; x++) {
    console.log([
      res[x].item_id, res[x].product_name, res[x].price
    ]);

  }

  startFunction(prodArr);
});

function startFunction() {
  inquirer
    .prompt({
      name: "questionOne",
      type: "list",
      message: "Do you want to buy something?",
      choices: ["Yes", "No"]
    })
    .then(function (answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.questionOne === "Yes") {
        console.log("User picked Yes, moving to askUser");
        askUser(prodArr);
      } else if (answer.questionOne === "No") {
        console.log("Okay Bye")
        connection.end();
      }
    });
}


// The first should ask them the ID of the product they would like to buy.
//* The second message should ask how many units of the product they would like to buy.
function askUser() {
  inquirer
    .prompt([{
        name: "input1",
        type: "rawlist",
        message: "Please enter the number at the left of the product you would like."
      },
      {
        name: "howMany",
        type: "input2",
        message: "How many of the units would you like to buy?",
        validate: function (input2) {
          if (input2 < 11 || input2 > 20) {
            console.log("Please enter a number between 11 and 20!");
           startFunction();
          }
          return !isNaN(input2);
        },
       
        filter: function (input2) {
          const userQuantity = parseInt(input2);
          console.log(userQuantity);
          return userQuantity;
        }
      }
    ])
    .then(function (input1, userQuantity) {
      // get the information of the chosen item
      var chosenItem;
      for (var i = 0; i < prodArr.length; i++) {
        if (prodArr[i].item_id === input1) {
          chosenItem = prodArr[i];
          quantity(chosenItem, userQuantity);
        }
      }
    })
}




//const userId = answer.action;
//console.log("The user picked " + userId);

function products() {
  for (var x = 0; x < prodArr.length; x++) {
    console.log([
      prodArr[x].item_id, prodArr[x].product_name, prodArr[x].price
    ]);
  };

};



function price() {
  var goodSale = parseInt(prodArr.price) * parseInt(userQuantity);

  console.log("Thank you for your purchase.  You owe us " + goodSale)
  startFunction();
};

function quantity(userQuantity,chosenItem) {

  for (var i = 0; i < prodArr.length; i++) {
    if (prodArr[i].item_id === chosenItem) {
      if (prodArr.stock_quantity <= userQuantity) {
        // If a matching product is found, deplete stock and send to price
        prodArr.stock_quantity = parseInt(prodArr.stock_quantity) - parseInt(userQuantity);
        price(userQuantity, prodArr.price)
        connection.query(
          "UPDATE products SET ? WHERE ?",
          [{
              item_id: chosenItem
            },
            {
              stock_quantity: stock_quantity
            },
            console.log("New Quantity placed successfully!")
          ])

      }
    }

  }
}