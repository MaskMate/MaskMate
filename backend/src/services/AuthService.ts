import { Otp } from "../db/entities/OtpEntity";
import {
    deleteOtpbyEmail,
    findOtpByEmail,
    saveOtp,
} from "../db/repositories/OtpRepository";
import { findUniversityByDomain } from "../db/repositories/UniversityRepository";
import { findUserByEmail } from "../db/repositories/UserRepository";
import { generateOtp, sendEmail } from "../utils/OtpHelper";
import { generateUsername } from "../utils/UsernameHelper";

export const registerEmail = async (email: string) => {
    try {
        await validateEmail(email);
        await deleteOtpbyEmail(email);
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
        await validateCode(email, code);
        await deleteOtpbyEmail(email);
    } catch (error) {
        throw error;
    }
};
export const getSignupDetails = async (email: string) => {
    try {
        const username = await generateUsername();
        const domain = email.split("@")[1];
        const university = await findUniversityByDomain(domain);
        if (university) return { username, universityName: university.name };
        return { username, universityName: null };
    } catch (error) {
        throw error;
    }
};

const validateEmail = async (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error("Invalid Email ID");
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser?.email === email) {
        throw new Error("Email ID already exists");
    }
};

const validateCode = async (email: string, code: string) => {
    const otp = await findOtpByEmail(email);
    if (otp === null) throw new Error("Email ID not found");
    if (otp.otp !== code) throw new Error("Incorrect verification code");
};
