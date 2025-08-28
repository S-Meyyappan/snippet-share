import jwt from "jsonwebtoken"

const authenticate=(req,res,next)=>{
    try {
    const authHeader=req.headers["authorization"]

    if(!authHeader || !authHeader.startsWith("Bearer"))
    {
        return res.status(401).json({ message: "No token provided" });
    }

    const token=authHeader.split(" ")[1]

    const verifyToken=jwt.verify(token,process.env.JWT_SECRET)
    req.user=verifyToken
    next()
    } 
    catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

export default authenticate