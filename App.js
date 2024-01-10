const express = require("express");
const cors = require("cors");
const expressMongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");

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
// Routes
// app.use('/api/v1/users', usersRouter);
app.get("/", (req, res) => {
    res.send("<h2>Hello, Alon Kigler and Mongo is the best!!!</h2>");
  });


module.exports = app;