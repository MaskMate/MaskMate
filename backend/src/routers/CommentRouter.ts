import { Router } from "express";
import {
    handleGetComment,
    handleNewComment,
    handleEditComment,
    handleDeleteComment,
    handleLikeComment,
} from "../controllers/CommentController";
import authorize from "../middlewares/AuthMiddleware";

const CommentRouter = Router();

CommentRouter.get("/:postId", handleGetComment);
CommentRouter.post("/", authorize, handleNewComment);
CommentRouter.put("/", authorize, handleEditComment);
CommentRouter.delete("/", authorize, handleDeleteComment);
CommentRouter.put("/like", authorize, handleLikeComment);

export default CommentRouter;
