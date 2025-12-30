import { NavLink } from "react-router-dom";
import AvatarCircle from "./AvatarCircle";
import "../../styles/AvatarMenu.css";
export default function AvatarMenu({ avatarUrl, profile }) {
  return (
    <div className="avatar-menu">
      <div className="avatar-menu-profile">
        <span className="profile-section-label">ACCOUNT</span>

        <div className="profile-content">
          <AvatarCircle avatarUrl={avatarUrl} size={45} />

          <div className="profile-content-info">
            <p className="profile-name">{profile?.full_name}</p>
            <p className="profile-bio">
              {profile?.bio || "Add your bio to appear here"}
            </p>
          </div>
        </div>
      </div>
      <NavLink to="/profile" className="navlink">
        Profile
      </NavLink>
      <NavLink to="/settings" className="navlink">
        Settings
      </NavLink>
    </div>
  );
}
