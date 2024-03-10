import { Request, Response } from "express";
import {
    getSignupDetails,
    loginUser,
    registerEmail,
    registerNewUser,
    validateVerificationCode,
} from "@/services/AuthService";
import generateToken from "@/utils/AuthHelper";

export const handleSignup = async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email)
        return res.status(400).json({ data: null, error: "Missing Email ID." });

    try {
        await registerEmail(email);
        return res.json({ data: { email }, error: null });
    } catch (error) {
        return res
            .status(500)
            .json({ data: null, error: (error as Error).message });
    }
};

export const handleVerificationCode = async (req: Request, res: Response) => {
    const { email, code } = req.body;

    if (!email)
        return res.status(400).json({ data: null, error: "Missing Email ID." });

    if (!code)
        return res
            .status(400)
            .json({ data: null, error: "Missing Verification code." });

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

    if (!email)
        return res.status(400).json({ data: null, error: "Missing Email ID." });

    try {
        const { username, universityName } = await getSignupDetails(email);
        return res.json({ data: { username, universityName }, error: null });
    } catch (error) {
        return res
            .status(500)
            .json({ data: null, error: (error as Error).message });
    }
};

export const handleRegister = async (req: Request, res: Response) => {
    const { email, password, username, universityName } = req.body;

    if (!email)
        return res.status(400).json({ data: null, error: "Missing Email ID." });

    if (!password)
        return res.status(400).json({ data: null, error: "Missing Password." });

    if (!username)
        return res.status(400).json({ data: null, error: "Missing Username." });

    if (!universityName)
        return res
            .status(400)
            .json({ data: null, error: "Missing University Name." });

    try {
        const newUser = await registerNewUser(
            email,
            password,
            username,
            universityName
        );
        const token = generateToken(newUser);
        if (token) {
            return res.status(201).json({
                data: { token },
                error: null,
            });
        }
    } catch (error) {
        return res
            .status(500)
            .json({ data: null, error: (error as Error).message });
    }
};

export const handleLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email)
        return res.status(400).json({ data: null, error: "Missing Email ID." });

    if (!password)
        return res.status(400).json({ data: null, error: "Missing Password." });

    try {
        const profile = await loginUser(email, password);
        const token = generateToken(profile);
        if (token) {
            return res.status(200).json({
                data: { token },
                error: null,
            });
        }
    } catch (error) {
        return res
            .status(500)
            .json({ data: null, error: (error as Error).message });
    }
};
