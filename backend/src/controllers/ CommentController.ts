import { Request, Response } from "express";
import { Profile } from "../db/entities/ProfileEntity";
import { createNewComment, getAllComments } from "../services/CommentService";

export const handleGetComment = async (req: Request, res: Response) => {
    const { postId } = req.params;

    if (!postId)
        return res.status(400).json({ data: null, error: "Missing Post ID." });

    try {
        const comments = await getAllComments(postId);
        return res.json({ data: { comments }, error: null });
    } catch (error) {
        return res
            .status(500)
            .json({ data: null, error: (error as Error).message });
    }
};

export const handleNewComment = async (req: Request, res: Response) => {
    const profile = req.profile as Profile;
    const { postId, comment } = req.body;

    if (!postId)
        return res.status(400).json({ data: null, error: "Missing Post ID." });
    if (!comment)
        return res.status(400).json({ data: null, error: "Missing Comment." });

    try {
        const savedComment = await createNewComment(profile, postId, comment);
        return res
            .status(201)
            .json({ data: { comment: savedComment }, error: null });
    } catch (error) {
        return res
            .status(500)
            .json({ data: null, error: (error as Error).message });
    }
};
