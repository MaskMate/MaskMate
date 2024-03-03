import { Otp } from "../db/entities/OtpEntity";
import { deleteOtpbyEmail, saveOtp } from "../db/repositories/OtpRepository";
import { findUserByEmail } from "../db/repositories/UserRepository";
import { generateOtp, sendEmail } from "../utils/OtpHelper";

export const registerEmail = async (email: string) => {
    try {
        await validateEmail(email);
        await deleteOtpbyEmail(email);
        const otpValue = await generateOtp();
        await sendEmail(email, otpValue);
        const otp = new Otp();
        otp.email = email;
        otp.otp = otpValue;
        return await saveOtp(otp);
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
