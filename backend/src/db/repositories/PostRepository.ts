import Post from "@/db/entities/PostEntity";
import dataSource from "@/db/postgres.config";

const postRepo = dataSource.getRepository(Post);

export const savePost = async (post: Post) => {
    return await postRepo.save(post);
};
export const getLatestPosts = async () => {
    return await postRepo
        .createQueryBuilder("post")
        .leftJoinAndSelect("post.profile", "profile")
        .leftJoinAndSelect("profile.university", "university")
        .leftJoinAndSelect("post.category", "category")
        .select([
            "post",
            "profile.username",
            "university.name",
            "university.logo",
            "category.name",
        ])
        .take(10)
        .orderBy("post.createdAt", "DESC")
        .getMany();
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
