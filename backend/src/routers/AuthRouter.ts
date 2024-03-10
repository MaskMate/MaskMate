import { Router } from "express";
import {
    handleSignup,
    handleVerificationCode,
    handleSignupDetails,
    handleRegister,
    handleLogin,
} from "@/controllers/AuthController";

const AuthRouter = Router();

AuthRouter.post("/signup", handleSignup);
AuthRouter.post("/code", handleVerificationCode);
AuthRouter.post("/signupDetails", handleSignupDetails);
AuthRouter.post("/register", handleRegister);
AuthRouter.post("/login", handleLogin);

export default AuthRouter;
