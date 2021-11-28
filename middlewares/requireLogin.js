module.exports = (req, res, next)=>{ // next = to pass the request to the next middelware
    if(!req.user){
        return res.status(401).send({error:'You must log in!'});
    }

    next();
};

