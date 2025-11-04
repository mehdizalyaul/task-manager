import { BACKEND_URL } from "../utils/constants";

export const getByUser = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/projects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};
