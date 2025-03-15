const express = require("express");
const { db } = require("../db");

const router = express.Router();

router.post("/", async (req, res) => {
  const { uname, passwd } = req.body;

  if (!uname || !passwd) {
    return res
      .status(400)
      .send({ message: "Username and password are required." });
  }

  try {
    const result = await db.raw(
      "SELECT * FROM ADMIN WHERE username = ? AND password = ?",
      [uname, passwd]
    );

    const rows = result[0] || result.rows || result;

    if (rows.length > 0) {
      res.send(rows);
    } else {
      res.status(401).send({ message: "WRONG USERNAME OR PASSWORD" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
