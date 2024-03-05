import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../db/entities/UserEntity";
import { findProfile } from "../db/repositories/ProfileRepository";
import { Profile } from "../db/entities/ProfileEntity";
declare global {
    namespace Express {
        interface Request {
            profile?: Profile;
        }
    }
}

const authorize = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const JWT_SECRET = process.env.JWT_SECRET || "mysecret";

    let token;

    if (
        request.headers.authorization &&
        request.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = request.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, JWT_SECRET);
            if (typeof decoded === "object") {
                request.profile = new Profile();
                const { profileId, name, email } = decoded;
                const profile = await findProfile(profileId, name, email);
                if (!profile) throw new Error("profile not found");
                request.profile = profile;
                next();
            } else {
                throw new Error("Token is invalid");
            }
        } catch (error) {
            response
                .status(403)
                .json({ data: null, error: (error as Error).message });
        }
    } else {
        response.status(401).json({
            data: null,
            error: "Token is missing. Please provide a valid token in the authorization header",
        });
    }
};

export default authorize;
