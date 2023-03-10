/*
Author: Murtadha Marzouq
*/

const express = require("express");
const app = express();
const mariadb = require("mariadb");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// public folder
app.use(express.static("."));

const pool = mariadb.createPool({
  host: "45.55.32.24",
  user: "admin",
  password: "",
  connectionLimit: 5,
});

// Middleware for cors
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "access-control-allow-methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization"
  );
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

const hostname = "localhost";
const port = 8080;

//Swagger
const swaggerUi = require("swagger-ui-express");
// Set the path to the swagger.json file
// This file is generated by the swagger editor
function sayHello(keyword) {
  axios
    .get(`http:/${functionIP}:${functionPort}/hello/?keyword=${keyword}`)
    .then((res) => {
      console.log(`statusCode: ${res.statusCode}`);
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });
}

app.get("/say:keyword", (req, res) => {
  res.send(keyword);
});

let swaggerDocument = {
  swagger: "2.0",
  info: {
    description: "This is a REST API for a database.",
    version: "1.0.0",
    title: "Student API",
    contact: {
      email: "hydra@findasnake.com",
    },
    license: {
      name: "Apache 2.0",
      url: "http://www.apache.org/licenses/LICENSE-2.0.html",
    },
  },
  host: "45.55.32.24:8080",
  basePath: "/",
  tags: [
    {
      name: "student",
      description: "Everything about your Students",
      externalDocs: {
        description: "Find out more",
        url: "http://findasnake.com",
      },
    },
  ],
  schemes: ["http"],
  paths: {
    "/say?keyword={keyword}": {
      get: {
        tags: ["student"],
        summary: "Say hello",
        description:
          "This will be the Gateway for the Web Fuction created in Azure",
        operationId: "sayHello",
        produces: ["application/json"],
        parameters: [
          {
            name: "keyword",
            in: "path",
            description: "Keyword to say hello",
            required: true,
            type: "string",
          },
        ],

        responses: {
          200: {
            description: "Murtadha says Hello",
            schema: {
              type: "string",
            },
          },
          400: {
            description: "Invalid status value",
          },
        },
      },
    },

    "/getAgents": {
      get: {
        tags: ["getAgents"],
        summary: "Get all agents",

        produces: ["application/json"],
        responses: {
          200: {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/Student",
              },
            },
          },
          400: {
            description: "Invalid status value",
          },
        },
      },
    },

    "/getstudents": {
      get: {
        tags: ["student"],
        summary: "Get all students",

        produces: ["application/json"],
        responses: {
          200: {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/Student",
              },
            },
          },
          400: {
            description: "Invalid status value",
          },
        },
      },
    },

    "/addStudent": {
      post: {
        tags: ["student"],
        summary: "Add a new student to the store",
        description: "",

        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",

            schema: {
              $ref: "#/definitions/Student",
            },
          },
        ],
        responses: {
          405: {
            description: "Invalid input",
          },
        },
      },
    },
    "/updateStudent/{id}": {
      put: {
        tags: ["student"],

        summary: "Update an existing student",
        description: "",
        operationId: "updateStudent",
        produces: ["application/json"],
        parameters: [
          {
            name: "id",
            in: "path",

            required: true,
            type: "integer",
            format: "int64",
          },
          {
            in: "body",
            name: "body",

            schema: {
              $ref: "#/definitions/Student",
            },
          },
        ],
        responses: {
          400: {
            description: "Invalid ID supplied",
          },
          404: {
            description: "Student not found",
          },

          405: {
            description: "Validation exception",
          },
        },
      },
    },
    "/patchStudent/{id}": {
      patch: {
        tags: ["student"],
        summary: "Updates a student in the store with form data",
        description: "",
        operationId: "patchStudent",
        consumes: ["application/x-www-form-urlencoded"],
        produces: ["application/json"],
        parameters: [
          {
            name: "id",
            in: "path",

            required: true,
            type: "integer",
            format: "int64",
          },
          {
            name: "name",
            in: "formData",

            required: false,
            type: "string",
          },
          {
            name: "status",
            in: "formData",

            required: false,
            type: "string",
          },
        ],
        responses: {
          405: {
            description: "Invalid input",
          },
        },
      },
    },

    "/deleteStudent/{id}": {
      delete: {
        tags: ["student"],
        summary: "Deletes a student",
        description: "",
        operationId: "deleteStudent",

        produces: ["application/json"],
        parameters: [
          {
            name: "id",
            in: "path",

            required: true,
            type: "integer",
            format: "int64",
          },
        ],

        responses: {
          400: {
            description: "Invalid ID supplied",
          },
          404: {
            description: "Student not found",
          },
        },
      },
    },
    "/getStudent/{id}": {
      get: {
        tags: ["student"],
        summary: "Find student by ID",
        description: "Returns a single student",

        operationId: "getStudentById",

        produces: ["application/json"],
        parameters: [
          {
            name: "id",

            in: "path",

            required: true,
            type: "integer",
            format: "int64",
          },
        ],
        responses: {
          200: {
            description: "successful operation",
            schema: {
              $ref: "#/definitions/Student",
            },
          },
          400: {
            description: "Invalid ID supplied",
          },
          404: {
            description: "Student not found",
          },
        },
      },
    },
  },
  definitions: {
    agent: {
      type: "object",
      properties: {
        id: {
          type: "integer",
          format: "int64",
        },
        name: {
          type: "string",
        },
        status: {
          type: "string",
          description: "Agent status in the store",
          enum: ["available", "pending", "sold"],
        },
      },
    },

    Student: {
      type: "object",
      properties: {
        ROLLID: {
          type: "string",
          format: "string",
          description: "The unique identifier for a student",
        },

        NAME: {
          type: "string",
          format: "string",
          description: "The first name of the student",
        },
        TITLE: {
          type: "string",
          format: "string",

          description: "The last name of the student",
        },
        SECTION: {
          type: "string",
          format: "string",
          description: "The section of the student {A,B}",
        },
        CLASS: {
          type: "string",
          format: "string",
          description: "The class of the student ",
        },
      },
    },

    externalDocs: {
      description: "Murtadha Marzouq",
      url: "http://findasnake.com",
    },
  },
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Set the view engine to  HTML
const path = require("path");
app.set("views", path.join(__dirname, "views"));

const ejs = require("ejs");

app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("restAPI");
});

app.get("/getstudents", (req, res) => {
  pool
    .getConnection()
    .then((conn) => {
      conn
        .query("SELECT * FROM sample.student")
        .then((rows) => {
          // Convert the rows into a JSON object
          res.json(rows);

          conn.end();
        })
        .catch((err) => {
          // JSON object with error message
          res.json({ error: err });
          conn.end();
        });
    })
    .catch((err) => {
      // JSON object with error message
      res.json({ error: err });
    });
});
app.post("/addStudent", (req, res) => {
  let NAME = req.body.NAME;
  let TITLE = req.body.TITLE;
  let CLASS = req.body.CLASS;
  let SECTION = req.body.SECTION;
  let ROLLID = req.body.ROLLID;
  if (
    NAME == null ||
    TITLE == null ||
    CLASS == null ||
    SECTION == null ||
    ROLLID == null
  ) {
    res.json({ error: "Missing required information" });
    return;
  }

  // Check if the id is a number
  if (req.body.ROLLID != null && isNaN(req.body.ROLLID)) {
    res.status(400);
    res.json({ error: "ROLLID must be a number" });

    return;
  }

  pool
    .getConnection()
    .then((conn) => {
      conn
        .query(
          "INSERT INTO sample.student (NAME, TITLE, CLASS, SECTION, ROLLID) VALUES (?, ?, ?, ?, ?)",
          [NAME, TITLE, CLASS, SECTION, ROLLID]
        )
        .then((rows) => {
          res.json({ success: "Student added successfully" });
          conn.end();
        })
        .catch((err) => {
          // Duplicate entry
          if (err.errno == 1062) {
            res.status(400);
            res.json({ error: "Student already exists" });
          } else {
            res.json({ error: err.message });
          }

          conn.end();
        });
    })
    .catch((err) => {
      res.status(400);
      res.json(err.message);
    });
});

app.put("/updateStudent/:id", (req, res) => {
  let ID = req.params.id;
  let NAME = req.body.NAME;
  let TITLE = req.body.TITLE;
  let CLASS = req.body.CLASS;
  let SECTION = req.body.SECTION;
  let ROLLID = req.body.ROLLID;
  console.log(ID);

  if (
    ID == null ||
    NAME == null ||
    TITLE == null ||
    CLASS == null ||
    SECTION == null ||
    ROLLID == null
  ) {
    res.json({ error: "Missing required information" });
    return;
  }

  pool
    .getConnection()
    .then((conn) => {
      conn
        .query(
          "UPDATE sample.student SET NAME = ?, TITLE = ?, CLASS = ?, SECTION = ? WHERE ROLLID = ?",
          [NAME, TITLE, CLASS, SECTION, ROLLID]
        )
        .then((rows) => {
          res.json({ success: "Student updated successfully" });
          conn.end();
        })
        .catch((err) => {
          res.json({ error: err });
          conn.end();
        });
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

app.delete("/deleteStudent/:id", (req, res) => {
  let ROLLID = req.params.id;
  if (ROLLID == null) {
    res.json({ error: "Missing required information" });
  }

  // Check if the id is a number
  if (isNaN(ROLLID)) {
    res.json({ error: "ROLLID must be a number" });
    return;
  }
  pool
    .getConnection()
    .then((conn) => {
      // Check if the student exists
      conn
        .query("SELECT * FROM sample.student WHERE ROLLID = ?", [ROLLID])
        .then((rows) => {
          if (rows.length == 0) {
            res.json({ error: "Student does not exist" });
            conn.end();
          } else {
            // Delete the student
            conn
              .query("DELETE FROM sample.student WHERE ROLLID = ?", [ROLLID])

              .then((rows) => {
                res.json({ success: "Student deleted successfully" });
              })
              .catch((err) => {
                res.json({ error: err });
              });
          }
        })
        .catch((err) => {
          res.json({ error: err });
          conn.end();
        });
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

app.get("/getStudent/:id", (req, res) => {
  let ROLLID = req.params.id;
  if (ROLLID == null) {
    res.json({ error: "Missing required information" });
    return;
  }

  // Check if the id is a number
  if (isNaN(ROLLID)) {
    res.json({ error: "ROLLID must be a number" });
    return;
  }
  pool
    .getConnection()
    .then((conn) => {
      conn
        .query("SELECT * FROM sample.student WHERE ROLLID = ?", [ROLLID])
        .then((rows) => {
          if (rows.length == 0) {
            res.json({ error: "Student does not exist" });
            conn.end();
          } else {
            res.json(rows);
            conn.end();
          }
        })
        .catch((err) => {
          res.json({ error: err });
          conn.end();
        });
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

app.get("/jsonAPI", (req, res) => {
  res.render("JSONDB");
});

app.get("/say", (req, res) => {
  try {
    const url = req.query.url;
    const keyword = req.query.keyword || "Do you want to say something?";

    if (!url || url == "") {
      res.send("Murtadha Says " + keyword + "!");
    } else {
      const response = axios
        .get(`${url}/?keyword=${keyword}`)
        .then((response) => {
          const data = response.data;
          const message = data.message;
          console.log(data);
          res.send(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/getAgents", (req, res) => {
  pool
    .getConnection()
    .then((conn) => {
      conn
        .query("SELECT * FROM sample.agents")
        .then((rows) => {
          if (rows.length == 0) {
            res.json({ error: "No agents" });
            conn.end();
          } else {
            res.status(200).json(rows);
            conn.end();
          }
        })
        .catch((err) => {
          res.json({ error: err });
          conn.end();
        });
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

app.patch("/patchStudent/:id", (req, res) => {
  let ROLLID = req.params.id;
  let NAME = req.body.NAME;
  let TITLE = req.body.TITLE;
  let CLASS = req.body.CLASS;

  let SECTION = req.body.SECTION;
  if (
    NAME == null ||
    TITLE == null ||
    CLASS == null ||
    SECTION == null ||
    ROLLID == null
  ) {
    res.json({ error: "Missing required information" });
    return;
  }
  // Check if the id is a number
  if (req.body.ROLLID != null && isNaN(req.body.ROLLID)) {
    res.status(400);
    res.json({ error: "ROLLID must be a number" });

    return;
  }
  pool
    .getConnection()

    .then((conn) => {
      conn
        .query(
          "UPDATE sample.student SET NAME = ?, TITLE = ?, CLASS = ?, SECTION = ? WHERE ROLLID = ?",
          [NAME, TITLE, CLASS, SECTION, ROLLID]
        )

        .then((rows) => {
          res.json({ success: "Student updated successfully" });
          conn.end();
        })
        .catch((err) => {
          res.json({ error: err });
          conn.end();
        });
    })

    .catch((err) => {
      res.json({ error: err });
    });
});

app.get("/customers", (req, res) => {
  pool
    .getConnection()
    .then((conn) => {
      conn
        .query("SELECT * FROM sample.customers")

        .then((rows) => {
          if (rows.length == 0) {
            res.json({ error: "No customers" });
            conn.end();
          } else {
            res.status(200).json(rows);
            conn.end();
          }
        })
        .catch((err) => {
          res.json({ error: err });
          conn.end();
        });
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

app.get("/customers/:id", (req, res) => {
  let id = req.params.id;
  if (id == null) {
    res.json({ error: "Missing required information" });
    return;
  }

  // Check if the id is a number
  if (isNaN(id)) {
    res.json({ error: "id must be a number" });
    return;
  }
  pool
    .getConnection()

    .then((conn) => {
      conn
        .query("SELECT * FROM sample.customers WHERE CUST_CODE = ?", [id])

        .then((rows) => {
          if (rows.length == 0) {
            res.json({ error: "Customer does not exist" });
            conn.end();
          } else {
            res.json(rows);
            conn.end();
          }
        })
        .catch((err) => {
          res.json({ error: err });
          conn.end();
        });
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

app.post("/customers", (req, res) => {
   /*
   CUST_CODE | CUST_NAME   | CUST_CITY                           | WORKING_AREA | CUST_COUNTRY | GRADE | OPENING_AMT | RECEIVE_AMT | PAYMENT_AMT | OUTSTANDING_AMT | PHONE_NO     | AGENT_CODE |
    */
    let CUST_CODE = req.body.CUST_CODE;
    let CUST_NAME = req.body.CUST_NAME;
    let CUST_CITY = req.body.CUST_CITY;
    let WORKING_AREA = req.body.WORKING_AREA;
    let CUST_COUNTRY = req.body.CUST_COUNTRY;
    let GRADE = req.body.GRADE;
    let OPENING_AMT = req.body.OPENING_AMT;
    let RECEIVE_AMT = req.body.RECEIVE_AMT;
    let PAYMENT_AMT = req.body.PAYMENT_AMT;
    let OUTSTANDING_AMT = req.body.OUTSTANDING_AMT;
    let PHONE_NO = req.body.PHONE_NO;
    let AGENT_CODE = req.body.AGENT_CODE;

    if (

        CUST_CODE == null ||
        CUST_NAME == null ||
        CUST_CITY == null ||
        WORKING_AREA == null ||
        CUST_COUNTRY == null ||
        GRADE == null ||
        OPENING_AMT == null ||
        RECEIVE_AMT == null ||
        PAYMENT_AMT == null ||
        OUTSTANDING_AMT == null ||
        PHONE_NO == null ||
        AGENT_CODE == null
    ) {
        res.json({ error: "Missing required information" });
        return;
    }
    // Check if the id is a number
    if (req.body.CUST_CODE != null && isNaN(req.body.CUST_CODE)) {
        res.status(400);
        res.json({ error: "CUST_CODE must be a number" });

        return;

    }
    pool.getConnection()

        .then((conn) => {


            conn.query("INSERT INTO sample.customers (CUST_CODE, CUST_NAME, CUST_CITY, WORKING_AREA, CUST_COUNTRY, GRADE, OPENING_AMT, RECEIVE_AMT, PAYMENT_AMT, OUTSTANDING_AMT, PHONE_NO,AGENT_CODE) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [CUST_CODE, CUST_NAME, CUST_CITY, WORKING_AREA, CUST_COUNTRY, GRADE, OPENING_AMT, RECEIVE_AMT, PAYMENT_AMT, OUTSTANDING_AMT, PHONE_NO, AGENT_CODE])

                .then((rows) => {
                    res.json({ success: "Customer added successfully" });
                    conn.end();
                })
                .catch((err) => {
                    res.json({ error: err });
                    conn.end();
                });
        })

        .catch((err) => {
            res.json({ error: err });
        });
});

app.put("/customers/:id", (req, res) => {
    let id = req.params.id;
    let CUST_CODE = req.body.CUST_CODE;
    let CUST_NAME = req.body.CUST_NAME;
    let CUST_CITY = req.body.CUST_CITY;
    let WORKING_AREA = req.body.WORKING_AREA;
    let CUST_COUNTRY = req.body.CUST_COUNTRY;
    let GRADE = req.body.GRADE;
    let OPENING_AMT = req.body.OPENING_AMT;
    let RECEIVE_AMT = req.body.RECEIVE_AMT;
    let PAYMENT_AMT = req.body.PAYMENT_AMT;
    let OUTSTANDING_AMT = req.body.OUTSTANDING_AMT;
    let PHONE_NO = req.body.PHONE_NO;
    let AGENT_CODE = req.body.AGENT_CODE;

    if (id == null) {
        res.json({ error: "Missing required information" });
        return;
    }

    // Check if the id is a number
    if (isNaN(id)) {
        res.json({ error: "id must be a number" });
        return;
    }
    pool.getConnection()


        .then((conn) => {

            conn.query("UPDATE sample.customers SET CUST_CODE = ?, CUST_NAME = ?, CUST_CITY = ?, WORKING_AREA = ?, CUST_COUNTRY = ?, GRADE = ?, OPENING_AMT = ?, RECEIVE_AMT = ?, PAYMENT_AMT = ?, OUTSTANDING_AMT = ?, PHONE_NO = ?,AGENT_CODE = ? WHERE id = ?", [CUST_CODE, CUST_NAME, CUST_CITY, WORKING_AREA, CUST_COUNTRY, GRADE, OPENING_AMT, RECEIVE_AMT, PAYMENT_AMT, OUTSTANDING_AMT, PHONE_NO, AGENT_CODE, id])

                .then((rows) => {
                    if (rows.affectedRows == 0) {
                        res.json({ error: "Customer does not exist" });
                        conn.end();
                    } else {
                        res.json({ success: "Customer updated successfully" });
                        conn.end();
                    }
                })
                .catch((err) => {
                    res.json({ error: err });
                    conn.end();
                });
        })
        .catch((err) => {
            res.json({ error: err });
        });
});

app.delete("/customers/:id", (req, res) => {
    let CUST_CODE = req.params.id;
    
    if (id == null) {
        res.json({ error: "Missing required information" });
        return;
    }

    // Check if the id is a number
    if (isNaN(id)) {
        res.json({ error: "id must be a number" });
        return;

    }
    pool.getConnection()

        .then((conn) => {

            conn.query("DELETE FROM sample.customers WHERE id = ?", [CUST_CODE])

                .then((rows) => {
                    if (rows.affectedRows == 0) {
                        res.json({ error: "Customer does not exist" });
                        conn.end();
                    } else {
                        res.json({ success: "Customer deleted successfully" });
                        conn.end();
                    }
                })
                .catch((err) => {
                    res.json({ error: err });
                    conn.end();
                });
        })
        .catch((err) => {
            res.json({ error: err });
        });
});


                


app.listen(port, () => {
  console.log(` app listening at http://45.55.32.24:${port}`);
});
