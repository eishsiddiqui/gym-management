const express = require("express");
const { db } = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
  db.raw(
    "SELECT eqID ,eqName , category,substr(purchaseDate,1,10) as purchaseDate ,status,price,empNo FROM EQUIPMENT order by eqID desc"
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

// get by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.raw(
    "SELECT eqname , category,substr(purchaseDate,1,10) as purchasedate ,status,price,empno FROM EQUIPMENT where eqID = ?",
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

// Update EQUIPMENT
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { eqname, category, purchasedate, status, price, empno } = req.body;
  try {
    await db.raw(
      "UPDATE  EQUIPMENT SET  EQname = ? , category = ?, purchasedate  = ?  , status = ? , price = ? , empno = ?   where EQID = ?",
      [eqname, category, purchasedate, status, price, empno, id]
    );
    res.send({ message: "Equipment Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//ADD EQUIPMENT
router.post("/", (req, res) => {
  const { name, category, date, status, price, adminID } = req.body;
  db.raw(
    "INSERT INTO EQUIPMENT ( eqNAME , CATEGORY , PURCHASEDATE , STATUS , PRICE , EMPNO) VALUES (?, ? , ? , ? , ? , ? )",
    [name, category, date, status, price, adminID]
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

//DELETE EQUIPMENT
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.raw("DELETE FROM EQUIPMENT WHERE eqID = ?", [id])
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
