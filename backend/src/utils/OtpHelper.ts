import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import { findByOtp } from "../db/repositories/OtpRepository";

export const generateOtp = async () => {
    while (true) {
        const otp = otpGenerator.generate(6, {
            specialChars: false,
        });

        const OptExists = await findByOtp(otp);
        if (OptExists === null) return otp;
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

        let info = await transporter.sendMail({
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
