function purchaseProduct(id, quantity){
  var query = connection.query("SELECT * from products WHERE ?", {item_id: id}, 
    function(err, res) {
      if (err) throw err;

      if(res.length === 0){
        console.log(colors.red.bold("\nThere is no item with id", id, "exists in bamazon!\n"));
        return listAllProducts();
      }
      
      var stockQuantity = parseInt(res[0].stock_quantity);
      var productName = res[0].product_name;
      var unitPrice = parseFloat(res[0].price);
      var productSales = parseInt(res[0].product_sales);

      var purchaseQuantity = parseInt(quantity);

      if(stockQuantity < purchaseQuantity){
        console.log(colors.red.bold("\nInsufficient Quantity!\n"));
        return listAllProducts();
      } 

      query = connection.query("UPDATE products SET ? WHERE ?", 
        [
        {
          stock_quantity: stockQuantity - purchaseQuantity,
          product_sales: productSales + purchaseQuantity
        }, 
        {
          item_id: id
        }
        ], 
        function(err, res){
          if (err) throw err;

          console.log("\nYou have purchased", purchaseQuantity, productName + "'s.", 
            "Total cost:$", unitPrice * purchaseQuantity, "\n");
          listAllProducts();
        });
    });
}



Collapse 