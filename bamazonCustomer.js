// Require sql, inquirer, console.table
var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require('console.table');
require("dotenv").config();

// variable storing password from .env
const localDBPW = process.env.MYSQL_PW;

var connection = mysql.createConnection({
  host: "localhost",
  // Establish port 3306
  port: 3306,
  // Username
  user: "root",
  // Password
  password: "localDBPW",
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
    for (var x in res){
      console.log([
        res[x].item_id, res[x].product_name, res[x].price]);
    };
    askUser(prodArr);
    connection.end();
  });
};


  
// The first should ask them the ID of the product they would like to buy.
//* The second message should ask how many units of the product they would like to buy.
function askUser(prodArr) {
for(var x in prodArr) {
  console.log([
    prodArr[x].item_id, result[x].product_name, result[x].price]);
};

  inquirer
    .prompt([{
        name: "action",
        type: "list",
        message: "What would you like to buy from our Store?",
        choices: [],
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
          const userProdName = answer.action;
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
//const userProdName = answer.action;
//console.log("The user picked " + userProdName);

function products() {

  const queryString = ("SELECT * FROM products", function (err, result) {
    if (err) throw (err);
    console.log("Made it into products fxn, this is queryString " + queryString);
    for (var x in result) {
      console.log([
        result[x].item_id, result[x].product_name, result[x].price
      ]);
    };

    connection.end();
  });
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
            product_name: userProdName
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