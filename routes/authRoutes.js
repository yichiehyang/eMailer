const passport = require('passport');

module.exports =(app) =>{
    //ask user for authentication and google will give the code
    app.get('/auth/google', passport.authenticate('google',{
        scope:['profile','email']
    }))

    //getting code we do again the passport.authenticate to pass the code to Google
    app.get('/auth/google/callback', passport.authenticate('google'))

    app.get('/api/logout', (req,res)=>{
        req.logout(); //logout() is a function in passport
        res.send(req.user); // it wont print out any user because we logged out 
    });
    
    app.get('/api/current_user', (req,res)=>{
        res.send(req.user);
    });
};
