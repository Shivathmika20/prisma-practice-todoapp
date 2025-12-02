import { JWT_SECRET } from "../lib/config"
import jwt, { JwtPayload } from "jsonwebtoken"
import { Request,Response ,NextFunction} from "express"

interface AuthRequest extends Request {
    id?: number;
  }

const authMiddleware=async (req:AuthRequest,res:Response,next:NextFunction)=>{
    
    try{
        const token=req.headers.authorization
        if (!token) return res.status(401).json({ error: "Token missing" });
        const decoded=jwt.verify(token ,JWT_SECRET!) as jwt.JwtPayload
        (req as any ).id=decoded.id
        next()
    }
    catch(e){
        res.status(401).json({error:"Unauthorized"})
    }

}

export default authMiddleware