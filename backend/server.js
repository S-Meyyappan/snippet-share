import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

import connectDb from "./db.js"
import Submission from "./models/model.js"
import User from "./models/user.js"
import authenticate from "./middleware.js";


dotenv.config()


const app=express()
await connectDb()

//middleware
app.use(cors())
app.use(express.json({limit:"10mb"}))

//api calls
app.post("/register",async (req,res)=>{
    try{
      const{username,email,password}=req.body;

      const existingUser=await User.findOne({email})
      if(existingUser){
        return res.status(400).json({message:"User already registered"})
      }
      
      const salt=await bcrypt.genSalt(10)
      const hashedpassword=await bcrypt.hash(password,salt)

      const userSubmission=new User({username,email,password:hashedpassword})
      await userSubmission.save()

      const token=jwt.sign(
        {id:userSubmission._id,email:userSubmission.email},
        process.env.JWT_SECRET,
        {expiresIn:"12h"}
      )

      res.json(token)
    }
    catch(err){
      console.error(err)
      return res.status(500).json({message:"Unable to register user",error:err})
    }
})

app.post("/login",async(req,res)=>{
  try{
    const{email,password}=req.body

    const userFind=await User.findOne({email})
    if(!userFind)
    {
      return res.status(400).json({message:"Invalid EmailID"})
    }

    const passMatch=await bcrypt.compare(password,userFind.password)
    if(!passMatch)
    {
      return res.status(400).json({message:"Incorrect Password"})
    }

    const token=jwt.sign(
      {id:userFind._id,email:userFind.email},
      process.env.JWT_SECRET,
      {expiresIn:"12h"}
    )

    res.json(token)
  }
  catch(err){
      return res.status(500).json({message:"Unable to login",error:err})
  }
})


app.post("/submissions",authenticate, async (req,res)=>{
    try{
        const submission=new Submission({...req.body, user:req.user.id })
        await submission.save()
        res.status(201).json(submission)
    }
    catch(err)
    {
        res.status(500).json({message:"Unable to post data ",error:err})
    }
})

app.get("/submissions", async (req, res) => {
  try {
    const submissions = await Submission.find({ visibility: true }).populate("user","username");
    res.json(submissions);
  } catch (err) {
    console.error("Error fetching submissions:", err); // <--- log full error
    res.status(500).json({
      message: "Error fetching submissions",
      error: err.message || err,
    });
  }
});

app.get("/mysubmissions", authenticate, async (req, res) => {
  try {
    const submissions = await Submission.find({ user: req.user.id })
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user submissions", error: err.message });
  }
});


app.get("/snippet/:id",async(req,res)=>{
  try
  {
    const result = await Submission.findById(req.params.id) 
    if (!result || !result.visibility) {
      return res.status(404).json({ message: "Snippet not found" })
  }
    res.json(result)
  }catch(err){
    res.status(500).json({message:"Invalid Id",error:err})
  }
})

app.delete("/mysubmissions/:id",authenticate,async (req,res)=>{
  try{
    const id=req.params.id
    const userId=req.user.id

    const submission=await Submission.findOne({_id:id,user:userId})
    if (!submission) {
      return res.status(404).json({ error: "Submission not found or not authorized" });
    }

    await Submission.deleteOne({_id:id})
    res.json({ message: "Submission deleted successfully" });
  } catch (error) {
    console.error("Error deleting submission:", error);
    res.status(500).json({ error: "Server error" });
  }
})

app.get("/",(req,res)=>{
    res.send("Hello !")
})

//server start
app.listen(process.env.port || 5000,()=>{
    console.log("Server started")
})