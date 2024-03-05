import { Router } from "express";
import {
    handleGetPost,
    handleNewPost,
    handleEditPost,
} from "../controllers/PostController";
import authorize from "../middlewares/AuthMiddleware";

const PostRouter = Router();

PostRouter.post("/", authorize, handleNewPost);
PostRouter.get("/", authorize, handleGetPost);
PostRouter.put("/", authorize, handleEditPost);
export default PostRouter;
