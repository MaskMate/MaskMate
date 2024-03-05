import { Post } from "../db/entities/PostEntity";
import { User } from "../db/entities/UserEntity";
import { PostCategories } from "../constants/Categories";
import { getCategory } from "../db/repositories/CategoryRepository";
import {
    findPostByPostId,
    getLatestPosts,
    savePost,
} from "../db/repositories/PostRepository";

export const createNewPost = async (
    user: User,
    title: string,
    content: string,
    category: PostCategories
) => {
    try {
        const postCategory = await getCategory(category);
        if (!postCategory) throw new Error("Invalid Category");

        const post = new Post();
        post.title = title;
        post.content = content;
        post.category = postCategory;
        post.upvote = 0;
        post.downvote = 0;
        post.createdAt = new Date();
        post.user = user;

        return await savePost(post);
    } catch (error) {
        throw error;
    }
};

export const getAllPosts = async () => {
    try {
        return await getLatestPosts();
    } catch (error) {
        throw error;
    }
};

export const editPost = async (
    postId: string,
    title?: string,
    content?: string
) => {
    try {
        const post = await findPostByPostId(postId);

        if (!post) throw new Error("Invalid Post ID");
        if (title) post.title = title;
        if (content) post.content = content;

        return await savePost(post);
    } catch (error) {
        throw error;
    }
};
