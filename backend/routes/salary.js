const express = require("express");
const { db } = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
  db.raw(
    "SELECT s.sID , e.EMPNO , e.fname , e.lname , e.job , e.salary , s.bonuspay , s.deductions , (e.salary + COALESCE(s.bonuspay, 0) - COALESCE(s.deductions, 0)) AS netpay , substr(s.salarydate,1 , 10) as salarydate from employee e , salary s where s.empno = e.empno order by sID"
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

//Add Salary Record
router.post("/", async (req, res) => {
  const { empID, date, bonus, deductions, transactionID, bank } = req.body;

  try {
    const salaryResult = await db.raw(
      "SELECT salary FROM EMPLOYEE WHERE empno = ?",
      [empID]
    );

    if (salaryResult[0].length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    const basic = salaryResult[0][0].salary;

    const insertResult = await db.raw(
      "INSERT INTO SALARY (EMPNO, SALARYDATE, BASICPAY, BONUSPAY, DEDUCTIONS, TRANSACTIONID, BANKNAME) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [empID, date, basic, bonus, deductions, transactionID, bank]
    );

    res.status(200).json({
      message: "Salary record added successfully",
      data: { salaryID: insertResult[0].insertId },
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Delete Salary Record
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.raw("DELETE FROM SALARY WHERE sID = ?", [id])
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
