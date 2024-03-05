import { Request, Response } from "express";
import { createNewPost } from "../services/PostService";

export const handleNewPost = async (req: Request, res: Response) => {
    const { user } = req;
    const { title, content, category } = req.body;

    if (!user)
        return res
            .status(400)
            .json({ data: null, error: "Unauthorized user." });

    if (!title)
        return res.status(400).json({ data: null, error: "Missing Title." });

    if (!category)
        return res.status(400).json({ data: null, error: "Missing Category." });

    try {
        const savedPost = await createNewPost(user, title, content, category);
        return res.status(201).json({ data: { post: savedPost }, error: null });
    } catch (error) {
        return res
            .status(500)
            .json({ data: null, error: (error as Error).message });
    }
};
