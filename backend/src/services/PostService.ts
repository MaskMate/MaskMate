import Post from "@/db/entities/PostEntity";
import { PostCategories } from "@/constants/Categories";
import { getCategory } from "@/db/repositories/CategoryRepository";
import {
    deletePostByPostId,
    findPostByPostId,
    getLatestPosts,
    savePost,
} from "@/db/repositories/PostRepository";
import Profile from "@/db/entities/ProfileEntity";
import {
    findPostLikeByProfileIdAndPostId,
    removePostLikeByProfileIdAndPostId,
    savePostLike,
} from "@/db/repositories/PostLikeRepository";
import PostLike from "@/db/entities/PostLikeEntity";

export const createNewPost = async (
    profile: Profile,
    title: string,
    content: string,
    category: PostCategories
) => {
    const postCategory = await getCategory(category);
    if (!postCategory) throw new Error("Invalid Category");

    const post = new Post();
    post.title = title;
    post.content = content;
    post.category = postCategory;
    post.createdAt = new Date();
    post.profile = profile;

    return await savePost(post);
};

export const getAllPosts = async () => {
    return await getLatestPosts();
};

export const editPost = async (
    profile: Profile,
    postId: string,
    title?: string,
    content?: string
) => {
    const post = await findPostByPostId(postId);

    if (!post) throw new Error("Invalid Post ID.");

    if (post.profile.profileId != profile.profileId)
        throw new Error("Unauthorized. Can't edit other's posts.");
    if (title) post.title = title;
    if (content) post.content = content;

    return await savePost(post);
};

export const deletePost = async (profile: Profile, postId: string) => {
    const post = await findPostByPostId(postId);

    if (!post) throw new Error("Invalid Post ID.");

    if (post.profile.profileId != profile.profileId)
        throw new Error("Unauthorized. Can't delete other's posts.");
    await deletePostByPostId(postId);
};

export const likePost = async (
    profileId: string,
    postId: string,
    liked: boolean
) => {
    const post = await findPostByPostId(postId);
    if (!post) throw new Error("Invalid Post ID.");
    const alreadyLiked = await findPostLikeByProfileIdAndPostId(
        profileId,
        postId
    );
    if ((alreadyLiked && liked) || (!alreadyLiked && !liked)) return post;

    if (alreadyLiked) {
        await removePostLikeByProfileIdAndPostId(profileId, postId);
        post.like -= 1;
    } else {
        const like = new PostLike();
        like.postId = postId;
        like.profileId = profileId;
        await savePostLike(like);
        post.like += 1;
    }

    return await savePost(post);
};
