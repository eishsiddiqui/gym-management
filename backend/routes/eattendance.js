const express = require("express");
const { db } = require("../db");

const router = express.Router();

//DISPLAY
router.get("/", (req, res) => {
  db.raw("SELECT * FROM EMPLOYEEATTENDANCE ")
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

//ADD
router.post("/", (req, res) => {
  const { empID, status } = req.body;
  db.raw(
    "INSERT INTO EMPLOYEEATTENDANCE ( empno , AttendanceStatus) VALUES (?, ? )",
    [empID, status]
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
  db.raw("DELETE FROM EMPLOYEEATTENDANCE WHERE eaID = ?", [id])
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
