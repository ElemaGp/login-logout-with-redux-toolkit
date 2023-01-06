const express = require("express");
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const authRoute = require("./routes/auth");

dotenv.config(); //so you can use dotenv

//connecting to MONGODB using mongoose
mongoose.connect(process.env.MONGO_URL, {     //connecting mongoose to dotenv
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>console.log("DB Connection is successful"))
  .catch((err) => console.log(err));

  
  app.use(express.json()); //so that express accepts json requests


  app.use("/api/auth", authRoute);
    


app.listen(8800, ()=>{
    console.log("Backend server is running");
});