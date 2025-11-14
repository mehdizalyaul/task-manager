import { Profile } from "../models/index.js";

// === GET /api/profile ===
export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const profile = await Profile.get(userId);

    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

// === PUT /api/profile ===
export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const payload = req.body;

    const updated = await Profile.update(payload, userId);
    if (!updated) {
      return res
        .status(400)
        .json({ success: false, message: "Nothing to update" });
    }

    const profile = await Profile.get(userId);
    res.json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

export const createProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const payload = req.body;
    const profileId = await Profile.create(payload, userId);
    res.status(201).json({ success: true, data: { profileId } });
  } catch (error) {
    next(error);
  }
};

export const uploadAvatar = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const avatarUrl = req.file ? `/uploads/avatars/${req.file.filename}` : null;
    if (!avatarUrl) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }
    await Profile.uploadAvatar(avatarUrl, userId);
    res.status(200).json({ success: true, data: { avatarUrl } });
  } catch (error) {
    next(error);
  }
};
