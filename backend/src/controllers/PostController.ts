import { Request, Response } from "express";
import {
    createNewPost,
    deletePost,
    editPost,
    getAllPosts,
    likePost,
} from "@/services/PostService";
import Profile from "@/db/entities/ProfileEntity";

export const handleGetPost = async (req: Request, res: Response) => {
    try {
        const posts = await getAllPosts();
        return res.json({ data: { posts }, error: null });
    } catch (error) {
        return res
            .status(500)
            .json({ data: null, error: (error as Error).message });
    }
};

export const handleNewPost = async (req: Request, res: Response) => {
    const profile = req.profile as Profile;
    const { title, content, category } = req.body;

    if (!title)
        return res.status(400).json({ data: null, error: "Missing Title." });

    if (!category)
        return res.status(400).json({ data: null, error: "Missing Category." });

    try {
        const savedPost = await createNewPost(
            profile,
            title,
            content,
            category
        );
        return res.status(201).json({ data: { post: savedPost }, error: null });
    } catch (error) {
        return res
            .status(500)
            .json({ data: null, error: (error as Error).message });
    }
};

export const handleEditPost = async (req: Request, res: Response) => {
    const profile = req.profile as Profile;
    const { postId, title, content } = req.body;

    if (!postId)
        return res.status(400).json({ data: null, error: "Missing Post ID." });

    try {
        const updatedPost = await editPost(profile, postId, title, content);
        return res
            .status(200)
            .json({ data: { post: updatedPost }, error: null });
    } catch (error) {
        return res
            .status(500)
            .json({ data: null, error: (error as Error).message });
    }
};

export const handleDeletePost = async (req: Request, res: Response) => {
    const profile = req.profile as Profile;
    const { postId } = req.body;

    if (!postId)
        return res.status(400).json({ data: null, error: "Missing Post ID." });

    try {
        await deletePost(profile, postId);
        return res.status(200).json({ data: null, error: null });
    } catch (error) {
        return res
            .status(500)
            .json({ data: null, error: (error as Error).message });
    }
};

export const handleLikePost = async (req: Request, res: Response) => {
    const profile = req.profile as Profile;
    const { postId, liked } = req.body;

    if (!postId)
        return res.status(400).json({ data: null, error: "Missing Post ID." });

    try {
        const likedPost = await likePost(profile.profileId, postId, liked);
        return res.status(200).json({ data: { post: likedPost }, error: null });
    } catch (error) {
        return res
            .status(500)
            .json({ data: null, error: (error as Error).message });
    }
};
