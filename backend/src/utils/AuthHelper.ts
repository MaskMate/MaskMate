import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import { Profile } from "../db/entities/ProfileEntity";
import { isUsernameTaken } from "../db/repositories/ProfileRepository";

export const hashPassword = async (password: string) => {
    try {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
};

export const comparePassword = async (
    password: string,
    hashedPassword: string
) => {
    return await bcrypt.compare(password, hashedPassword);
};

export const generateUsername = async () => {
    while (true) {
        const username = otpGenerator.generate(6, {
            digits: false,
            specialChars: false,
        });

        const profile = await isUsernameTaken(username);
        if (profile === null) return username;
    }
};

export const generateToken = (profile: Profile) => {
    const JWT_SECRET = process.env.JWT_SECRET || "mysecret";

    return jwt.sign(
        {
            profileId: profile.profileId,
            email: profile.email,
            username: profile.username,
        },
        JWT_SECRET,
        { expiresIn: "30d" }
    );
};

export default generateToken;
