const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require('./config/keys');
const { cookieKey } = require('./config/keys');
require("./models/User");
require("./models/Survey");
require("./services/passport");

mongoose
     .connect( keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => console.log( 'Database Connected' ))
     .catch(err => console.log( err ));
const app = express();

app.use(express.json());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, //how long the cookie can survive we use 30 days
        keys:[keys.cookieKey] // use list that can save multiple key and it will pick one 
    })
)

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production'){
    //Express will serve up production assets
    //like our main.js file or main.css file
    app.use(express.static('client/build'));

    //Express will serve up the index.html file 
    //if it does not recognize the route
    const path = require('path');
    app.get('*', (req,res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000;
//heroku will search for process.env.PORT 
app.listen(PORT);