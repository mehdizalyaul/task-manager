import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { ProfileApi } from "../services";

export const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const { token } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!token) return;
    const fetchProfile = async () => {
      try {
        const profile = await ProfileApi.get(token);
        if (!profile) return;

        setProfile(profile);
      } catch (error) {
        console.error("fetchProfile error:", error);
      }
    };

    fetchProfile();
  }, [token]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
