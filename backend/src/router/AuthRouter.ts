import { Router } from "express";
import {
    handleSignup,
    handleVerificationCode,
    handleSignupDetails,
} from "../controllers/AuthController";

const AuthRouter = Router();

AuthRouter.post("/signup", handleSignup);
AuthRouter.post("/code", handleVerificationCode);
AuthRouter.post("/signupDetails", handleSignupDetails);

export default AuthRouter;
