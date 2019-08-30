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

function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
        
        //userQuestion()
        //Prompt Questions for users//
        let userQuestion = function () {
            inquirer.prompt([
                {
                    type: "number",
                    message: "Please input the product's ID.",
                    name: "ID number"
                    //ID: "number"
                },
                {
                    type: "number",
                    message: "How many unit?",
                    name: "number"
                    //unit: "number"
                }
            ])
            
                .then(function (inquirerResponse) {
                    if (inquirerResponse.number) {
                    
                        console.log("Thank you!")
                    }
                    else {
                        console.log("Error! Please input the product ID.")
                    };
        
                });
        };
        userQuestion()
    });
};
