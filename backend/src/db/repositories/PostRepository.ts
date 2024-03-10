import Post from "@/db/entities/PostEntity";
import dataSource from "@/db/postgres.config";

const postRepo = dataSource.getRepository(Post);

export const savePost = async (post: Post) => {
    return await postRepo.save(post);
};

export const getLatestPosts = async () => {
    return await postRepo.find({
        take: 10,
        order: {
            createdAt: "DESC",
        },
    });
};

export const findPostByPostId = async (postId: string) => {
    return await postRepo.findOne({
        where: { postId },
        relations: ["profile"],
    });
};

export const getPostByPostId = async (postId: string) => {
    return await postRepo.findOne({
        where: { postId },
    });
};

export const deletePostByPostId = async (postId: string) => {
    return await postRepo.delete({ postId });
};
