import { Router } from "express";
import { handleSignup } from "../controllers/AuthController";

const AuthRouter = Router();

AuthRouter.post("/signup", handleSignup);

export default AuthRouter;
