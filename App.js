const express = require("express");
const cors = require("cors");
const expressMongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const app = express();


const allowedOrigins = [];

//routers
const organizationFormRoutes = require('./routes/organizationFormRoutes'); 
const organizationRoutes = require('./routes/organizationRoutes')
const contactFormRoutes = require('./routes/contactFormRoutes');
const volunteerFormRoutes = require('./routes/volunteerFormRoutes');
const usersRouter = require('./routes/userRoutes');
const maillistRouter = require('./routes/mailingListRoutes');
const emailRoutes = require('./routes/emailRoutes');

const swaggerUi = require("swagger-ui-express");
const specs = require("./config/swagger");
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
app.use('/organizations-forms', organizationFormRoutes);
app.use('/organizations', organizationRoutes);
app.use('/contacts-forms', contactFormRoutes);
app.use('/volunteers-forms', volunteerFormRoutes);
app.use('/users', usersRouter);
app.use('/emaillist', maillistRouter);
app.use('/email-sender', emailRoutes);

app.get("/", (req, res) => {
  res.send("<h2>Hello, Alon Kigler and Mongo is the best!!!</h2>");
});
app.get('/single',function(req,res) {
  console.log('single file');
   
  // Download function provided by express
  res.download('volunteers-CV/Rotemh123@gmail.com-CV.pdf', function(err) {
      if(err) {
          console.log(err);
      }
  })
})


module.exports = app;