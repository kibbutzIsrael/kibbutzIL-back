const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const expressMongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");

app.use(expressMongoSanitize());
app.use(helmet());

mongoose
  .connect("mongodb://1223d:1223d@mongo:27017/?authSource=admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("Connection to MongoDB failed:", err));

app.use(express.json());

const allowedOrigins = [];

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.get("/", (req, res) => {
  res.send("<h2>Hello, Alon Kigler and Mongo is the best!!!</h2>");
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
