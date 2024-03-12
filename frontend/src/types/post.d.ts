export type IPost = {
    postId: string;
    title: string;
    content: string;
    like: number;
    commentCount: number;
    createdAt: string;
    profile: {
        username: string;
        university: {
            logo: string;
            name: string;
        };
    };
    category: {
        name: string;
    };
};
