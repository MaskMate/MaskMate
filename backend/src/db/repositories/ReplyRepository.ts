import { Comment } from "../entities/CommentEntity";
import { Reply } from "../entities/ReplyEntity";
import dataSource from "../postgres.config";

const replyRepo = dataSource.getRepository(Reply);

export const saveReply = async (reply: Reply) => {
    return await replyRepo.save(reply);
};

export const getReplyByCommentId = async (comment: Comment) => {
    return await replyRepo
        .createQueryBuilder("reply")
        .where("reply.comment = :commentId", { commentId: comment.commentId })
        .getMany();
    // return await replyRepo.find({
    //     where: { comment },
    //     relations: ["comment"],
    // });
};

export const getReplyByReplyId = async (replyId: string) => {
    return await replyRepo.findOne({
        where: { replyId: replyId },
        relations: ["profile", "comment"],
    });
};

export const deleteReplyByReplyId = async (replyId: string) => {
    return await replyRepo.delete({ replyId: replyId });
};
