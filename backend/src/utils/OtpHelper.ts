import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import { findByOtp } from "../db/repositories/OtpRepository";
import * as fs from "fs";

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
        if (email === "test@iitd.ac.in" || email === "test@test.com") return;

        await transporter.sendMail({
            from: process.env.MAIL_EMAIL,
            to: email,
            subject: "MaskMate Email Verification",
            html: html(email, otp),
        });
    } catch (error) {
        throw error;
    }
};

const html = (email: string, otp: string) => {
    let htmlContent = fs.readFileSync("public/index.html", "utf8");
    htmlContent = htmlContent.replace("EMAIL_PLACEHOLDER", email);
    htmlContent = htmlContent.replace("OTP_PLACEHOLDER", otp);
    return htmlContent;
};
