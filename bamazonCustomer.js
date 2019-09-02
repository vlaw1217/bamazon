// Hide my password in .env //
require("dotenv").config();

const mysql = require("mysql");

let inquirer = require("inquirer");

const connection =
    exports.connection = mysql.createConnection({
        host: "localhost",

        port: 3306,

        user: "root",

        password: process.env.password,

        database: "bamazon_db"
    });

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as id" + connection.threadID + "\n");
    afterConnection();

});
// Show all products//
function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
        console.log("------------------------------------------------------")
        userQuestion();
    });

    // Prompt Questions for users //
    let userQuestion = function () {
        inquirer.prompt([
            {
                type: "input",
                message: "Please input the product's ID number.",
                name: "ID"
            },
            {
                type: "input",
                message: "How many unit?",
                name: "number"
            },
        ])
            
            .then(function (inquirerRes) {
                if (inquirerRes.ID <= 10) {
                    //Show the item after user input id//
                    connection.query("SELECT * FROM products where ID = " + inquirerRes.ID, function (err, res) {
                        if (err) throw err;
                        console.log(res);
                        console.log("------------------------------------------------------")
                        //When user input quantity over the stock quanitity//
                        let data = res[0].Stock_Quantity;
                        let unit = inquirerRes.number 
                        if (unit > data) {
                            console.log("Sorry! This item is out of stock!")
                            /*If suffcicent stock is valid, ask user to confirm*/
                        } else {

                            /* before update the quantity, display the details before confirmation for update */
                            connection.query("SELECT ID, Name_of_Product, Price FROM products where ID =" + inquirerRes.ID, function (err, res) {
                                if (err) throw err;
                                //let unit = inquirerRes.number 
                                let price = res[0].Price * unit
                                //console.log(price)
                                console.log(res);
                                console.log("Total unit to buy: " + unit)
                                console.log("Total Price: " + price)
                                console.log("-----------------------------------------------------")
                            /* finish display */

                            /* begin input prompt to confirm update the record */
                            inquirer.prompt([
                                {
                                    type: "list",
                                    message: "Please confirm your purchase.",
                                    name: "confirm",
                                    choices: ['Yes', 'No'],
                                },
                            ])
                                .then(function (answer) {
                                    console.log('Answer:', answer.confirm);
                                    console.log("***Thank you for purchasing, see you next time!***")
                                    console.log("-----------------------------------------------------")
                                   
                                        if (answer.confirm === "Yes") {
                                          
                                                //update quantity if user confirm//
                                                let stockQuantity = data - inquirerRes.number
                                                //set the update query//
                                                let updateQuantity = "UPDATE products SET Stock_Quantity = " + stockQuantity + " WHERE ID = " + inquirerRes.ID;
                                                console.log(updateQuantity)
                                                //start update product//
                                                connection.query(updateQuantity,
                                                    function (err) {
                                                        if (err) throw err;
                                                        console.log("Product updated");
                                                    }
                                                
                                                );
                                           
                                        connection.end();
                                        //end update product//
                                    } else {
                                        //console.log("no")
                                        inquirer.prompt([
                                            {
                                                type: "list",
                                                message: "Do you want to exit or continue?",
                                                name: "confirm",
                                                choices: ['Exit', 'Continue'],
                                            },
                                        ])
                                            .then(function (response) {
                                                if (response.confirm === "Continue") {
                                                    console.log('Response', "response.continue")
                                                    afterConnection();
                                                } else {
                                                    console.log("Exit")
                                                    process.exit();
                                                }
                                            })
                                        
                                    }
                                });
                        });
                                
                                }
                        
                        //connection.end();
                    })
                    console.log("------------------------------------------------------");
                }
            
                else if (inquirerRes.ID > 10) {
                    console.log("Sorry! No this product ID number!")
                    userQuestion();
                }
                else {
                    console.log("Error! Please input the product ID.")
                    userQuestion();
                }
            });
    
    
    };

}

