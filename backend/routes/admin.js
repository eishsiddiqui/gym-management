const express = require("express");
const { db } = require("../db");

const router = express.Router();

//DISPLAY
router.get("/", (req, res) => {
  db.raw("SELECT * FROM ADMIN")
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
    "SELECT H_NO , STREET , AREA , CITY , ZIPCODE , FNAME, LNAME, EMAIL, PHONENUM , EMERGENCYNUM, SALARY , CNIC , HIREDATE   , substr(ENDDATE , 1 , 10 ) AS ENDDATE , USERNAME , PASSWORD from employee e , admin ad , address a where a.AID=e.AID and e.empno = ad.empno and ad.empno = ?  ",
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

//Update ADMIN
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
    USERNAME,
    PASSWORD,
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
      "UPDATE ADMIN SET USERNAME = ? , PASSWORD = ? where empno = ? ",
      [USERNAME, PASSWORD, id]
    );
    res.send({ message: "ADMIN Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// add ADMIN
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
    uname,
    passwd,
  } = req.body;

  const currentDate = new Date().toISOString().slice(0, 10);

  db.raw(
    "INSERT INTO ADDRESS (H_NO , STREET , AREA , CITY , ZIPCODE ) VALUES (? , ?, ?, ? , ?)",
    [houseNo, streetNo, area, city, zipCode]
  )
    .then((result) => {
      const addressId = result[0].insertId;
      db.raw(
        "INSERT INTO EMPLOYEE (AID, FNAME, LNAME, EMAIL, PHONENUM , EMERGENCYNUM, SALARY , CNIC , HIREDATE , JOB ) VALUES (?, ?, ?, ?, ?, ?, ? , ? , ? , 'ADMIN')",
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
            "INSERT INTO ADMIN (empno , username , password) VALUES (?, ?, ?)",
            [employeeId, uname, passwd]
          )
            .then((admin) => {
              res.json({
                data: admin[0],
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

//DELETE
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.raw("DELETE FROM ADMIN WHERE EMPNO = ?", [id])
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
