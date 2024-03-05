import { Post } from "../db/entities/PostEntity";
import { User } from "../db/entities/UserEntity";
import { PostCategories } from "../constants/Categories";
import { getCategory } from "../db/repositories/CategoryRepository";
import { savePost } from "../db/repositories/PostRepository";

export const createNewPost = async (
    user: User,
    title: string,
    content: string,
    category: PostCategories
) => {
    try {
        const postCategory = await getCategory(category);
        if (!postCategory) throw new Error("Invalid Category");

        const post = new Post();
        post.title = title;
        post.content = content;
        post.category = postCategory;
        post.upvote = 0;
        post.downvote = 0;
        post.createdAt = new Date();
        post.user = user;

        return await savePost(post);
    } catch (error) {
        throw error;
    }
};
