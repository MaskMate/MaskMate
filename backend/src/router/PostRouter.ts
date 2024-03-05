import { Router } from "express";
import {
    handleGetPost,
    handleNewPost,
    handleEditPost,
    handleDeletePost,
} from "../controllers/PostController";
import authorize from "../middlewares/AuthMiddleware";

const PostRouter = Router();

PostRouter.get("/", handleGetPost);
PostRouter.post("/", authorize, handleNewPost);
PostRouter.put("/", authorize, handleEditPost);
PostRouter.delete("/", authorize, handleDeletePost);
export default PostRouter;
