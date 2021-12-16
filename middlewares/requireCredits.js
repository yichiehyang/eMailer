module.exports = (req, res, next)=>{ // next = to pass the request to the next middelware
    if(req.user.credits < 1){
        return res.status(403).send({error:'Not enough credits!'});
    }

    next();
};