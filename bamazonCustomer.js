// Require sql, inquirer, console.table
var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require('console.table');
require("dotenv").config();

// variable storing password from .env
const MYSQL_PW = process.env.MYSQL_PW;

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
  startFunction();
});


// Establish an array to hold the incoming results from the db
var prodArr = [];

function startFunction() {
  const queryString = connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw (err);
    prodArr = res;
    console.log("Available products\n");
    for (var x = 0; x < res.length; x++) {
      console.log([
        res[x].item_id, res[x].product_name, res[x].price
      ]);
    };
    askUser(prodArr);
    connection.end();
  });
};



// The first should ask them the ID of the product they would like to buy.
//* The second message should ask how many units of the product they would like to buy.
function askUser(prodArr) {
    inquirer
    .prompt([{
      name: "choice",
      type: "rawlist",
      choices: function () {
        var choiceArray = [];
        for (var i = 0; i < prodArr.length; i++) {
          choiceArray.push(prodArr[i].item_id);
        }
        return choiceArray;
      },
      message: "What would you like to buy?"
    },
     {
       name: "howMany",
       type: "input",
       message: "How many of the units would you like to buy?",
       validate: function (input) {
         return !isNaN(input);
       },
       filter: function (input) {
        const userQuantity = parseInt(input);
        console.log(userQuantity);
        return userQuantity;
        }
      }
    ])
    .then(function (answer) {
      switch (answer.action) {
        case "product_name":
          const userId = answer.action;
          products();
          break;

        case "department_name":
          departments();
          break;

        case "price":
          price();
          break;

        case "stock_quantity":
          quantity();
          break;


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

};

function quantity(userQuantity, prodArr) {

  for (var i = 0; i < prodArr.length; i++) {
    if (prodArr[i].stock_quantity <= userQuantity) {
      // If a matching product is found, deplete stock and send to price
      price(prodArr.item_id, prodArr.price);

      prodArr.stock_quantity = parseInt(prodArr.stock_quantity) - parseInt(userQuantity);
      price(userQuantity, prodArr.price)
      connection.query(
        "UPDATE products SET ? WHERE ?",
        [{
            item_id: userId
          },
          {
            stock_quantity: userQuantity
          },
          console.log("New Quantity placed successfully!")

        ],
        function (error) {
          if (error) throw err;
          console.log("Insufficient quantity!");

        }

      );
    }
  }


}