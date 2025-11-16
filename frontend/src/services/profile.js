import { BACKEND_URL } from "../utils/constants";

export const get = async (token) => {
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

export const update = async (token, formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) throw new Error("Failed to update profile");

    const data = await res.json();
    if (!data.success)
      throw new Error(data.message || "Failed to update profile");

    return data.data;
  } catch (error) {
    console.error("updateProfile error:", error);
    return null;
  }
};

export const getByWord = async (token, word) => {
  console.log(word);
  try {
    const res = await fetch(
      `${BACKEND_URL}/profile/search?word=${encodeURIComponent(word)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch profiles");
    }

    const data = await res.json();
    if (!data.success) {
      throw new Error(data.message || "Failed to get profile");
    }

    return data.data;
  } catch (error) {
    console.error("getByWord error:", error);
  }
};
