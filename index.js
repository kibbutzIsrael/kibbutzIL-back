const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// dotenv.config = require({path: './config.env'});

const app = require('./App');

const DB = process.env.DATABASE.replace('<password>', process.env.DB_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("Connection to MongoDB failed:", err));



const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
