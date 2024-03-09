import { Comment } from "../entities/CommentEntity";
import { Post } from "../entities/PostEntity";
import dataSource from "../postgres.config";

const commentRepo = dataSource.getRepository(Comment);

export const saveComment = async (comment: Comment) => {
    return await commentRepo.save(comment);
};

export const getCommentByPostId = async (post: Post) => {
    return await commentRepo.find({
        relations: {
            profile: true,
        },
        where: {
            post: post,
        },
    });
};
