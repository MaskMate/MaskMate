import { Router } from "express";
import { handleGetPost, handleNewPost } from "../controllers/PostController";
import authorize from "../middlewares/AuthMiddleware";

const PostRouter = Router();

PostRouter.post("/", authorize, handleNewPost);
PostRouter.get("/", authorize, handleGetPost);
export default PostRouter;
