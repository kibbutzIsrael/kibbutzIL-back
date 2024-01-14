const express = require("express");
const cors = require("cors");
const expressMongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");

const organizationRoutes = require("./routes/organizationRoutes");
const contactRoutes = require("./routes/contactRoutes");
const volunteerRoutes = require("./routes/volunteerRoutes");
const mailingListRoutes = require("./routes/mailingListRoutes");

const specs = require("./config/swagger");

const allowedOrigins = [];
//routers
// const usersRouter = require('./routes/userRoutes');
const app = express();


//middleware
app.use(express.json());
app.use(expressMongoSanitize());
app.use(helmet());

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use(
  "/api",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

// Routes
app.use('/organizations', organizationRoutes);
app.use('/contacts', contactRoutes);
app.use('/volunteers', volunteerRoutes);
app.use('/mailingList', mailingListRoutes);

// app.use('/api/v1/users', usersRouter);
app.get("/", (req, res) => {
  res.send("<h2>Hello, Alon Kigler and Mongo is the best!!!</h2>");
});


module.exports = app;