import { PostLike } from "@/db/entities/PostLikeEntity";
import dataSource from "@/db/postgres.config";

const likeRepository = dataSource.getRepository(PostLike);

export const savePostLike = async (like: PostLike) => {
    return await likeRepository.save(like);
};

export const findPostLikeByProfileIdAndPostId = async (
    profileId: string,
    postId: string
) => {
    return await likeRepository.findOne({
        where: { profileId, postId },
    });
};

export const removePostLikeByProfileIdAndPostId = async (
    profileId: string,
    postId: string
) => {
    return await likeRepository.delete({ profileId, postId });
};
