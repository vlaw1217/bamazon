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
    //Ask for veiw all or Department or Exit//
    inquirer.prompt([
        {
            type: "list",
            message: "Please choose one",
            name: "choose",
            choices: ['View Product Sales', 'Total Profit','Create New Department', 'Delete Department', 'Exit'],
        },
    ])

        .then(function (answer) {
            switch (answer.choose) {
                case "View Product Sales":
                    viewSale();
                    break;
                case "Total Profit":
                    totalProfit();
                    break;
                case "Create New Department":
                    createDept();
                    break;
                case "Delete Department":
                    deleteDept();
                    break;
                case "Exit":
                    exitAll();
                    break;

                    function viewSale() {
                        inquirer.prompt([
                            {
                                type: "list",
                                message: "All or Specific Department?",
                                name: "allName",
                                choices: ['All Departments', 'Input Department Name', 'Exit'],
                            },
                        ])
                            //if choose all, will view all deparemnt and product sales//
                            .then(function (ans) {
                                switch (ans.allName) {
                                    case "All Departments":
                                        allDept();
                                        break;
                                    case "Input Department Name":
                                        inputDept();
                                        break;
                                    case "Exit":
                                        exitAll();
                                        break;


                                        function allDept() {

                                            connection.query("SELECT products.Name_of_Product, products.Price, products.Product_Sales, departments.Department_Name, departments.Over_Head_Costs FROM products INNER JOIN departments ON products.Department_Name=departments.Department_Name", function (err, res) {
                                                if (err) throw err;
                                                //console.log(viewAllDept)
                                                console.log(res);
                                                console.log("----------------------------------------------------------------------------------")
                                                afterConnection();

                                            })

                                        }

                                        function inputDept() {
                                            inquirer.prompt([
                                                {
                                                    type: "input",
                                                    message: "Please enter department name",
                                                    name: "deptName",
                                                }
                                            ])
                                                .then(function (answer) {
                                                    connection.query("SELECT ID, Department_Name, Product_Sales FROM products where Department_Name = '" + answer.deptName + "' ", function (err, res) {
                                                        if (err) throw err;
                                                        console.log(res);
                                                        afterConnection();

                                                    });
                                                });
                                        }
                                }
                            })
                    }
                    function totalProfit() {
                        connection.query("SELECT products.Name_of_Product, departments.Department_Name, products.Product_Sales  -  departments.Over_Head_Costs As Profit FROM products, departments WHERE products.Department_Name=departments.Department_Name", function (err, res) {
                            if (err) throw err;
                            console.log(res)
                            console.log("----------------------------------------------------------------------------------")
                            afterConnection();
                            
                            })
                    }
                        
                        
                    function createDept() {
                        inquirer.prompt([
                            {
                                type: "input",
                                message: "Please add new department name",
                                name: "newName",
                            },
                            {
                                type: "input",
                                message: "Please add over head cost",
                                name: "number",
                            },
                        ])

                            .then(function (create) {
                                connection.query("Insert into departments (Department_Name, Over_Head_Costs) values ('" + create.newName + "'," + create.number + ")", function (err, res) {
                                    if (err) throw err;
                                    console.log("----------------------------------------------------------------------------------")
                                    console.log("Updated New Department")
                                    console.log("----------------------------------------------------------------------------------")
                                    afterConnection();

                                })
                            })
                    }
                    function deleteDept() {
                        //Show all Departments before delete department//
                        connection.query("SELECT * FROM departments", function (err, res) {
                            if (err) throw err;
                            console.log(res);
                            console.log("----------------------------------------------------------------------------------")

                            inquirer.prompt([
                                {
                                    type: "input",
                                    message: "Please input Deparment ID",
                                    name: "ID"
                                },
                            ])
                                .then(function (deleteDept) {

                                    // Delete department//
                                    connection.query("Delete from departments where ID = " + deleteDept.ID, function (err, res) {
                                        if (err) throw err;
                                        console.log("----------------------------------------------------------------------------------")
                                        console.log("Department deleted")
                                        console.log("----------------------------------------------------------------------------------")
                                        afterConnection();
                                    });
                                });
                        });
                    };
            };
        
            function exitAll() {
                        if (answer.allName === "Exit"); {
                            process.exit();
                        };
                       
                    };

            });
};
















