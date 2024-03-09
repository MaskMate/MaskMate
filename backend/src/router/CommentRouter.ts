import { Router } from "express";
import {
    handleGetComment,
    handleNewComment,
    handleEditComment,
    handleDeleteComment,
} from "../controllers/CommentController";
import authorize from "../middlewares/AuthMiddleware";

const CommentRouter = Router();

CommentRouter.get("/:postId", handleGetComment);
CommentRouter.post("/", authorize, handleNewComment);
CommentRouter.put("/", authorize, handleEditComment);
CommentRouter.delete("/", authorize, handleDeleteComment);

export default CommentRouter;
