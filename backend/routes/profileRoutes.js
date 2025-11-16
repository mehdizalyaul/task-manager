import express from "express";
import { ProfileController } from "../controllers/index.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", ProfileController.getProfile);
router.get("/search", ProfileController.searchProfiles);
router.put("/", upload.single("avatar"), ProfileController.updateProfile);
router.post("/", ProfileController.createProfile);

export default router;
