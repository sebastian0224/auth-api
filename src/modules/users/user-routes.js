import { Router } from "express";
import { getProfile, updateProfile, deleteProfile } from "./user-controller.js";
import { authMiddleware } from "../../middlewares/auth-middleware.js";

const router = Router();

router.use(authMiddleware);

// GET /api/users/profile
router.get("/profile", getProfile);

// PUT /api/users/profile
router.put("/profile", updateProfile);

// DELETE /api/users/profile
router.delete("/profile", deleteProfile);

export default router;
