import { Request, Response } from "express";
import {
    getSignupDetails,
    registerEmail,
    validateVerificationCode,
} from "../services/AuthService";

export const handleSignup = async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ data: null, error: "Missing Email ID" });
    }
    try {
        const newOtp = await registerEmail(email);
        return res.json({ data: { email: newOtp.email }, error: null });
    } catch (error) {
        return res
            .status(500)
            .json({ data: null, error: (error as Error).message });
    }
};

export const handleVerificationCode = async (req: Request, res: Response) => {
    const { email, code } = req.body;
    const requiredFields = ["code", "email"];

    for (let field of requiredFields) {
        if (!req.body[field]) {
            return res
                .status(400)
                .json({ data: null, error: `Missing ${field.toUpperCase()}` });
        }
    }
    try {
        await validateVerificationCode(email, code);
        return res.json({ data: { email }, error: null });
    } catch (error) {
        return res
            .status(500)
            .json({ data: null, error: (error as Error).message });
    }
};

export const handleSignupDetails = async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ data: null, error: "Missing Email ID" });
    }
    try {
        const { username, universityName } = await getSignupDetails(email);
        return res.json({ data: { username, universityName }, error: null });
    } catch (error) {
        return res.json({ data: null, error: (error as Error).message });
    }
};
