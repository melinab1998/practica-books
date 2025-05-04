import {Router} from "express"
import { registerUser, loginUser } from "../services/auth.services.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;