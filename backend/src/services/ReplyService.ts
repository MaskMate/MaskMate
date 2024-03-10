import { Reply } from "@/db/entities/ReplyEntity";
import { ReplyLike } from "@/db/entities/ReplyLikeEntity";
import { Profile } from "@/db/entities/ProfileEntity";
import {
    deleteReplyByReplyId,
    getReplyByReplyId,
    getReplyByCommentId,
    saveReply,
} from "@/db/repositories/ReplyRepository";
import {
    findReplyLikeByProfileIdAndReplyId,
    removeReplyLikeByProfileIdAndReplyId,
    saveReplyLike,
} from "@/db/repositories/ReplyLikeRepository";
import {
    getOnlyCommentByCommentId,
    saveComment,
} from "@/db/repositories/CommentRepository";

export const getAllReplies = async (commentId: string) => {
    const comment = await getOnlyCommentByCommentId(commentId);
    if (!comment) throw new Error("Invalid Comment ID.");

    const replies = await getReplyByCommentId(comment);

    return replies;
};
export const createNewReply = async (
    profile: Profile,
    commentId: string,
    reply: string
) => {
    const comment = await getOnlyCommentByCommentId(commentId);
    if (!comment) throw new Error("Invalid Comment ID.");

    const newReply = new Reply();
    newReply.reply = reply;
    newReply.comment = comment;
    newReply.profile = profile;

    const savedReply = await saveReply(newReply);
    comment.replyCount += 1;
    await saveComment(comment);
    return savedReply;
};

export const updateReply = async (
    profile: Profile,
    replyId: string,
    reply: string
) => {
    const existingReply = await getReplyByReplyId(replyId);

    if (!existingReply) throw new Error("Invalid Reply ID.");
    if (existingReply.profile.profileId != profile.profileId)
        throw new Error("Unauthorized. Can't edit other's replies.");

    existingReply.reply = reply;
    return await saveReply(existingReply);
};

export const deleteReply = async (profile: Profile, replyId: string) => {
    const existingReply = await getReplyByReplyId(replyId);
    if (!existingReply) throw new Error("Invalid Reply ID.");
    if (existingReply.profile.profileId != profile.profileId)
        throw new Error("Unauthorized. Can't delete other's replies.");

    await deleteReplyByReplyId(replyId);
    existingReply.comment.replyCount -= 1;
    await saveComment(existingReply.comment);
};

export const likeReply = async (
    profileId: string,
    replyId: string,
    liked: boolean
) => {
    const reply = await getReplyByReplyId(replyId);
    if (!reply) throw new Error("Invalid Reply ID.");
    const alreadyLiked = await findReplyLikeByProfileIdAndReplyId(
        profileId,
        replyId
    );
    if ((alreadyLiked && liked) || (!alreadyLiked && !liked)) return reply;

    if (alreadyLiked) {
        await removeReplyLikeByProfileIdAndReplyId(profileId, replyId);
        reply.like -= 1;
    } else {
        const like = new ReplyLike();
        like.replyId = replyId;
        like.profileId = profileId;
        await saveReplyLike(like);
        reply.like += 1;
    }

    return await saveReply(reply);
};
