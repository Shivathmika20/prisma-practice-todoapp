import { Router } from "express";
import authMiddleware from "../middleware/auth";
import { createTodo,getTodo } from "../controllers/todoController";
const todoRouter = Router();

todoRouter.post('/create/todo',authMiddleware,createTodo);

todoRouter.get('/',authMiddleware,getTodo);

export default todoRouter;