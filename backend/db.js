const knex = require("knex");

const db = knex({
  client: "mysql2", // MySQL client
  connection: {
    host: "localhost",
    user: "root", // Replace with your MySQL username
    password: "bcsf22m513", // Replace with your MySQL password
    database: "gym_management", // Replace with your MySQL database name
  },
});

module.exports = { db };
