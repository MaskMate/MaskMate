import axios, { AxiosError, AxiosResponse } from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

const request = async (options: {
    url: string;
    method: string;
}): Promise<unknown | string> => {
    let token: string | null = localStorage.getItem("token");
    if (token === null) token = "";
    else {
        const state = JSON.parse(token);
        if (state) {
            token = state;
        }
    }

    token !== "" &&
        (axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`);
    const onSuccess = (response: AxiosResponse<{ data: any }>) => {
        return response.data.data;
    };
    const onError = (error: AxiosError) => {
        return Promise.reject(error.response?.data);
    };

    return axiosClient(options).then(onSuccess).catch(onError);
};

export default request;
