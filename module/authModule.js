const jwt = require('jsonwebtoken');

exports.AuthorizeUser = async (req, res, next) => {
    // Check whether token exists
    if(!req.headers['token']) return res.status(401).send({msg : "Unauthorized User"});

    // Verify token
    try {
        req.body.user = await jwt.verify(req.headers['token'], process.env.JWT_SECRET_KEY);
        next();
    } catch(err){
        res.send(err);
    }
}

exports.isAdmin = async (req, res, next) => {
    if(req.body.user.existAdmin.role == "Admin")
        next();
    else
        res.status(403).send({msg : "You are not an Admin user"})
}