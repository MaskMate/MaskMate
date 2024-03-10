import Comment from "@/db/entities/CommentEntity";
import CommentLike from "@/db/entities/CommentLikeEntity";
import Profile from "@/db/entities/ProfileEntity";
import {
    deleteCommentByCommentId,
    getCommentByCommentId,
    getCommentByPostId,
    saveComment,
} from "@/db/repositories/CommentRepository";
import {
    findCommentLikeByProfileIdAndCommentId,
    removeCommentLikeByProfileIdAndCommentId,
    saveCommentLike,
} from "@/db/repositories/CommentLikeRepository";
import { getPostByPostId, savePost } from "@/db/repositories/PostRepository";

export const getAllComments = async (postId: string) => {
    const post = await getPostByPostId(postId);
    if (!post) throw new Error("Invalid Post ID.");

    const comments = await getCommentByPostId(post);
    return comments;
};
export const createNewComment = async (
    profile: Profile,
    postId: string,
    comment: string
) => {
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
};

export const updateComment = async (
    profile: Profile,
    commentId: string,
    comment: string
) => {
    const existingComment = await getCommentByCommentId(commentId);

    if (!existingComment) throw new Error("Invalid Comment ID.");
    if (existingComment.profile.profileId != profile.profileId)
        throw new Error("Unauthorized. Can't edit other's comments.");

    existingComment.comment = comment;
    return await saveComment(existingComment);
};

export const deleteComment = async (profile: Profile, commentId: string) => {
    const existingComment = await getCommentByCommentId(commentId);
    if (!existingComment) throw new Error("Invalid Comment ID.");
    if (existingComment.profile.profileId != profile.profileId)
        throw new Error("Unauthorized. Can't delete other's comments.");

    await deleteCommentByCommentId(commentId);
    existingComment.post.commentCount -= 1;
    await savePost(existingComment.post);
};

export const likeComment = async (
    profileId: string,
    commentId: string,
    liked: boolean
) => {
    const comment = await getCommentByCommentId(commentId);
    if (!comment) throw new Error("Invalid Comment ID.");
    const alreadyLiked = await findCommentLikeByProfileIdAndCommentId(
        profileId,
        commentId
    );
    if ((alreadyLiked && liked) || (!alreadyLiked && !liked)) return comment;

    if (alreadyLiked) {
        await removeCommentLikeByProfileIdAndCommentId(profileId, commentId);
        comment.like -= 1;
    } else {
        const like = new CommentLike();
        like.commentId = commentId;
        like.profileId = profileId;
        await saveCommentLike(like);
        comment.like += 1;
    }

    return await saveComment(comment);
};
