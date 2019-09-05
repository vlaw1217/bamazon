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
            choices: ['View Product Sales', 'Create New Department', 'Exit'],
        },
    ])

        .then(function (answer) {
            switch (answer.choose) {
                case "View Product Sales":
                    viewSale();
                    break;
                case "Create New Department":
                    createDept();
                    break;
                case "Exit":
                    exitAll()
                    break;

                    function viewSale() {
                        //if (answer.choose === "View Product Sales") {
                        inquirer.prompt([
                            {
                                type: "list",
                                message: "All or Specific Department?",
                                name: "allName",
                                choices: ['All Department', 'Input Department Name', 'Exit'],
                            },
                        ])

                            //if choose all, will view all deparemnt and product sales//
                            .then(function (ans) {
                                switch (ans.allName) {
                                    case "All Department":
                                        allDept();
                                        break;

                                    case "Input Department Name":
                                        inputDept()
                                        break;

                                    case "Exit":
                                        exitAll()
                                        break;


                                        function allDept() {
                                            //if (ans.allName === "All Department") {
                                            connection.query("SELECT ID, Department_Name, Product_Sales FROM products", function (err, res) {
                                                if (err) throw err;
                                                console.log(res);
                                                afterConnection();
                                            })
                                        }

                                        //}

                                        function inputDept() {
                                            // if (answer.allName === "Input Department Name") {
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
                                    //}
                                }
                            })
                    }

                    function createDept() {
                        //if (answer.choose === "Creat New Department") {
                        //console.log("dept")
                        /*Start update Department Name */
                        inquirer.prompt([
                            {
                                type: "input",
                                message: "Please add new deparment name",
                                name: "newName",
                            },
                            {
                                type: "input",
                                message: "Please add over head cost",
                                name: "number",
                            },
                        ])

                            .then(function (create) {

                                //console.log("name:"+create.newName+" Number:"+create.number)
                                connection.query("Insert into departments (Department_Name, Over_Head_Costs) values ('" + create.newName + "'," + create.number+")", function (err, res) {
                                    if (err) throw err;
                                    console.log("Updated New Department")
                                    afterConnection();
                                    
                                })
                                })
                                /*let newName = function () {
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
                                                });
                                        });
                                }*/
                            //});
                        //}

                    };
                    function exitAll() {
                        if (answer.allName === "Exit"); {
                            process.exit();
                        }
                    }


            }
        })
}


/*function allDept() {
    if (ans.allName === "All Department") {
        connection.query("SELECT ID, Department_Name, Product_Sales FROM products", function (err, res) {
            if (err) throw err;
            console.log(res);
            afterConnection();
        })
    }

}*/

                    //if choose department name, user needs to enter the deparment name and show specific department with product sales//
/*function inputDept() {
    if (answer.allName === "Input Department Name") {
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
    }*/

/*} else (answer.allName === "Exit"); {
    afterConnection();
};
}*/

/*function createDept() {
    if (answer.choose === "Creat New Department") {
        //console.log("dept")
        Start update Department Name
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
                                });
                        });
                }
            });
    }
};*/
/*function exitAll() {
    if (answer.allName === "Exit"); {
        process.exit();
    }
}

}

}*/







