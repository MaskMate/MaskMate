import { Otp } from "../db/entities/OtpEntity";
import { University } from "../db/entities/UniversityEntity";
import { User } from "../db/entities/UserEntity";
import {
    deleteOldEmail,
    deleteOtpbyEmail,
    findOtpByEmail,
    saveOtp,
    verifyEmail,
} from "../db/repositories/OtpRepository";
import { findUniversityByDomain } from "../db/repositories/UniversityRepository";
import {
    findUserByEmail,
    isCredentialTaken,
    saveUser,
} from "../db/repositories/UserRepository";
import { generateOtp, sendEmail } from "../utils/OtpHelper";
import { generateUsername } from "../utils/UsernameHelper";
import { comparePassword, hashPassword } from "../utils/passwordHelper";

export const registerEmail = async (email: string) => {
    try {
        await validateEmail(email);
        await deleteOldEmail(email);
        const otpValue = await generateOtp();
        sendEmail(email, otpValue);
        const otp = new Otp();
        otp.email = email;
        otp.otp = otpValue;
        return await saveOtp(otp);
    } catch (error) {
        throw error;
    }
};

export const validateVerificationCode = async (email: string, code: string) => {
    try {
        const otp = await validateCode(email, code);
        otp.verified = true;
        await verifyEmail(otp);
    } catch (error) {
        throw error;
    }
};
export const getSignupDetails = async (email: string) => {
    try {
        await deleteOtpbyEmail(email);
        const username = await generateUsername();
        const domain = email.split("@")[1];
        const university = await findUniversityByDomain(domain);
        if (university) return { username, universityName: university.name };
        return { username, universityName: null };
    } catch (error) {
        throw error;
    }
};

export const registerNewUser = async (
    email: string,
    password: string,
    username: string,
    universityName: string
) => {
    try {
        await validateCredentials(username, email, password);
        const hashedPassword = await hashPassword(password);
        const domain = email.split("@")[1];
        let university = await findUniversityByDomain(domain);
        if (university === null) {
            university = new University();
            university.domain = domain;
            university.name = universityName;
        }

        const user = new User();
        user.username = username;
        user.email = email;
        user.password = hashedPassword;
        user.university = university;

        return await saveUser(user);
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        validateEmailFormat(email);

        const user = await findUserByEmail(email);
        if (!user) throw new Error("Invalid Email ID");
        const isPasswordMatch = await comparePassword(password, user.password);
        if (!isPasswordMatch) throw new Error("Invalid Email ID or Password");

        return user;
    } catch (error) {
        throw error;
    }
};

const validateEmail = async (email: string) => {
    validateEmailFormat(email);

    const existingUser = await findUserByEmail(email);
    if (existingUser?.email === email) {
        throw new Error("Email ID already exists");
    }
};

const validateCredentials = async (
    username: string,
    email: string,
    password: string
) => {
    if (username.length < 6 || username.length > 50) {
        throw new Error("Username name must be between 6 to 50 characters");
    }
    const usernameRegex = /^[a-z0-9_]+$/i;
    if (!usernameRegex.test(username)) {
        console.log("true");

        throw new Error(
            "Invalid Username. Username can contain aphabets, numbers and underscore only"
        );
    }

    validateEmailFormat(email);

    if (password.length < 8) {
        throw new Error("Password must be at least 8 characters");
    }

    const existingUser = await isCredentialTaken(username, email);
    if (existingUser) {
        if (existingUser.username === username) {
            throw new Error("Username is taken");
        }
        if (existingUser.email === email) {
            throw new Error("Email id already exists");
        }
    }
};

const validateCode = async (email: string, code: string) => {
    const otp = await findOtpByEmail(email);
    if (otp === null) throw new Error("Email ID not found");
    if (otp.otp !== code) throw new Error("Incorrect verification code");
    const currentDate = new Date().toISOString();
    const utcDate = new Date(currentDate);
    if (otp.expiresAt < utcDate) throw new Error("Verification code expired");
    return otp;
};
const validateEmailFormat = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error("Invalid Email ID");
    }
};
