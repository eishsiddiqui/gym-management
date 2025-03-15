const express = require("express");
const { db } = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
  db.raw(
    "SELECT t.TID  , e.FNAME , s.SNAME , t.MTID ,  mt.MTNAME FROM TRAINER t , Employee e , shift s , membershiptype mt where s.sID = t.sID and t.mtID = mt.mtID and t.tID = e.empno"
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

//get TRAINER by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.raw(
    "SELECT tID , H_NO , STREET , AREA , CITY , ZIPCODE , FNAME, LNAME, EMAIL, PHONENUM , EMERGENCYNUM, SALARY , CNIC , HIREDATE , JOB , SID , mtID , SKILLS , substr(ENDDATE , 1 , 10 ) AS ENDDATE from employee e , trainer t , address a where a.AID=e.AID and e.empno = t.tid and tid = ? ",
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

//Update trainer
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    H_NO,
    STREET,
    AREA,
    CITY,
    ZIPCODE,
    FNAME,
    LNAME,
    EMAIL,
    PHONENUM,
    EMERGENCYNUM,
    SALARY,
    CNIC,
    SID,
    mtID,
    SKILLS,
    ENDDATE,
  } = req.body;
  try {
    const addRes = await db.raw("SELECT AID FROM EMPLOYEE where EMPNO = ?", [
      id,
    ]);

    const addressId = addRes[0][0].AID;

    await db.raw(
      "UPDATE ADDRESS SET H_NO = ? , STREET = ? , AREA = ?, CITY = ? , ZIPCODE = ? where AID = ? ",
      [H_NO, STREET, AREA, CITY, ZIPCODE, addressId]
    );

    await db.raw(
      "UPDATE EMPLOYEE SET FNAME = ? , LNAME = ? , EMAIL = ? , PHONENUM = ?, EMERGENCYNUM = ? , SALARY = ? , CNIC = ? , ENDDATE = ? WHERE EMPNO = ? ",
      [FNAME, LNAME, EMAIL, PHONENUM, EMERGENCYNUM, SALARY, CNIC, ENDDATE, id]
    );

    await db.raw(
      "UPDATE TRAINER SET SID = ? ,mtID = ? ,SKILLS = ? where tID = ? ",
      [SID, mtID, SKILLS, id]
    );
    res.send({ message: "Trainer Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// add TRAINER
router.post("/", async (req, res) => {
  const {
    fName,
    lName,
    email,
    phoneNo,
    emergencyNo,
    salary,
    houseNo,
    streetNo,
    area,
    city,
    zipCode,
    cnic,
    shift,
    skills,
    mtID,
  } = req.body;

  const currentDate = new Date().toISOString().slice(0, 10);

  if (!fName) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
  db.raw(
    "INSERT INTO ADDRESS (H_NO , STREET , AREA , CITY , ZIPCODE ) VALUES (? , ?, ?, ? , ?)",
    [houseNo, streetNo, area, city, zipCode]
  )
    .then((result) => {
      const addressId = result[0].insertId;
      db.raw(
        "INSERT INTO EMPLOYEE (AID, FNAME, LNAME, EMAIL, PHONENUM , EMERGENCYNUM, SALARY , CNIC , HIREDATE , JOB ) VALUES (?, ?, ?, ?, ?, ?, ? , ? , ? , 'TRAINER')",
        [
          addressId,
          fName,
          lName,
          email,
          phoneNo,
          emergencyNo,
          salary,
          cnic,
          currentDate,
        ]
      )
        .then((employee) => {
          const employeeId = employee[0].insertId;
          db.raw(
            "INSERT INTO TRAINER (tID , sID , mtID , SKILLS ) VALUES (?, ?, ?, ?)",
            [employeeId, shift, mtID, skills]
          )
            .then((trainer) => {
              res.json({
                data: trainer[0],
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
    })
    .catch((err) => {
      console.error("Error:", err);
      res.status(500).send({ error: "Internal Server Error" });
    });
});

// delete TRAINER
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.raw("DELETE FROM TRAINER WHERE TID = ?", [id])
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
