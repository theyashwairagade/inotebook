// checking importation from terminal 
const express=require('express');
const {body,validationResult}=require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// importing models
const User = require('../models/User');

// importing middleware
var fetchUser=require('../middleware/fetchUser');

// genereal initilisation
const JWT_SECRET='Harryisagoodb$y';
const router=express.Router();





//ROUTE 1: create a user using: POST "/api/auth/createuser". No login required
router.post('/createuser',[

    // all validations here 
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be 8 characters').isLength({min:8}),
], async(req, res) => {

    // Check validatin result
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    // check whether user with the same email already exists
    try {
        let user=await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({error:"Sorry a user with this email already exists"})
        }


        // Hash the password and create a new user
        const salt=await bcrypt.genSalt(10);
        const secPass=await bcrypt.hash(req.body.password,salt) 
        user=await User.create({
            name:req.body.name,
            email:req.body.email,
            password:secPass
        });

        // Generate JWT token and send it in the response
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,JWT_SECRET);
        res.json({authtoken})

    // Error handling
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})





//ROUTE2: authenticate a user using: POST "/api/auth/login". No login required
router.post('/login',[

    // all input validations 
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists()
], async(req, res) => {

    // Check validation error
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    // Find user and compare password
    const {email,password}=req.body;
    try {
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }
        const passwordCompare=await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }

        // Genererate and send JWT token
        const data={
            user:{
                id:user.id
            }
        }

        const authtoken=jwt.sign(data,JWT_SECRET);
        res.json({authtoken})

        // Error handling
    }catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})





// ROUTE 3: Get logged in user details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchUser, async (req, res) => {// here fetchUser is a middleware

    // Retrive user details
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");

        res.send(user);// Sending response

    // Error handling
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
});


module.exports=router;// Exports router