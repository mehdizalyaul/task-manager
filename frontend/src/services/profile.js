import { BACKEND_URL } from "../utils/constants";

export const getProfile = async (token) => {
  try {
    const res = await fetch(`${BACKEND_URL}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch profile");
    }

    const data = await res.json();
    if (!data.success) {
      throw new Error(data.message || "Failed to update profile");
    }
    return data.data;
  } catch (error) {
    console.error("getProfile error:", error);
  }
};

export const updateProfile = async (token, updatedProfile) => {
  try {
    const res = await fetch(`${BACKEND_URL}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedProfile),
    });

    if (!res.ok) {
      throw new Error("Failed to update profile");
    }
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.message || "Failed to update profile");
    }
    return data.data;
  } catch (error) {
    console.error("updateProfile error:", error);
  }
};
