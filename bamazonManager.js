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
            choices: ['View Products for Sale', 'View Low Inventory', 'Update Information', 'Add New Product']
        },
    ])

        .then(function (choice) {
            let sale = 'View Products for Sale';
            let inventory = 'View Low Inventory';
            let updateInventory = 'Update Inventory';
            if (choice.managerChoice === sale) {
                connection.query("SELECT * FROM products", function (err, res) {
                    if (err) throw err;
                    console.log(res);
                    console.log("---------------------------------------------------------")
                    afterConnection()
                });
            } else if (choice.managerChoice === inventory) {
                connection.query("SELECT ID, Name_of_Product, Department_Name, Stock_Quantity FROM products where Stock_Quantity < 5", function (err, res) {
                    if (err) throw err;
                    console.log(res);
                    console.log("---------------------------------------------------------")
                    afterConnection()
                });
                
            } else if (choice.managerChoice === updateInventory) {
                showAllProuduct();
                //updateProductFunc();
               
            }
        })
    
/* start showAllProudct function */
    function showAllProuduct() { 
        connection.query("SELECT id, Name_of_Product, Department_Name, Price, Stock_Quantity FROM products", function (err, res) {
            if (err) throw err;
            console.log(res);
            updateProductFunc();
        })

    }
    
/* end showAllProduct function */
    

    /* start update product Name function */
    function updateProductFunc() { 
        inquirer.prompt([
            {
                type: "list",
                message: "Update which one?",
                name: "add",
                choices: ['Update Name of Product', 'Update Department', 'Update Price', 'Update Stock Quantity'],
            },
        ])
            .then(function (update) {
                console.log(update.add)
                switch (update.add) { 
                    case "Update Name of Product":
                        console.log("product");
                    /*Start update Product Name */                         
                            inquirer.prompt([
                                {
                                    type: "input",
                                    message: "Please input ID",
                                    name: "ID",
                                },
                            ])
                                .then(function (id) {

                                    connection.query("SELECT Name_of_Product FROM products WHERE ID = " + id.ID, function (err, res) {
                                        if (err) throw err;
                                        console.log(res)
                                        newName()
                                    })
                                    let newName = function newName() {
                                        inquirer.prompt([
                                            {
                                                type: "input",
                                                message: "Please update name of product",
                                                name: "name",
                                            },
                                        ])
                                            .then(function (answer) {
                                                connection.query("UPDATE products SET Name_of_Product = '" + answer.name + "' WHERE ID =" + id.ID,
                                                    function (err, res) {
                                                        if (err) throw err;
                                                        console.log("Products Name updated")

                                                        connection.end();
                                                    })
                                            })
                                    }
                                })
                                           
                                             
                    /* end update Product Name*/
                        break;
                    case "Update Department":
                        console.log("dept")
                        /*Start update Department Name */
                        inquirer.prompt([
                            {
                                type: "input",
                                message: "Please input ID",
                                name: "ID",
                            },
                        ])
                            .then(function (id) {

                                connection.query("SELECT Department_Name FROM products WHERE ID = " + id.ID, function (err, res) {
                                    if (err) throw err;
                                    console.log(res)
                                    newName()
                                })
                                let newName = function newName() {
                                    inquirer.prompt([
                                        {
                                            type: "input",
                                            message: "Please update department name",
                                            name: "name",
                                        },
                                    ])
                                        .then(function (answer) {
                                            connection.query("UPDATE products SET Department_Name = '" + answer.name + "' WHERE ID =" + id.ID,
                                                function (err, res) {
                                                    if (err) throw err;
                                                    console.log("Department Name updated")

                                                    connection.end();
                                                })
                                        })
                                }
                            })


                    /* end update Department Name*/






                        break;
                    default:
                        console.log("djkjlajl")
                }
                //process.exit();
                /*
                if (update.add === 'Update Name of Product') {
                    connection.query("SELECT ID, Name_of_Product FROM products", function (err, res) {
                        if (err) throw err;
                        console.log(res)
                        inquirer.prompt([
                            {
                                type: "input",
                                message: "Please input ID",
                                name: "ID",
                            },
                        ])
                            .then(function (id) {
                                connection.query("SELECT Name_of_Product FROM products WHERE ID = " + id.ID, function (err, res) {
                                    if (err) throw err;
                                    console.log(res)
                                    newName()
                                })
                                let newName = function newName() {
                                    inquirer.prompt([
                                        {
                                            type: "input",
                                            message: "Please input new name of product",
                                            name: "name",
                                        },
                                    ])
                                        .then(function (answer) {
                                            connection.query("UPDATE products SET Name_of_Product = '" + answer.name + "' WHERE ID =" + id.ID,
                                                function (err, res) {
                                                    if (err) throw err;
                                                    console.log("Products Name updated")

                                                    connection.end();
                                                })
                                        })
                                }
                            })
                    })

                }*/
            })

    }
    /* end update product Name function */
    
}
                        
                        
                                                    
       

        
