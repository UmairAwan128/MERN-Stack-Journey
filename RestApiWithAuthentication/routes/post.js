const router = require('express').Router();
const verify = require('./verifyToken'); //get our middleware which checks if the request header has valid token
//so this route will be protected and can be accessed by loggedIn users only as second parameter here is call to the 
//our middleware functon which checks token in the requst header.
router.get('/' ,verify ,(req,res)=>{
     res.json({
        posts: {
            title: 'this is a protected Post',
            description: 'this post can only be accessed by LoggedIn user',
        }     
     });
     //we can also access here the user details who is loggedIn as req.user
     // res.send(req.user);
});

module.exports = router