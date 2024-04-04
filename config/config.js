const fs = require("fs");
const path = require("path");

module.exports = {
  development: {
    username: "admin",
    password: "root",
    database: "postgres",
    // database: "pandora_db",
    host: "localhost",
    dialect: "postgres",
    port: 5432,
    schema: "public",
  },
  test: {
    username: "info_comp",
    password: "123456",
    database: "test_db",
    host: "localhost",
    dialect: "postgres",
    port: 5433,
    schema: "public",
  },
  production: {
    username: "info_comp",
    password: "123456",
    database: "test_db",
    host: "localhost",
    dialect: "postgres",
    port: 5433,
    schema: "public",
    // username: "doadmin",
    // password: "AVNS_8AQvthDXQ2enLTnPwuL",
    // database: "defaultdb2",
    // host: "db-postgresql-sgp1-17248-do-user-15552454-0.c.db.ondigitalocean.com",
    // port: 25060,
    // dialect: "postgres",
    // sslmode: "require",
    // dialectOptions: {
    //   ssl: {
    //     ca: fs.readFileSync(path.resolve("config", "ca-certificate3.crt")),
    //   },
    // },
  },
};
