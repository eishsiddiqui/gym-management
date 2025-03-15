const express = require("express");
const { db } = require("../db");

const router = express.Router();

//DISPLAY
router.get("/", (req, res) => {
  db.raw(
    "SELECT MAID , MID , substr(ATTENDANCEDATE , 1 , 10) AS ATTENDANCEDATE  FROM MEMBERATTENDANCE"
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

// add MEMBERATTENDANCE
router.post("/", (req, res) => {
  const { memberId, date } = req.body;
  db.raw(
    "INSERT INTO MEMBERATTENDANCE ( MID , ATTENDANCEDATE) VALUES (? , ?)",
    [memberId, date]
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

//DELETE
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.raw("DELETE FROM MEMBERATTENDANCE WHERE MAID = ?", [id])
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
