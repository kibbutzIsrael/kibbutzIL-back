const express = require("express");
const cors = require("cors");
const expressMongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const app = express();
const swaggerUi = require("swagger-ui-express");
const specs = require("./config/swagger");
const xss = require("xss-clean");
const hpp = require("hpp");

const allowedOrigins = [
  "http://localhost:3001",
  "localhost:3001",
  "http://localhost:3000",
  "localhost:3000",
  "https://kibbutzil-homepage.web.app",
  "kibbutzil-homepage.web.app",
  "https://kibbutzil.com",
  "kibbutzil.com",
];

//routers
const organizationFormRoutes = require("./routes/organizationFormRoutes");
const organizationRoutes = require("./routes/organizationRoutes");
const contactFormRoutes = require("./routes/contactFormRoutes");
const volunteerFormRoutes = require("./routes/volunteerFormRoutes");
const usersRouter = require("./routes/userRoutes");
const maillistRouter = require("./routes/mailingListRoutes");
const emailRoutes = require("./routes/emailRoutes");

//middleware
app.use(helmet());
app.use(express.json());
//sanitation middlewares
app.use(expressMongoSanitize());
app.use(xss());
app.use(
  hpp({
    whitelist: [""],
  })
);

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use("/api", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

// Routes
app.use("/organizations-forms", organizationFormRoutes);
app.use("/organizations", organizationRoutes);
app.use("/contacts-forms", contactFormRoutes);
app.use("/volunteers-forms", volunteerFormRoutes);
app.use("/users", usersRouter);
app.use("/emaillist", maillistRouter);
app.use("/email-sender", emailRoutes);

app.get("/", (req, res) => {
  res.send("<h2>kibbutzIL</h2>");
});
app.get("/single", function (req, res) {
  console.log("single file");

  // Download function provided by express
  res.download("volunteers-CV/rotemh123@gmail.com-CV.pdf", function (err) {
    if (err) {
      console.log(err);
    }
  });
});

module.exports = app;
