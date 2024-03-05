import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../db/entities/UserEntity";
import { findUser } from "../db/repositories/UserRepository";
declare global {
    namespace Express {
        interface Request {
            user?: User;
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
                request.user = new User();
                const { userId, name, email } = decoded;
                const user = await findUser(userId, name, email);
                if (!user) throw new Error("User not found");
                request.user = user;
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
