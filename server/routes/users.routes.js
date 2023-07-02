import { Router } from "express";
import { signinController, signupController } from "../controllers/user.js";

const router = Router()

router.post("/signup", signupController)
router.post("/signin", signinController)

export default router

