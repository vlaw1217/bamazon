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
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
        console.log("------------------------------------------------------")
        managerSelect();
    });
}
let managerSelect = function () {
    inquirer.prompt([
        {
            type: "list",
            message: "Please choose one.",
            name:"choice",
            choices: ["View Product for Sale", "View Low Inventory", "Add to Inventory", "Add New Prodect"]
        },    
    ])
    connection.end();
};
    