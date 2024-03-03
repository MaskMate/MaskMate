import { Request, Response } from "express";
import { registerEmail } from "../services/AuthService";

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
