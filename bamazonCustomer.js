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
                    connection.query("SELECT ID, Stock_Quantity FROM products where ID =" + inquirerRes.ID, function (err, res) {
                        if (err) throw err;
                        //console.log(res);
                        //console.log(res[0].Stock_Quantity)
                        let data = res[0].Stock_Quantity;
                        if (inquirerRes.number > data) {
                            console.log("Sorry! This item is out of stock!")
                        }
                        connection.end();
                    })
                    console.log("Thank you!");
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


};



