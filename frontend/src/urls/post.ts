import request from "@/utils/request";

export const getFeeds = () => request({ url: "/post/", method: "GET" });
