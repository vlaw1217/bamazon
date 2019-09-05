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
    //console.log("View Products Sales")
    inquirer.prompt([
        {
            type: "list",
            message: "View all or specific department?",
            name: "allName",
            choices: ['All', 'Department Name', 'Exit'],
        },
    ])
        .then(function (answer) {
            if (answer.allName === "All") {
                connection.query("SELECT ID, Department_Name, Product_Sales FROM products", function (err, res) {
                    if (err) throw err;
                    console.log(res);
                    afterConnection();
                })
            } else if (answer.allName === "Department Name") {
                inquirer.prompt([
                    {
                        type: "input",
                        message: "Please enter department name.",
                        name: "deptName",
                    }
                ])
                    .then(function (answer) {
                        connection.query("SELECT ID, Department_Name, Product_Sales FROM products where Department_Name = '" + answer.deptName + "' ", function (err, res) {
                           
                            if (err) throw err;
                            console.log(res);
                            afterConnection();
                        })
                    });
                
            } else {
                answer.allName === "Exit"
                process.exit();
            }
        })
} 
         


    
        /*.then(function (answer) {
            connection.query("SELECT * FROM products", function (err, res) {
                if (err) throw err;
                if (answer.deptName === res[0].Department_Name) {

                }

            })

            connection.query("SELECT ID, Department_Name, Product_Sales FROM products", function (err, res) {
                if (err) throw err;
                console.log(res);
            });
        };*/