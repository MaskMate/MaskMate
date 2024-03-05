import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../db/entities/UserEntity";
import otpGenerator from "otp-generator";
import { findUserByUsername } from "../db/repositories/UserRepository";

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

        const user = await findUserByUsername(username);
        if (user === null) return username;
    }
};

export const generateToken = (user: User) => {
    const JWT_SECRET = process.env.JWT_SECRET || "mysecret";

    return jwt.sign(
        {
            userId: user.userId,
            email: user.email,
            username: user.username,
        },
        JWT_SECRET,
        { expiresIn: "30d" }
    );
};

export default generateToken;
