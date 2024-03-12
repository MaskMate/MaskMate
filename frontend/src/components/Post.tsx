import { PostCategories } from "@/constants/Categories";
import { IPost } from "@/types/post";
import formatTimestamp from "@/utils/formatdate";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Image,
} from "@nextui-org/react";
import { FC, useMemo } from "react";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { LuDot } from "react-icons/lu";

interface PostProps {
    post: IPost;
}

const Post: FC<PostProps> = props => {
    const { post } = props;
    const dateFromNow = useMemo(
        () => formatTimestamp(post.createdAt),
        [post.createdAt]
    );

    return (
        <Card className="max-w-[1024px] rounded-xl border border-gray-300 bg-background-surface p-4 flex max-h-[840px] cursor-pointer flex-col gap-4 text-gray-900 shadow-none hover:shadow-[0_4px_8px_0_rgba(101,105,108,0.10)]">
            <CardHeader className="flex gap-3 p-0">
                <Image
                    alt={post.profile.university.name}
                    className="rounded-full border-1"
                    src={post.profile.university.logo}
                    height={40}
                    width={40}
                />
                <div className="flex flex-col">
                    <div className="flex items-center justify-start">
                        <p className="text-md font-semibold">
                            {
                                PostCategories[
                                    post.category
                                        .name as keyof typeof PostCategories
                                ]
                            }
                        </p>
                        <LuDot />
                        <p className="text-xs font-semibold text-slate-500">
                            {dateFromNow}
                        </p>
                    </div>
                    <div className="flex items-center justify-center">
                        <p className="text-xs text-default-500">
                            {post.profile.username}
                        </p>
                        <LuDot className="text-default-500" />
                        <p className="text-xs text-default-500">
                            {post.profile.university.name}
                        </p>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="p-0">
                <p className="text-l font-semibold">{post.title}</p>
            </CardBody>
            <CardBody className="p-0">
                <p>{post.content}</p>
            </CardBody>
            <CardFooter className="flex gap-4 p-0">
                <div className="flex items-center gap-1 rounded-[20px] bg-gray-200 py-1 px-2 text-sm/5 text-gray-800 hover:bg-gray-300">
                    <FaRegHeart />
                    {post.like}
                </div>
                <div className="flex items-center gap-1 rounded-[20px] bg-gray-200 py-1 px-2 text-sm/5 text-gray-800 hover:bg-gray-300">
                    <FaRegComment /> {post.commentCount}
                </div>
            </CardFooter>
        </Card>
    );
};

export default Post;
