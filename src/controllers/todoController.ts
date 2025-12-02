import { Request,Response } from "express"
import {prisma} from '../lib/prisma'
import { todoSchema } from "../zod-schema"

export const createTodo=async(req:Request,res:Response)=>{
    const result=todoSchema.safeParse(req.body)
    const userId=(req as any).id
    if(!result.success){
        const msg=result.error.issues.map((err)=>(err.message))
        return res.status(400).json({
            error:'validation failed',
            details:msg
        })
    }
    try{
        const {title,description,done}=result.data
        await prisma.todo.create({
            data:{
                title,
                description,
                done,
                userId
            }
        })
        res.status(200).json({message:"todo created successsfully"})
    }
    catch(e){
        console.error("Content creation error:", e);
        return res.status(500).json({ error: "Failed to create todo" });
    }

    
}

export const getTodo=async (req:Request,res:Response)=>{
    const userId=(req as any).id
    try{
        const todosInfo=await prisma.todo.findMany({
            where:{
                userId
            }
        })
        res.status(200).json({
            message:"todo fetched successfully",
            todos:todosInfo
        })

    }catch(e){
        console.log(e)
        res.status(500).json({
            message:"couldnt fetch"
        })

    }
    
}

