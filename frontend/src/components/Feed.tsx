import { useApiGet } from "@/hooks/useApi";
import { getFeeds } from "@/urls/post";
import { Spinner } from "@nextui-org/react";
import { FC } from "react";
import Post from "./Post";
import { IPost } from "@/types/post";

interface FeedProps {}
interface IData {
    posts: IPost[];
}

const Feed: FC<FeedProps> = ({}) => {
    const { data, isLoading, error, isError, isLoadingError } = useApiGet(
        ["feeds"],
        getFeeds,
        {
            enabled: true,
            retry: 1,
        }
    );
    if (isLoading) return <Spinner label="Loading..." color="warning" />;
    if (isError || isLoadingError)
        return <div className="text-red-500">{error.message}</div>;
    const posts = (data as IData).posts as IPost[];
    if (posts === undefined) {
        console.log("undefined", data);
        return <p>Undefined</p>;
    }

    return (
        <div>
            {posts.map(post => (
                <div key={post.postId} className="mt-4">
                    <Post post={post} />
                </div>
            ))}
        </div>
    );
};

export default Feed;
