import axios from "axios";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
            {
                email,
                password,
            }
        );
        const { token } = response.data.data;
        const profile = jwtDecode(token);
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("profile", JSON.stringify(profile));
        toast.success("Logged In Successfully");
        return true;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.error);
        } else {
            console.error(error);
            toast.error("Something went wrong, please try again later");
        }
    }
};
