import express from "express";
import { register, login, me } from "./auth.controller.js";
import { requireDB } from "../../middlewares/db-guard.js";
import { requireAuth } from "../../middlewares/jwt.guard.js";

const router = express.Router();

router.post("/register", requireDB, register);
router.post("/login", requireDB, login);
router.get("/me", requireDB, requireAuth, me);

export default router;
