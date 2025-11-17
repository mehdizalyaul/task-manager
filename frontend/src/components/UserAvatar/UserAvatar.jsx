import { useState, useRef, useEffect, useContext } from "react";
import AvatarCircle from "./AvatarCircle";
import AvatarMenu from "./AvatarMenu";
import { ProfileContext } from "../../context/ProfileContext";
import "../../styles/UserAvatar.css";

export default function UserAvatar() {
  const { profile } = useContext(ProfileContext);
  if (!profile) return null;
  const imageUrl = profile.avatar_url
    ? `http://localhost:5000${profile.avatar_url}`
    : "";

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const toggleAvatarMenu = () => {
    setIsOpen((prev) => !prev);
  };
  // Close dropdown on outside click
  useEffect(() => {
    function handleOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div className="avatar-wrapper" ref={ref}>
      <AvatarCircle
        avatarUrl={imageUrl}
        size={45}
        onAvatarClick={toggleAvatarMenu}
      />

      {isOpen && <AvatarMenu avatarUrl={imageUrl} profile={profile} />}
    </div>
  );
}
