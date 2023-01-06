const router = require("express").Router();
const User = require("../models/User"); //importing the User from models
const CryptoJS = require("crypto-js"); //library for hashing and unhashing password
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) =>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(     //this hashes the password
          req.body.password, 
          process.env.SECRET_KEY  //and adds the secret key which i put in env file for this project
          ).toString(), 
    });

    try{
        const user = await newUser.save(); //here the new user is saved to the mongodb database using the "mongoose.schema" (in the User model) 
        res.status(201).json(user);
    }catch(err){
        res.status(500).json(err);
    }
    });

    
    //LOGIN
    router.post("/login", async (req, res)=>{
        try{
            const user = await User.findOne({email: req.body.email}); //checking if the input user email exists in the database
            !user && res.status(401).json("Wrong password or email");

            const bytes  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY); //unhashing(decrypting) the original password in database
            const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

            originalPassword !== req.body.password &&       //comparing original password in database vs the input password
               res.status(401).json("Wrong password or email");

               const accessToken = jwt.sign(        //creating a jwt
                {id: user._id, isAdmin: user.isAdmin},
                process.env.SECRET_KEY,{ expiresIn: "5d" }
                ); 

               const {password, ...info} = user._doc //destructuring the user object's properties into "password" and other "info"

        res.status(200).json({...info, accessToken}); /*sending the "info" and not the password as the json response. Also sending the jwt access token*/ 
        }catch(err){
            console.log("An error occurred during login");
        }
    });

module.exports = router;