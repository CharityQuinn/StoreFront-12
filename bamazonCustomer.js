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
const queryString = connection.query("SELECT * FROM products", function (err, res) {
  prodArr = res;
  //console.log(prodArr);


  connection.end();
});

const userProdName = "";

// The first should ask them the ID of the product they would like to buy.
//* The second message should ask how many units of the product they would like to buy.
function askUser() {
  inquirer
    .prompt([{
      name: "action",
      type: "list",
      message: "What would you like to buy from our Store?",
      choices: ['Dr. Martens shoes', 'Wannamaker hats', 'Bezos Umbrellas', 'Dr. Martens Socks', 'Lifefactory Water Bottles', 'Lifefactory Lunch Boxes', 'TSL Televisions', 'Lifefactory Laundry Basket', 'Unicare Vitamins'],
      userProdName = (this)
    }, {
      name: "howMany",
      type: "input",
      message: "How many of the units would you like to buy?",
      validate: function (input) {
        return !isNaN(input);
      },
      filter: function (input) {
        quantity(input);
        const userQuantity = parseInt(input);
        return userQuantity;
      }
    }]).then((userProdName,userQuantity) => {
      switch ({userProdName}) {
        case "product_name":
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


  function products() {
    const queryString = database.query("SELECT products.product_name FROM products WHERE products.product_name.contains(userProdName)")
    console.log("Made it into products fxn, this is queryString " + queryString);
  }

  function departments() {

  }

  function price() {
    var goodSale = parseInt(prodArr.price) * parseInt(userQuantity);
    console.log(goodSale);
  }

  function quantity(prodArr) {

    for (var i = 0; i < prodArr.length; i++) {
      if (prodArr[i].stock_quantity > ({
          userProdName
        })) {
        // If a matching product is found, return the product
        price(prodArr.price);
        return prodArr[i];

      }
    }
 } 
