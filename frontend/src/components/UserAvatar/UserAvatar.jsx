import { useState, useRef, useEffect } from "react";
import "../../styles/UserAvatar.css";
import AvatarCircle from "./AvatarCircle";
import AvatarMenu from "./AvatarMenu";

export default function UserAvatar() {
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
      <AvatarCircle size={45} onAvatarClick={toggleAvatarMenu} />

      {isOpen && <AvatarMenu />}
    </div>
  );
}
