const router = require('express').Router();
const User = require("../model/User");
const jwt = require('jsonwebtoken');  //for managing security of applications with token and to give user a token when he logsin
const bcrypt = require("bcryptjs");  //is used for hashing/encrypting password.

const { registerValidation, loginValidation } = require("../validation");

router.post('/register', async (req,res)=>{

    //validate data before creating user using the JOI.
    const {error} = registerValidation(req.body);
    if(error)
      res.status(400).send(error.details[0].message);
    
    //check if email is already in DB i.e should be unique
    const emailExist = await User.findOne( { email:req.body.email } );
    if(emailExist)
      res.status(400).send("Email already exist try another one.");
    
    //Hash Password
    const salt = await bcrypt.genSalt(10); //generate hash of level 10 complexity or its no of hashing rounds
    const hashedPassword = await bcrypt.hash( req.body.password, salt ); 

    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword 
    });
    try{
       const savedUser = await user.save();
       res.send({ user : savedUser._id}); 
    }
    catch(err){
       res.status(400).send(err);
    }
});

router.post('/login',async (req,res)=>{
    //validate data before logining user using the JOI.
    const {error} = loginValidation(req.body);
    if(error)
      res.status(400).send(error.details[0].message);
    
    //check if user is in DB i.e if user is registered
    const user = await User.findOne( { email:req.body.email } );
    if(!user)
      res.status(400).send("Email doesnot found.");
    
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if(!isValidPassword)
      res.status(400).send("Invalid Password.");
    
    //create and assign user a tokken.
    //generate a tokken for this specific user use the TOKKEN_SECRET which we defined in .env and it can be any string
    //and is only in our project and this will be third part of the JWT whose value is only known to our project 
    const token = jwt.sign({ _id: user._id },process.env.TOKKEN_SECRET);
    res.header('auth-token',token).send(token); //send the token both in response body and also in the response header  
});

module.exports = router