import { Router } from "express";
import { handleNewPost } from "../controllers/PostController";
import authorize from "../middlewares/AuthMiddleware";

const PostRouter = Router();

PostRouter.post("/", authorize, handleNewPost);
export default PostRouter;
