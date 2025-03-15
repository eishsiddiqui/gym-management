const express = require("express");
const { db } = require("../db");

const router = express.Router();
router.get("/", (req, res) => {
  db.raw(
    "SELECT eID , substr(ExDate , 1 , 10) as ExDate , Type , Amount , empNo  FROM EXPENSE order by eID desc"
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

//ADD EXPENSE
router.post("/", (req, res) => {
  const { type, date, price, adminID } = req.body;
  db.raw(
    "INSERT INTO EXPENSE ( TYPE , EXDATE , AMOUNT , EMPNO) VALUES (?, ? , ? , ? )",
    [type, date, price, adminID]
  )
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

//DELETE EXPENSE
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.raw("DELETE FROM EXPENSE WHERE EID = ?", [id])
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
