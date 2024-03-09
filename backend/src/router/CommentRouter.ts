import { Router } from "express";
import {
    handleGetComment,
    handleNewComment,
} from "../controllers/ CommentController";
import authorize from "../middlewares/AuthMiddleware";

const CommentRouter = Router();

CommentRouter.get("/:postId", handleGetComment);
CommentRouter.post("/", authorize, handleNewComment);

export default CommentRouter;
