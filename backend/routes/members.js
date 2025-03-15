const express = require("express");
const { db } = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
  db.raw(
    "SELECT MID , fname , lname , email , phonenum , emergencynum , area , city ,  substr(creationdate , 1 , 10) AS creationdate FROM MEMBER m , ADDRESS a where m.AID=a.AID"
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
    "SELECT MID , fname , lname , email , phonenum , emergencynum , area , city , zipcode , h_no , street   FROM MEMBER m , address a where a.aid = m.aid and  mid = ?",
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

//Update Member
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    fname,
    lname,
    email,
    phonenum,
    emergencynum,
    area,
    city,
    zipcode,
    h_no,
    street,
  } = req.body;
  try {
    const addRes = await db.raw("SELECT AID FROM MEMBER where MID = ?", [id]);

    const addressId = addRes[0][0].AID;

    await db.raw(
      "UPDATE ADDRESS SET H_NO = ? , STREET = ? , AREA = ?, CITY = ? , ZIPCODE = ? where AID = ? ",
      [h_no, street, area, city, zipcode, addressId]
    );

    await db.raw(
      "UPDATE MEMBER SET FNAME = ? , LNAME = ? , EMAIL = ? , PHONENUM = ?, EMERGENCYNUM = ? WHERE MID = ? ",
      [fname, lname, email, phonenum, emergencynum, id]
    );
    res.send({ message: "Member Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// add member
router.post("/", async (req, res) => {
  const {
    fName,
    lName,
    email,
    phoneNo,
    emergencyNo,
    houseNo,
    streetNo,
    area,
    city,
    zipCode,
  } = req.body;

  const currentDate = new Date().toISOString().slice(0, 10);

  db.raw(
    "INSERT INTO ADDRESS (H_NO , STREET , AREA , CITY , ZIPCODE ) VALUES (? , ?, ?, ? , ?)",
    [houseNo, streetNo, area, city, zipCode]
  )
    .then((result) => {
      const addressId = result[0].insertId;
      db.raw(
        "INSERT INTO MEMBER (AID, FNAME, LNAME, EMAIL, PHONENUM , EMERGENCYNUM, CREATIONDATE) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [addressId, fName, lName, email, phoneNo, emergencyNo, currentDate]
      )
        .then((member) => {
          res.json({
            data: member.insertId,
          });
        })
        .catch((err) => {
          console.error("Error:", err);
          res.status(500).send({ error: "Internal Server Error" });
        });
    })
    .catch((err) => {
      console.error("Error:", err);
      res.status(500).send({ error: "Internal Server Error" });
    });
});

//DELETE
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.raw("DELETE FROM MEMBER WHERE MID = ?", [id])
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
