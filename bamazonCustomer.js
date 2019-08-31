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

    console.log("Connected as id" + connection.threadID);
    afterConnection();

});
// Show all the table products//
function afterConnection() {
    
   connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
       userQuestion();
    })
    
        // Prompt Questions for users //
        let userQuestion = function () {
            inquirer.prompt([
                {
                    type: "input",
                    message: "Please input the product's ID.",
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
                        connection.query("SELECT * FROM products where id =" + inquirerRes.ID, function (err, res) {
                            if (err) throw err;
                            console.log(res);
                            connection.end();
                        })
                        console.log("Thank you!");
                     }
                    
                    else if (inquirerRes.ID > 10) {
                        console.log("Sorry! No this product ID number!")
                        userQuestion();
                    }
                    else  {
                        console.log("Error! Please input the product ID.")    
                        userQuestion();
                        }
                       
                    });
            };
                    
                
};

        // Check stock quantity //
let checkStock = function (inquirerRes) {
    connection.query("SELECT * FROM products where Stock_Quantity", function (err, res) {
        if (res) {
            Stock_Quantity <= 0
            inquirerRes()
            console.log("Sorry! This item is out of stock!")
        if (err) throw err;
        //console.log(res);
        connection.end();
                    
        };
                
        checkStock() 
    });
    
};
        
    

