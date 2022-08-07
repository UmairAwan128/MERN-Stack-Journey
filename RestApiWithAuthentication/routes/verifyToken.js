const jwt = require('jsonwebtoken');
//creating a middleware which will check if the request or user has token if yes he can access the route else he cannot.
//so any route we want protected to only loggedIn/Tokened user we will add this middleware function there
module.exports =  function(req, res, next) {
   const token = req.header('auth-token');  //get token from auth-token header if its sent
   if(!token)
     return res.status(401).send('Access Denied.');
   
   try{
     const verified = jwt.verify(token, process.env.TOKKEN_SECRET); //verify the token user sent
     req.user = verified; // so user is verified so /assign that the user is verifed this will have the userID
     next(); //now call protected if all validations worked fine
   }
   catch(err){
     res.status(400).send('Invalid Token');
   }
}