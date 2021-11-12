//key.js - figureo out what set of credentials to return
//heroku will read process.env... things like process.env.PORT  
if (process.env.NODE_ENV === 'production'){
    //we are in production - return the prod set of keys
    module.exports = require('./prod'); 
}else{
    //we are in development - return the dev keys
    module.exports = require('./dev');
}


