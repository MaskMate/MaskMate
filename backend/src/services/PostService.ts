import { Post } from "../db/entities/PostEntity";
import { User } from "../db/entities/UserEntity";
import { PostCategories } from "../constants/Categories";
import { getCategory } from "../db/repositories/CategoryRepository";
import {
    deletePostByPostId,
    findPostByPostId,
    getLatestPosts,
    savePost,
} from "../db/repositories/PostRepository";
import { MissingDeleteDateColumnError } from "typeorm/error/MissingDeleteDateColumnError";
import { Profile } from "../db/entities/ProfileEntity";

export const createNewPost = async (
    profile: Profile,
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
        post.profile = profile;

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
    profile: Profile,
    postId: string,
    title?: string,
    content?: string
) => {
    try {
        const post = await findPostByPostId(postId);

        if (!post) throw new Error("Invalid Post ID.");

        if (post.profile.profileId != profile.profileId)
            throw new Error("Unauthorized. Can't edit other's posts.");
        if (title) post.title = title;
        if (content) post.content = content;

        return await savePost(post);
    } catch (error) {
        throw error;
    }
};

export const deletePost = async (profile: Profile, postId: string) => {
    try {
        const post = await findPostByPostId(postId);

        if (!post) throw new Error("Invalid Post ID.");

        if (post.profile.profileId != profile.profileId)
            throw new Error("Unauthorized. Can't delete other's posts.");
        await deletePostByPostId(postId);
    } catch (error) {
        throw error;
    }
};
