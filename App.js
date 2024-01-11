const express = require("express");
const cors = require("cors");
const expressMongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");


const allowedOrigins = [];
//routers
const organizationRoutes = require('./routes/organizationRoutes'); 
const contactRoutes = require('./routes/contactRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const usersRouter = require('./routes/userRoutes');

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
app.use('/organizations', organizationRoutes);
app.use('/contacts', contactRoutes);
app.use('/volunteers', volunteerRoutes);
app.use('/users', usersRouter);
// app.get('/single',function(req,res) {
//   console.log('single file');
   
//   // Download function provided by express
//   res.download('volunteers-CV/Rotem HayunCV.pdf', function(err) {
//       if(err) {
//           console.log(err);
//       }
//   })
// })
// app.use('/api/v1/users', usersRouter);
app.get("/", (req, res) => {
    res.send("<h2>Hello, Alon Kigler and Mongo is the best!!!</h2>");
  });


module.exports = app;