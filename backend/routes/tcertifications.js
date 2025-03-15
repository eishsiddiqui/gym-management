const express = require("express");
const { db } = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
  db.raw(
    "Select tc.tid , e.fname, e.lname, tc.cid , c.cname, substr(c.issuedate, 1, 10) as issuedate from employee e, certification c, tcertification tc where e.empno = tc.tid and c.cid = tc.cid order by tc.tid,tc.cid"
  )
    .then((result) => {
      res.json({
        data: result[0],
      });
    })
    .catch((err) => {
      console.error("Error:", err);
      res.status(500).send({ error: "Internal Server Error" });
    });
});

// ADD TCERTIFICATION
router.post("/", (req, res) => {
  const { trainerID, cID } = req.body;
  db.raw("INSERT INTO  TCERTIFICATION( tID , cID ) VALUES (?, ?)", [
    trainerID,
    cID,
  ])
    .then((member) => {
      res.json({
        data: member.insertId,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: "Internal Server Error" });
    });
});

module.exports = router;
