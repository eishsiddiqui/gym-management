const express = require("express");
const cors = require("cors");

const { getConnection } = require("./db");

const memberRoutes = require("./routes/members");
const expenseRoutes = require("./routes/expense");
const membershipRoutes = require("./routes/membership");
const memberassessmentRoutes = require("./routes/memberassessment");
const membershiptypeRoutes = require("./routes/membershiptype");
const mattendanceRoutes = require("./routes/mattendance");
const trainerRoutes = require("./routes/trainer");
const certificationsRoutes = require("./routes/certifications");
const adminRoutes = require("./routes/admin");
const equipmentRoutes = require("./routes/equipment");
const employeeRoutes = require("./routes/employee");
const eattendanceRoutes = require("./routes/eattendance");
const salaryRoutes = require("./routes/salary");
const tcertificationsRoutes = require("./routes/tcertifications");
const loginRoutes = require("./routes/login");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
// Middleware for parsing JSON
app.use(express.json());

app.use("/members", memberRoutes);
app.use("/expense", expenseRoutes);
app.use("/membership", membershipRoutes);
app.use("/memberassessment", memberassessmentRoutes);
app.use("/membershiptype", membershiptypeRoutes);
app.use("/mattendance", mattendanceRoutes);
app.use("/trainer", trainerRoutes);
app.use("/certifications", certificationsRoutes);
app.use("/admin", adminRoutes);
app.use("/equipment", equipmentRoutes);
app.use("/employee", employeeRoutes);
app.use("/eattendance", eattendanceRoutes);
app.use("/salary", salaryRoutes);
app.use("/tcertifications", tcertificationsRoutes);
app.use("/login", loginRoutes);

// Route: Test database connection
app.get("/db-test", async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute("SELECT * FROM ADDRESS");
    res.json({
      message: "Database connection successful",
      data: result.rows,
    });
  } catch (err) {
    console.error("Error during database query:", err);
    res.status(500).json({ error: "Database query failed" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the MYSQL App!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
