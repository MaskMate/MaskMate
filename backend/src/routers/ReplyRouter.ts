import { Router } from "express";
import {
    handleGetReply,
    handleNewReply,
    handleEditReply,
    handleDeleteReply,
    handleLikeReply,
} from "../controllers/ReplyController";
import authorize from "../middlewares/AuthMiddleware";

const ReplyRouter = Router();

ReplyRouter.get("/:commentId", handleGetReply);
ReplyRouter.post("/", authorize, handleNewReply);
ReplyRouter.put("/", authorize, handleEditReply);
ReplyRouter.delete("/", authorize, handleDeleteReply);
ReplyRouter.put("/like", authorize, handleLikeReply);

export default ReplyRouter;
