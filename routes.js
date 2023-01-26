const express = require('express')

const router = express.Router()

router.get('/getstudents', (req, res) => {
    
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
router.post('/addStudent', (req, res) => {
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
                        res.json({ "error": err });
                        conn.end();
                    })
            })
            .catch(err => {
                res.json({ "error": err });
            });
    }
);



module.exports = router;
