import otpGenerator from "otp-generator";
import { findUserByUsername } from "../db/repositories/UserRepository";

export const generateUsername = async () => {
    while (true) {
        const username = otpGenerator.generate(6, {
            digits: false,
            specialChars: false,
        });

        const user = await findUserByUsername(username);
        if (user === null) return username;
    }
};
