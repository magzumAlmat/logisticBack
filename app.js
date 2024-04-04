const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
// const rateLimit = require("express-rate-limit");

const passport = require("passport");
const jwtStrategy = require("./passport/jwtStrategy");

const userRoutes = require("./routes/userRoutes");
const companyRoutes = require("./routes/companyRoutes");
const proposalRoutes = require("./routes/proposalRoutes");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
// Access-Control-Allow-Origin *
// дать доступ только с указанных источников
// app.use(cors({
//   origin: 'https://www.example.com'
// }))

app.use(helmet());

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
// });

// app.use("/api", limiter);

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(passport.initialize());
passport.use(jwtStrategy);

app.use("/api/user", userRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/proposals", proposalRoutes);
app.use("/api/warehouses", require("./routes/warehouseRoutes"));
app.use("/api/basket", require("./routes/BasketRoutes"));

app.use("/api/spec/proposals", require("./routes/spec/proposalRoutes"));
app.use("/api/spec/warehouses", require("./routes/spec/warehouseRoutes"));
app.use("/api/spec/basket", require("./routes/spec/BasketRoutes"));
app.use(
  "/api/railway/proposals",
  require("./routes/railway/proposalRailwayRoutes")
);

module.exports = app;
