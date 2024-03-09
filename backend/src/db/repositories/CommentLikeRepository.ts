import { CommentLike } from "../entities/CommentLikeEntity";
import dataSource from "../postgres.config";

const likeRepository = dataSource.getRepository(CommentLike);

export const saveCommentLike = async (like: CommentLike) => {
    return await likeRepository.save(like);
};

export const findCommentLikeByProfileIdAndCommentId = async (
    profileId: string,
    commentId: string
) => {
    return await likeRepository.findOne({
        where: { profileId, commentId },
    });
};

export const removeCommentLikeByProfileIdAndCommentId = async (
    profileId: string,
    commentId: string
) => {
    return await likeRepository.delete({ profileId, commentId });
};
