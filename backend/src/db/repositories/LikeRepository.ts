import { Like } from "../entities/LikeEntity";
import dataSource from "../postgres.config";

const likeRepository = dataSource.getRepository(Like);

export const saveLike = async (like: Like) => {
    return await likeRepository.save(like);
};

export const findLikeByPostIdAndProfileId = async (
    profileId: string,
    postId: string
) => {
    return await likeRepository.findOne({
        where: { profileId, postId },
    });
};

export const removeLikeByPostIdAndProfileId = async (
    profileId: string,
    postId: string
) => {
    return await likeRepository.delete({ profileId, postId });
};
