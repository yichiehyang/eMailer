const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require('./config/keys');
const { cookieKey } = require('./config/keys');
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);
const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, //how long the cookie can survive we use 30 days
        keys:[keys.cookieKey] // use list that can save multiple key and it will pick one 
    })
)

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);


const PORT = process.env.PORT || 5000;
//heroku will search for process.env.PORT 
app.listen(PORT);