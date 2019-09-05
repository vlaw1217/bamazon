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
            choices: ['View Products for Sale', 'View Low Inventory', 'Update Information', 'Add New Product', 'Exit']
        },
    ])

        .then(function (choice) {
            let sale = 'View Products for Sale';
            let inventory = 'View Low Inventory';
            let updateInfo = 'Update Information';
            let addProduct = 'Add New Product';
            let exit = 'Exit';
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

            } else if (choice.managerChoice === updateInfo) {
                showAllProuduct();
                //updateProductFunc();

            } else if (choice.managerChoice === addProduct) {
                inquirer.prompt([
                    {
                        type: "input",
                        message: "Please add Name of Product",
                        name: "addName",
                    },
                    {
                        type: "input",
                        message: "Please add Department Name",
                        name: "dept",
                    },
                    {
                        type: "input",
                        message: "Please add Price",
                        name: "addPrice",
                    },
                    {
                        type: "input",
                        message: "Please add Stock Quantity",
                        name: "addQuantity",
                    }
                ])
                    .then(function (insertProduct) {
                        connection.query("insert into products (Name_of_Product, Department_Name, Stock_Quantity,price) values ('" + insertProduct.addName + "','" + insertProduct.dept + "'," + insertProduct.addQuantity + "," + insertProduct.addPrice + ")", function (err) {
                            if (err) throw err;
                            console.log("New Product added")
                        });
                        connection.query("SELECT * FROM products", function (err, res) {
                            if (err) throw err;
                            console.log(res)
                            console.log("------------------------------------------------------------")
                            afterConnection();
                        });
                        //console.log("You have added product " + insertProduct.addName + ", department =" +insertProduct.dept);
                    });
                         
            } else {
                choice.managerChoice === exit
                process.exit();
            }
        });

    /* start showAllProudct function */
    function showAllProuduct() {
        connection.query("SELECT id, Name_of_Product, Department_Name, Price, Stock_Quantity FROM products", function (err, res) {
            if (err) throw err;
            console.log(res);
            console.log("---------------------------------------------------------------")
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
                choices: ['Update Name of Product', 'Update Department', 'Update Price', 'Update Stock Quantity', 'Exit'],
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
                                let newName = function () {
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
                                                    afterConnection()                                      
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
                                let newName = function () {
                                    inquirer.prompt([
                                        {
                                            type: "input",
                                            message: "Please update department name",
                                            name: "name",
                                        },
                                    ])
                                        .then(function (answer) {
                                            connection.query("UPDATE products SET Department_Name = '" + answer.name + "' WHERE ID =" + id.ID,
                                                function (err) {
                                                    if (err) throw err;
                                                    console.log("Department Name updated")
                                                    afterConnection()
                                                    //connection.end();
                                                })
                                        })
                                }
                            })


                        /* end update Department Name*/
                        break;
                    case "Update Price":
                        inquirer.prompt([
                            {
                                type: "input",
                                message: "Please input ID",
                                name: "ID",
                            },
                        ])
                            .then(function (id) {
                                connection.query("SELECT Price FROM products WHERE ID = " + id.ID, function (err, res) {
                                    if (err) throw err;
                                    console.log(res)
                                    newPrice()
                                })
                                let newPrice = function () {
                                    inquirer.prompt([
                                        {
                                            type: "input",
                                            message: "Please update price",
                                            name: "price",
                                        },
                                    ])
                                        .then(function (answer) {
                                            connection.query("UPDATE products SET Price = '" + answer.price + "' WHERE ID =" + id.ID,
                                                function (err) {
                                                    if (err) throw err;
                                                    console.log("Price updated")
                                                    afterConnection()
                                                });
                                        });
                                };
                            });
                        break;
                    case "Update Stock Quantity":
                        inquirer.prompt([
                            {
                                type: "input",
                                message: "Please input ID",
                                name: "ID",
                            },
                        ])
                            .then(function (id) {
                                connection.query("SELECT Stock_Quantity FROM products WHERE ID = " + id.ID, function (err, res) {
                                    if (err) throw err;
                                    console.log(res)
                                    newQuantity()
                                });

                                let newQuantity = function () {
                                    inquirer.prompt([
                                        {
                                            type: "input",
                                            message: "Please update quantity",
                                            name: "quantity",
                                        },
                                    ])
                                        .then(function (answer) {
                                            connection.query("UPDATE products SET Stock_Quantity = '" + answer.quantity + "' WHERE ID =" + id.ID,
                                                function (err) {
                                                    if (err) throw err;
                                                    console.log("Stock Quantity updated")
                                                    console.log("---------------------------------------------------------------")
                                                    connection.end();
                                                    afterConnection()
                                                });
                                        });
                                };
                            });

                        break;
                    case "Exit":
                        process.exit();

                };

            });

    }
}






