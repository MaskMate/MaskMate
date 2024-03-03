import { Router } from "express";
import {
    handleSignup,
    handleVerificationCode,
} from "../controllers/AuthController";

const AuthRouter = Router();

AuthRouter.post("/signup", handleSignup);
AuthRouter.post("/code", handleVerificationCode);

export default AuthRouter;
