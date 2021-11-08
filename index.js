const express = require('express');
const app = express();

app.get('/',(req,res) => {
    res.send({'hi':'esefsdf'})
})



const PORT = process.env.PORT || 5000;
//heroku will search for process.env.PORT 
app.listen(PORT);