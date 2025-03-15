const express = require("express");
const { db } = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
  db.raw(
    "SELECT MID ,MAID, substr(ASSESSMENTDATE , 1 , 10 ) AS ASSESSMENTDATE , WEIGHT , HEIGHT , BMI FROM MEMBERASSESSMENT"
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

//get MEMBERASSESSMENT by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.raw(
    "SELECT MID , MAID , substr(ASSESSMENTDATE , 1 , 10 ) AS ASSESSMENTDATE , WEIGHT , HEIGHT , BMI FROM MEMBERASSESSMENT WHERE MAID = ?",
    [id]
  )
    .then((result) => {
      res.json({
        data: result[0][0],
      });
    })
    .catch((err) => {
      console.error("Error:", err);
      res.status(500).send({ error: "Internal Server Error" });
    });
});

// Update MEMBERASSESSMENT
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { MID, ASSESSMENTDATE, WEIGHT, HEIGHT, BMI } = req.body;
  try {
    await db.raw(
      "UPDATE  MEMBERASSESSMENT SET  MID = ? , ASSESSMENTDATE = ? , weight = ?  , height = ?  , bmi = ?  where MAID = ?",
      [MID, ASSESSMENTDATE, WEIGHT, HEIGHT, BMI, id]
    );
    res.send({ message: "Member Assessment Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// add MEMBERASSESSMENT
router.post("/", (req, res) => {
  const { memberId, date, weight, height, bmi } = req.body;
  db.raw(
    "INSERT INTO MEMBERASSESSMENT ( MID , ASSESSMENTDATE , weight , height , bmi) VALUES (?, ? , ? , ? , ?)",
    [memberId, date, weight, height, bmi]
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

//DELETE ASSESSMENT RECORD
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.raw("DELETE FROM MEMBERASSESSMENT WHERE MAID = ?", [id])
    .then((result) => {
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
