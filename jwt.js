
const jwt= require('jsonwebtoken');

const jsonAuthMiddleware =(req, res, next) =>{
    //first check req headers has authorizatn or not
    const authorization = req.headers.authorization;
    if(!authorization) return res.status(40).json({error :'Token Not found'});

    //extract the jwt token from the request headers
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error :'Unauthorized'});

    try{
        //verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //this will give us payload value from the coming token

        //attach user info(payload ) to the request obj to access other routes
        req.user = decoded;
        next();
    }
    catch(err){
        console.log(err);
        res.status(401).json({error :'Invalid Token'});
    }
}

//functn to generate JWT token
const generateToken = (userData) =>{
    //generate a new JWT token using user data param
    return jwt.sign({userData} , process.env.JWT_SECRET, {expiresIn :400000});    //3rd arg will tell the expirt time of generated token
}


module.exports = {jsonAuthMiddleware ,generateToken};