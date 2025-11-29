import express from "express";
import  {PORT} from './lib/config'
import authRouter from "./routes/authRoute";
import todoRouter from "./routes/todoRoute";

const app=express()
app.use(express.json())

app.use('/api/auth',authRouter)
app.use('/api/todos',todoRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});




// const updateUser=async (username:string,password:string)=>{
//     try{
//         const res=await prisma.user.update({
//             where:{username},
//             data:{
//                 password:password
//             }
//         })
//         console.log("user updated"+res)
//     }
//     catch(e)
//         {
//             console.log(e)
//         }

// }

// updateUser("shiva","5346324")

// const getUser=async (username:string)=>{
//     try{
//         const res=await prisma.user.findMany()
//         console.log(res)
//     }
//     catch(e)
//         {
//             console.log(e)
//         }

// }
// getUser("shiva")

// const createTodo=async (userId:number,title:string,description:string)=>{
//     const newTodo=await prisma.todo.create({
//         data:{
//             title,
//             description,
//             userId
//         }
//     })
//     console.log(newTodo)

// }

// createTodo(1,"hit Gym","go to gym and do 10 pushups")

// const  getTodo=async(userId:number)=>{
//     const res=await prisma.todo.findMany({
//         where:{
//             userId:userId,
//         },
//     })
//     console.log(res)
// }
// // getTodo(1)

// const getTodosndUsers=async(userId:number)=>{
//     const res=await prisma.todo.findMany({
//         where:{
//             userId:userId,
//         },
//         include:{
//             user:true
//         }

//     })
//     console.log(res)
// }

// getTodosndUsers(1)

