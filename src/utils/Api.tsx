// src/utils/api.ts
import axios from "axios";

export const fetchUserProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const response = await axios.get("http://localhost:5000/api/user/profile", {
      headers: { Authorization: `${token}` },
    });
    return response.data; // Return user profile data
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null; // Return null if there's an error
  }
};
