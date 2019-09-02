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
    console.log("Connected as id " + connection.threadID + "\n");
    afterConnection();

});
function afterConnection() {
        inquirer.prompt([
            {
                type: "list",
                message: "Please choose one.",
                name: "managerChoice",
                choices: ['View Product for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Prodect']
            },
        ])

            .then(function (choice) {
                let sale = 'View Product for Sale'
                console.log(sale)
                if (choice.managerChoice === sale) {
               
                    connection.query("SELECT * FROM products", function (err, res) {
                        if (err) throw err;
                        console.log(res);
                    });
                };
              
                connection.end();
            });
        }
    

    