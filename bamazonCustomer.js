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
    //Show all products//
    let afterConnection = function() {
        connection.query("SELECT ID, Name_of_Product, Department_Name, Price, Stock_Quantity FROM products", function (err, res) {
            if (err) throw err;
            console.table(res);
            //console.log("------------------------------------------------------")
            //});
            userQuestion();

            // Prompt Questions for users //
            function userQuestion() {
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
                        if (inquirerRes.ID <= 100) {
                            //Show the item after user input id//
                            connection.query("SELECT ID, Name_of_Product, Department_Name, Price, Stock_Quantity FROM products where ID = " + inquirerRes.ID, function (err, res) {
                                if (err) throw err;
                                if (res.length <= 0) {
                                    console.log("Sorry! This product ID not found, Please re-enter!")
                                    console.log("---------------------------------------------------------")
                                    userQuestion();
                                } else {
                                
                                    console.table(res);
                                    // console.log("------------------------------------------------------")
                                    //When user input quantity over the stock quanitity//


                                    let data = res[0].Stock_Quantity;
                                    let unit = inquirerRes.number
                                    if (unit > data) {
                                        console.log("Sorry! This item is out of stock!")
                                        /*console.log("------------------------------------------------------")*/
                                        console.log("Exit")
                                        process.exit();
                                        /*If suffcicent stock is valid, ask user to confirm*/
                                    } else {

                                        /* before update the quantity, display the details before confirmation for update */
                                        connection.query("SELECT ID, Name_of_Product, Price FROM products where ID =" + inquirerRes.ID, function (err, res) {
                                            if (err) throw err;
                                            //Price multiplied by the quantity then store in product sale column//
                                            let price = res[0].Price * unit
                                            connection.query("UPDATE products SET Product_Sales = '" + price + "' WHERE ID =" + inquirerRes.ID, function (err, res) {
                                                if (err) throw err;
                                 
                                                console.log("Total buying unit: " + unit)
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
                                                                    console.log("Product Sales Updated");
                                                                    console.log("Exit")
                                                                    process.exit();
                                                                }
                                                
                                                            );
                                                        
                                                            //connection.end();
                                                            //end update product//
                                                        } else {
                                                     
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
                                
                                        });
                        
                                    }
                    
                                    console.log("------------------------------------------------------");
                                }
                            })
                        }
                        
            /*
                        else if (inquirerRes.ID === null) {
                            console.log("Sorry! No this product ID number!")
                            userQuestion();
                        }
                        else {
                            console.log("Error! Please input the product ID.")
                            userQuestion();
                        }*/
                    });
    
            };

        })
}
