import { signupSchema, userInput } from "../zod-schema"
import { Request, Response } from "express";
import {prisma} from '../lib/prisma'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../lib/config";


export const signup=async (req:Request,res:Response)=>{
    const result=signupSchema.safeParse(req.body)
    if(!result.success){
        const msg=result.error.issues.map((err)=>(err.message))
        return res.status(400).json({
            error:'validation failed',
            details:msg
        })
    }
    try{
        const {username,password}=result.data as userInput
        const existingUser=await prisma.user.findFirst({
                where:{
                    username
                }
        })
        if(existingUser)
        {
            return res.status(403).json({error:"Username already exists"});
        }

            const hashedpassword=await bcrypt.hash(password,10)
            await prisma.user.create({
                data:{
                    username:username,
                    password:hashedpassword
                }
            })
            return res.status(200).json({message:"User signed up successfully"});
    
    }catch(e){
        return res.status(500).json({error:"Failed to create user"});
    }
       
}

export const signin=async (req:Request,res:Response)=>{
    try{
        const {username,password}=req.body as userInput
        const userInfo=await prisma.user.findFirst({
            where:{
                username
            }
        })
        if(!userInfo) {
            return res.status(401).json({ error: "User not found please signup" });
        }
        const isPasswordValid=await bcrypt.compare(password,userInfo.password)
        if(isPasswordValid) {
            if (!JWT_SECRET) {
               throw new Error('JWT_SECRET is not defined in config');
            }
            const token = jwt.sign(
               { id: userInfo.id},
               JWT_SECRET,
               { expiresIn: "1h" }
            );
            return res.status(200).json({ token });
         } else {
            return res.status(401).json({ error: "Invalid password" });
         }

    }
    catch(error){
        res.status(500).json({error:"Failed to sign in try again later"});
     }
}