/*
Author: Murtadha Marzouq
*/

const express = require('express');
const app = express();const mariadb = require('mariadb');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// public folder
app.use(express.static('.'));

const pool = mariadb.createPool({
    host: '45.55.32.24',
    user: 'admin',
    password: '',
    connectionLimit: 5
});

// Middleware for cors  
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'access-control-allow-methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization');
        next();
});


/**
 * REST API
 * /getstudents - GET - Returns a list of students
 * /addStudent - POST - Adds a student
 * /updateStudent/:id - PUT - Updates a student
 * /deleteStudent/:id - DELETE - Deletes a student
 * /getStudent/:id - GET - Returns a student
 * 
 * Variables:
 * ROLLID - Unique ID for the student
 * NAME - First Name of the student
 * TITLE - Last of the student
 * CLASS - Class of the student
 * SECTION - Section of the student
 * 
 * See the sample JSON object below:
 * {
 * "ROLLID": 1,
 * "NAME": "John",
 * "TITLE": "Doe",
 * "CLASS": "1",
 * "SECTION": "A"
 * }
 * 
 */

const hostname = '45.55.32.24';
const port = 8080;

//Swagger
const swaggerUi = require('swagger-ui-express');
// Set the path to the swagger.json file
// This file is generated by the swagger editor

let swaggerDocument = {
    "swagger": "2.0",
    "info": {
        "description": "This is a REST API for a database.",
        "version": "1.0.0",
        "title": "Student API",
        "contact": {
            "email": "hydra@findasnake.com"
        },
        "license": {
            "name": "Apache 2.0",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        }
    },
    "host": "45.55.32.24:8080",
    "basePath": "/",
    "tags": [
        {
            "name": "student",
            "description": "Everything about your Students",
            "externalDocs": {
                "description": "Find out more",
                "url": "http://findasnake.com"
            }
        }
    ],
    "schemes": [
        "http"
    ],
    "paths": {
        "/getstudents": {
            "get": {

                "tags": [
                    "student"
                ],
                "summary": "Get all students",

                "produces": [
                    "application/json"
                ],
                "responses": {

                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Student"
                            }
                        }
                    },
                    "400": {
                        "description": "Invalid status value"
                    }
                }
            }
        },

        "/addStudent": {
            "post": {
                "tags": [
                    "student"
                ],
                "summary": "Add a new student to the store",
                "description": "",


                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",

                        "schema": {
                            "$ref": "#/definitions/Student"
                        }
                    }
                ],
                "responses": {
                    "405": {
                        "description": "Invalid input"
                    }
                }
            }

        },
        "/updateStudent/{id}": {

            "put": {
                "tags": [
                    "student"
                ],

                "summary": "Update an existing student",
                "description": "",
                "operationId": "updateStudent",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",

                        "required": true,
                        "type": "integer",
                        "format": "int64"
                    },
                    {
                        "in": "body",
                        "name": "body",

                        "schema": {
                            "$ref": "#/definitions/Student"
                        }
                    }
                ],
                "responses": {
                    "400": {
                        "description": "Invalid ID supplied"
                    },
                    "404": {
                        "description": "Student not found"
                    },

                    "405": {

                        "description": "Validation exception"
                    }
                }
            }
        },
        "/deleteStudent/{id}": {
            "delete": {
                "tags": [
                    "student"
                ],
                "summary": "Deletes a student",
                "description": "",
                "operationId": "deleteStudent",

                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",

                        "required": true,
                        "type": "integer",
                        "format": "int64"
                    }
                ],

                "responses": {

                    "400": {
                        "description": "Invalid ID supplied"
                    },
                    "404": {
                        "description": "Student not found"
                    }
                }
            }
        },
        "/getStudent/{id}": {
            "get": {
                "tags": [
                    "student"
                ],
                "summary": "Find student by ID",
                "description": "Returns a single student",

                "operationId": "getStudentById",

                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "id",

                        "in": "path",

                        "required": true,
                        "type": "integer",
                        "format": "int64"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "$ref": "#/definitions/Student"
                        }
                    },
                    "400": {
                        "description": "Invalid ID supplied"
                    },
                    "404": {
                        "description": "Student not found"
                    }
                }
            }
        }
    },
    "definitions": {
        "Student": {
            "type": "object",
            "properties": {
                "ROLLID": {
                    "type": "string",
                    "format": "string",
                    "description": "The unique identifier for a student"
                },
                
                "NAME": {
                    "type": "string",
                    "format": "string",
                    "description": "The first name of the student"
                },
                "TITLE": {
                    "type": "string",
                    "format": "string",

                    "description": "The last name of the student"

                },
                "SECTION": {

                    "type": "string",
                    "format": "string",
                    "description": "The section of the student {A,B}"
                },
                "CLASS": {
                    "type": "string",
                    "format": "string",
                    "description": "The class of the student "
                },


        }
    },

    "externalDocs": {
        "description": "Murtadha Marzouq",
        "url": "http://findasnake.com"
    }
}
}



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Set the view engine to  HTML
const path = require('path');
app.set('views', path.join(__dirname, 'views'));

const ejs = require('ejs');



app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('restAPI');
});




app.get('/getstudents', (req, res) => {

    pool.getConnection()
        .then(conn => {
            conn.query("SELECT * FROM sample.student")
                .then((rows) => {
                    // Convert the rows into a JSON object
                    res.json(rows);

                    conn.end();
                })
                .catch(err => {
                    
                    // JSON object with error message
                    res.json({ "error": err });
                    conn.end();
                })
        })
        .catch(err => {
                
                // JSON object with error message
                res.json({ "error": err });
        });
}
);
app.post('/addStudent', (req, res) => {
    let NAME = req.body.NAME;
    let TITLE = req.body.TITLE;
    let CLASS = req.body.CLASS;
    let SECTION = req.body.SECTION;
    let ROLLID = req.body.ROLLID;
    if (NAME == null || TITLE == null || CLASS == null || SECTION == null || ROLLID == null) {
        res.json({ "error": "Missing required information" });
return;
    }



        // Check if the id is a number
        if (req.body.ROLLID != null && isNaN(req.body.ROLLID)) {
            res.status(400);
            res.json({ "error": "ROLLID must be a number" });
        
            return;
        }




        pool.getConnection()
            .then(conn => {
                conn.query("INSERT INTO sample.student (NAME, TITLE, CLASS, SECTION, ROLLID) VALUES (?, ?, ?, ?, ?)", [NAME, TITLE, CLASS, SECTION, ROLLID])
                    .then((rows) => {
                        res.json({ "success": "Student added successfully" });
                        conn.end();
                    }
                    )
                    .catch(err => {
                        // Duplicate entry
                        if (err.errno == 1062) {
                            res.status(400);
                            res.json({ "error": "Student already exists" });
                        }
                        else {
                            res.json({ "error": err.message });
                        }
                        
                        conn.end();
                    }
                    )
            })
            .catch(err => {
                res.status(400);
                res.json(err.message);
                


            }
            );
    }
);


app.put('/updateStudent/:id', (req, res) => {



    let ID =  req.params.id;
    let NAME = req.body.NAME;
    let TITLE = req.body.TITLE;
    let CLASS = req.body.CLASS;
    let SECTION = req.body.SECTION;
    let ROLLID = req.body.ROLLID;
    console.log(ID);

    if (ID == null || NAME == null || TITLE == null || CLASS == null || SECTION == null || ROLLID == null) {
        res.json({ "error": "Missing required information" });
        return;
    }

    
    pool.getConnection()
        .then(conn => {
            conn.query("UPDATE sample.student SET NAME = ?, TITLE = ?, CLASS = ?, SECTION = ? WHERE ROLLID = ?", [NAME, TITLE, CLASS, SECTION, ROLLID])
                .then((rows) => {
                    res.json({ "success": "Student updated successfully" });
                    conn.end();
                }
                )
                .catch(err => {
                    res.json({ "error": err });
                    conn.end();
                }
                )
        })
        .catch(err => {
            res.json({ "error": err });
        }
        );
}

);

app.delete('/deleteStudent/:id', (req, res) => {
    let ROLLID = req.params.id;
    if (ROLLID == null) {
        res.json({ "error": "Missing required information" });
        
    }
    
    // Check if the id is a number
    if (isNaN(ROLLID)) {
        res.json({ "error": "ROLLID must be a number" });
        return;
    }
    pool.getConnection()
        .then(conn => {
        
            // Check if the student exists
            conn.query("SELECT * FROM sample.student WHERE ROLLID = ?", [ROLLID])
                .then((rows) => {
                    if (rows.length == 0) {
                        res.json({ "error": "Student does not exist" });
                        conn.end();
                        
                    } else {

            
            // Delete the student
            conn.query("DELETE FROM sample.student WHERE ROLLID = ?", [ROLLID])

            .then((rows) => {
                res.json({ "success": "Student deleted successfully" });
            }
            )
            .catch(err => {
                res.json({ "error": err });
            }
            )
        }
                 
                })
                .catch(err => {

                    res.json({ "error": err });
                    conn.end();

                }
                )
            
                

        })
        .catch(err => {
            res.json({ "error": err });
        }
        );
}

);

app.get('/getStudent/:id', (req, res) => {
    let ROLLID = req.params.id;
    if (ROLLID == null) {
        res.json({ "error": "Missing required information" });
        return;
    }

    // Check if the id is a number
    if (isNaN(ROLLID)) {
        res.json({ "error": "ROLLID must be a number" });
        return;
    }
    pool.getConnection()
        .then(conn => {
            conn.query("SELECT * FROM sample.student WHERE ROLLID = ?", [ROLLID])
                .then((rows) => {
                    if (rows.length == 0) {
                        res.json({ "error": "Student does not exist" });
                        conn.end();
                    } else {
                        res.json(rows);
                        conn.end();
                    }
                })
                .catch(err => {
                    res.json({ "error": err });
                    conn.end();
                }
                )
        })
        .catch(err => {
            res.json({ "error": err });
        }
        );
}

);



app.listen(port, () => {
    console.log(` app listening at http://45.55.32.24:${port}`)
}
);