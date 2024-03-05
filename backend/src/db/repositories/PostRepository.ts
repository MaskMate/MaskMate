import { Post } from "../entities/PostEntity";
import dataSource from "../postgres.config";

const postRepo = dataSource.getRepository(Post);

export const savePost = async (post: Post) => {
    return await postRepo.save(post);
};
