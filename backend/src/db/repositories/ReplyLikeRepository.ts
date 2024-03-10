import { ReplyLike } from "@/db/entities/ReplyLikeEntity";
import dataSource from "@/db/postgres.config";

const likeRepository = dataSource.getRepository(ReplyLike);

export const saveReplyLike = async (like: ReplyLike) => {
    return await likeRepository.save(like);
};

export const findReplyLikeByProfileIdAndReplyId = async (
    profileId: string,
    replyId: string
) => {
    return await likeRepository.findOne({
        where: { profileId, replyId },
    });
};

export const removeReplyLikeByProfileIdAndReplyId = async (
    profileId: string,
    replyId: string
) => {
    return await likeRepository.delete({ profileId, replyId });
};
