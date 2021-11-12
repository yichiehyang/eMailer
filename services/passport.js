const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys= require('../config/keys');
const mongoose = require("mongoose");

const User = mongoose.model('users');

passport.serializeUser((user,done)=>{
    done(null, user.id);//the user id here is not the profile id (googleid), the id here is generated by mongo
    //transfer user id into cookie to save 
});

passport.deserializeUser((id, done)=>{//id here is the user id that save in cookie
    User.findById(id)
        .then(user=>{
            done(null, user) // pull out the info from the mongodb by the id
        })
        //we will get the user info in req.user 
});



passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL:'/auth/google/callback'
    }, (accessToken, refreshToken, profile, done)=>{
        // find the first googleId that is same as retrieved profile.id (it returns a Promise)
        User.findOne({ googleId: profile.id})
            .then((existingUser) =>{
                if (existingUser) {
                    //we already have a record with the given profile Id
                    done(null, existingUser)//null => no error  existingUser we are telling it we are finished
                } else {
                    //we dont have a user record
                    new User({googleId: profile.id})
                        .save() // call save() will save in the mongoose worlds
                        .then(user => done(null, user)); 
                }
            }) 
        
        //refreshToken => can refresh the accessToken
        //console.log(accessToken);
        //console.log(refreshToken);
        //console.log(profile);
    })
);