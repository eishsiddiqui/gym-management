const express = require("express");
const { db } = require("../db");

const router = express.Router();

//DISPLAY
router.get("/", (req, res) => {
  db.raw(
    "SELECT EMPNO, FNAME , LNAME , EMAIL , PHONENUM , AREA , CITY , SALARY , JOB , substr(HIREDATE , 1 , 10 ) AS HIREDATE , substr(ENDDATE , 1 , 10) AS ENDDATE FROM EMPLOYEE E , ADDRESS A where A.AID=E.AID"
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

// GET by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.raw(
    "SELECT empno, fName , lName , email , phonenum , emergencynum, area , city , zipcode , h_no ,  street , salary , job , cnic, hiredate , substr(enddate , 1 , 10) as enddate FROM EMPLOYEE , ADDRESS where ADDRESS.AID = employee.AID and empNo = ?",
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

//Update employee
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    fName,
    lName,
    email,
    phonenum,
    emergencynum,
    salary,
    h_no,
    street,
    area,
    city,
    zipcode,
    cnic,
    enddate,
  } = req.body;
  try {
    const addRes = await db.raw("SELECT AID FROM EMPLOYEE where EMPNO = ?", [
      id,
    ]);

    const addressId = addRes[0][0].AID;

    await db.raw(
      "UPDATE ADDRESS SET H_NO = ? , STREET = ? , AREA = ?, CITY = ? , ZIPCODE = ? where AID = ? ",
      [h_no, street, area, city, zipcode, addressId]
    );

    await db.raw(
      "UPDATE EMPLOYEE SET FNAME = ? , LNAME = ? , EMAIL = ? , PHONENUM = ?, EMERGENCYNUM = ? , cnic = ? , salary = ?  , ENDDATE = ? WHERE EMPNO = ? ",
      [fName, lName, email, phonenum, emergencynum, cnic, salary, enddate, id]
    );
    res.send({ message: "EMPLOYEE Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//  add EMPLOYEE
router.post("/", async (req, res) => {
  const {
    fName,
    lName,
    email,
    phoneNo,
    emergencyNo,
    salary,
    job,
    houseNo,
    streetNo,
    area,
    city,
    zipCode,
    cnic,
  } = req.body;

  const currentDate = new Date().toISOString().slice(0, 10);

  db.raw(
    "INSERT INTO ADDRESS (H_NO , STREET , AREA , CITY , ZIPCODE ) VALUES (? , ?, ?, ? , ?)",
    [houseNo, streetNo, area, city, zipCode]
  )
    .then((result) => {
      const addressId = result[0].insertId;
      db.raw(
        "INSERT INTO EMPLOYEE (AID, FNAME, LNAME, EMAIL, PHONENUM , EMERGENCYNUM, HIREDATE, SALARY, JOB, CNIC) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          addressId,
          fName,
          lName,
          email,
          phoneNo,
          emergencyNo,
          currentDate,
          salary,
          job,
          cnic,
        ]
      )
        .then((employee) => {
          res.json({
            data: employee.insertId,
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

//DELETE EMPLOYEE
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.raw("DELETE FROM EMPLOYEE WHERE EMPNO = ?", [id])
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
