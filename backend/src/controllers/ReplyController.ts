import { Request, Response } from "express";
import Profile from "@/db/entities/ProfileEntity";
import {
    createNewReply,
    deleteReply,
    getAllReplies,
    likeReply,
    updateReply,
} from "@/services/ReplyService";

export const handleGetReply = async (req: Request, res: Response) => {
    const { commentId } = req.params;

    if (!commentId)
        return res
            .status(400)
            .json({ data: null, error: "Missing Comment ID." });

    try {
        const replies = await getAllReplies(commentId);
        return res.json({ data: { replies }, error: null });
    } catch (error) {
        return res
            .status(500)
            .json({ data: null, error: (error as Error).message });
    }
};

export const handleNewReply = async (req: Request, res: Response) => {
    const profile = req.profile as Profile;
    const { commentId, reply } = req.body;

    if (!commentId)
        return res
            .status(400)
            .json({ data: null, error: "Missing Comment ID." });
    if (!reply)
        return res.status(400).json({ data: null, error: "Missing Reply." });

    try {
        const savedReply = await createNewReply(profile, commentId, reply);
        return res
            .status(201)
            .json({ data: { reply: savedReply }, error: null });
    } catch (error) {
        return res
            .status(500)
            .json({ data: null, error: (error as Error).message });
    }
};

export const handleEditReply = async (req: Request, res: Response) => {
    const profile = req.profile as Profile;
    const { replyId, reply } = req.body;

    if (!replyId)
        return res.status(400).json({ data: null, error: "Missing Reply ID." });
    if (!reply || reply.length === 0)
        return res.status(400).json({ data: null, error: "Missing Reply." });

    try {
        const updatedReply = await updateReply(profile, replyId, reply);
        return res
            .status(200)
            .json({ data: { reply: updatedReply }, error: null });
    } catch (error) {
        return res
            .status(500)
            .json({ data: null, error: (error as Error).message });
    }
};

export const handleDeleteReply = async (req: Request, res: Response) => {
    const profile = req.profile as Profile;
    const { replyId } = req.body;

    if (!replyId)
        return res.status(400).json({ data: null, error: "Missing Reply ID." });

    try {
        await deleteReply(profile, replyId);
        return res.status(200).json({ data: null, error: null });
    } catch (error) {
        return res
            .status(500)
            .json({ data: null, error: (error as Error).message });
    }
};

export const handleLikeReply = async (req: Request, res: Response) => {
    const profile = req.profile as Profile;
    const { replyId, liked } = req.body;

    if (!replyId)
        return res.status(400).json({ data: null, error: "Missing Reply ID." });
    try {
        const likedReply = await likeReply(profile.profileId, replyId, liked);
        return res
            .status(200)
            .json({ data: { reply: likedReply }, error: null });
    } catch (error) {
        return res
            .status(500)
            .json({ data: null, error: (error as Error).message });
    }
};
