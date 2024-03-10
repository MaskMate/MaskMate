import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const login = async (loginData: { email: string; password: string }) => {
    const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        loginData
    );

    const { token } = response.data.data;
    const profile = jwtDecode(token);
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("profile", JSON.stringify(profile));

    return response.data;
};
