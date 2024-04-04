const dotenv = require("dotenv");
const sequelize = require("./config/db");

process.on("uncaughtException", (err) => {
  console.log("НЕ ПОЙМАННОЕ ИСКЛЮЧЕНИЕ! 💥 Завершение работы...");
  console.log(err.name, err.message);
  console.log(err);
  process.exit(1);
});

dotenv.config();
const app = require("./app");

const port = process.env.PORT || 5000;

async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully.",
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1); // Exit the application if the database connection fails
  }
}

testDatabaseConnection();

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("НЕОБРАБОТАННЫЙ ОТКАЗ! 💥 Завершение работы...");
  console.log(err.name, err.message);
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM ПОЛУЧЕН. Изящное завершение работы");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
