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
    const { full_name, bio, phone_number, job_title } = req.body;

    // Only include fields that are provided
    const updatedData = {};
    if (full_name) updatedData.full_name = full_name;
    if (bio) updatedData.bio = bio;
    if (phone_number) updatedData.phone_number = phone_number;
    if (job_title) updatedData.job_title = job_title;

    // If avatar is uploaded, add it
    if (req.file) {
      updatedData.avatar_url = `/uploads/avatars/${req.file.filename}`;
    }

    // If nothing to update
    if (Object.keys(updatedData).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Nothing to update" });
    }

    const updated = await Profile.update(updatedData, userId);
    if (!updated) {
      return res.status(400).json({ success: false, message: "Update failed" });
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
