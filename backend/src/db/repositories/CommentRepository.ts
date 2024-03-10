import { Comment } from "@/db/entities/CommentEntity";
import { Post } from "@/db/entities/PostEntity";
import dataSource from "@/db/postgres.config";

const commentRepo = dataSource.getRepository(Comment);

export const saveComment = async (comment: Comment) => {
    return await commentRepo.save(comment);
};

export const getCommentByPostId = async (post: Post) => {
    return await commentRepo.find({
        relations: ["profile"],
        where: {
            post: post,
        },
    });
};

export const getCommentByCommentId = async (commentId: string) => {
    return await commentRepo.findOne({
        where: { commentId: commentId },
        relations: ["profile", "post"],
    });
};
export const getOnlyCommentByCommentId = async (commentId: string) => {
    return await commentRepo.findOne({
        where: { commentId },
    });
};

export const deleteCommentByCommentId = async (commentId: string) => {
    return await commentRepo.delete({ commentId: commentId });
};
