const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const config = require("./config");

dotenv.config();

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  
  {
    port: config.development.port,
    host: config.development.host,
    dialect: config.development.dialect,
    
    // dialectOptions:
    //   process.env.NODE_ENV === "development"
    //     ? {}
    //     : {
    //         ssl: {
    //           ca: fs.readFileSync(
    //             path.resolve("config", "ca-certificate3.crt")
    //           ),
    //         },
    //       },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = sequelize;
