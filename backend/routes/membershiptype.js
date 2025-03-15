const express = require("express");
const { db } = require("../db");
const router = express.Router();

router.get("/", (req, res) => {
  db.raw("SELECT * FROM MEMBERSHIPTYPE")
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

// add MEMBERSHIPTYPE
router.post("/", (req, res) => {
  const { mtname, duration, price, tlevel } = req.body;
  db.raw(
    "INSERT INTO MEMBERSHIPTYPE ( MTNAME , DURATION , PRICE , TRAINERLEVEL) VALUES (?, ? , ? , ?)",
    [mtname, duration, price, tlevel]
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
  db.raw("DELETE FROM MEMBERSHIPTYPE WHERE MTID = ?", [id])
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
