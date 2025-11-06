import express from "express";
import { ProfileController } from "../controllers/index.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", ProfileController.getProfile);
router.put("/", ProfileController.updateProfile);
router.post("/", ProfileController.createProfile);
router.post("/avatar", upload.single("avatar"), ProfileController.uploadAvatar);

export default router;
