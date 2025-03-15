const express = require("express");
const { db } = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
  db.raw(
    "SELECT ms.MSID ,ms.MID ,  m.FNAME , m.LNAME  ,mt.MTNAME  , ms.AMOUNT , substr(ms.STARTDATE ,1 ,  10) as STARTDATE , substr(DATE_ADD(ms.STARTDATE, INTERVAL (mt.duration) MONTH) , 1 , 10) as ENDDATE , ms.tid from member m , membership ms , membershiptype mt where m.mid = ms.mid and ms.mtid = mt.mtid order by MSID desc"
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

// get MEMBERSHIP by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.raw(
    "SELECT MSID , MID , startdate , mtID , paymentMethod , transactionID , tID from membership where MSID = ?",
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

// UPDATE MEMBERSHIP
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { MID, mtID, paymentMethod, transactionID, tID } = req.body;
  try {
    await db.raw(
      "UPDATE MEMBERSHIP SET  MID = ?  , mtID = ? , paymentMethod = ? , transactionID = ? , tID = ?  where MSID = ?",
      [MID, mtID, paymentMethod, transactionID, tID, id]
    );
    res.send({ message: "MemberShip Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// add MEMBERSHIP
router.post("/", async (req, res) => {
  const { memberId, date, mstype, paymethod, transactionID, trainerID } =
    req.body;
  const amount = await db.raw(
    "SELECT price FROM MEMBERSHIPTYPE WHERE mtid = ?",
    [mstype]
  );

  const amountpaid = amount[0][0].price;

  await db
    .raw(
      "INSERT INTO MEMBERSHIP ( MID , startdate , mtID , paymentMethod , transactionID , tID , amount ) VALUES (? , ? , ? , ? , ? , ? , ? )",
      [memberId, date, mstype, paymethod, transactionID, trainerID, amountpaid]
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

// delete MEMBERSHIP
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.raw("DELETE FROM MEMBERSHIP WHERE MSID = ?", [id])
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
