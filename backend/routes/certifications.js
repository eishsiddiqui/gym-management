const express = require("express");
const { db } = require("../db");

const router = express.Router();

//DISPLAY CERTIFICATIONS
router.get("/", (req, res) => {
  db.raw(
    "SELECT cID,cName,substr(IssueDate , 1, 10 ) as IssueDate , Issuer from certification "
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

// ADD CERTIFICATION
router.post("/", (req, res) => {
  const { cName, issuer, issuedate } = req.body;
  db.raw(
    "INSERT INTO  CERTIFICATION( cNAME , ISSUEDATE , ISSUER) VALUES (?, ? , ?)",
    [cName, issuedate, issuer]
  )
    .then((member) => {
      res.json({
        data: member.insertId,
      });
    })
    .catch((err) => {
      res.status(500).send({ error: "Internal Server Error" });
    });
});

//DELETE CERTIFICATIONS
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.raw("DELETE FROM CERTIFICATION WHERE cID = ?", [id])
    .then((result) => {
      console.log(result);
      res.json({
        data: "Delete Success",
      });
    })
    .catch((err) => {
      console.error("Error:", err);
      res.status(500).send({ error: "Internal Server Error" });
    });
});
module.exports = router;
