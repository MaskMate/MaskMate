import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import { findByOtp } from "../db/repositories/OtpRepository";

export const generateOtp = async () => {
    while (true) {
        const otpValue = otpGenerator.generate(6, {
            specialChars: false,
        });

        const otp = await findByOtp(otpValue);
        if (otp === null) return otpValue;
    }
};

export const sendEmail = async (email: string, otp: string) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_EMAIL,
                pass: process.env.MAIL_PASSWORD,
            },
        });
        if (email === "test@iitd.ac.in") return;

        await transporter.sendMail({
            from: "MaskMate Auth service",
            to: email,
            subject: "Otp Verification",
            html: `<h1>Please confirm your OTP </h1>
            <p> here is your OTP code: ${otp} </p>`,
        });
    } catch (error) {
        throw error;
    }
};
