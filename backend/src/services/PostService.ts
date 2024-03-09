import { Post } from "../db/entities/PostEntity";
import { PostCategories } from "../constants/Categories";
import { getCategory } from "../db/repositories/CategoryRepository";
import {
    deletePostByPostId,
    findPostByPostId,
    getLatestPosts,
    savePost,
} from "../db/repositories/PostRepository";
import { Profile } from "../db/entities/ProfileEntity";
import {
    findLikeByPostIdAndProfileId,
    removeLikeByPostIdAndProfileId,
    saveLike,
} from "../db/repositories/LikeRepository";
import { Like } from "../db/entities/LikeEntity";

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

export const likePost = async (
    profileId: string,
    postId: string,
    liked: boolean
) => {
    try {
        const post = await findPostByPostId(postId);
        if (!post) throw new Error("Invalid Post ID.");
        const alreadyLiked = await findLikeByPostIdAndProfileId(
            profileId,
            postId
        );
        if ((alreadyLiked && liked) || (!alreadyLiked && !liked)) return post;

        if (alreadyLiked) {
            await removeLikeByPostIdAndProfileId(profileId, postId);
            post.like -= 1;
        } else {
            const like = new Like();
            like.postId = postId;
            like.profileId = profileId;
            await saveLike(like);
            post.like += 1;
        }

        return await savePost(post);
    } catch (error) {
        throw error;
    }
};
