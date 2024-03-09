import { Comment } from "../db/entities/CommentEntity";
import { Profile } from "../db/entities/ProfileEntity";
import {
    getCommentByPostId,
    saveComment,
} from "../db/repositories/CommentRepository";
import { getPostByPostId, savePost } from "../db/repositories/PostRepository";

export const getAllComments = async (postId: string) => {
    try {
        const post = await getPostByPostId(postId);
        if (!post) throw new Error("Invalid Post ID.");

        const comments = await getCommentByPostId(post);
        return comments;
    } catch (error) {
        throw error;
    }
};
export const createNewComment = async (
    profile: Profile,
    postId: string,
    comment: string
) => {
    try {
        const post = await getPostByPostId(postId);
        if (!post) throw new Error("Invalid Post ID.");

        const newComment = new Comment();
        newComment.comment = comment;
        newComment.post = post;
        newComment.profile = profile;

        const savedComment = await saveComment(newComment);
        post.commentCount += 1;
        await savePost(post);
        return savedComment;
    } catch (error) {
        throw error;
    }
};
