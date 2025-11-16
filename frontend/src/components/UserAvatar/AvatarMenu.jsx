import { NavLink } from "react-router-dom";
import "../../styles/UserAvatar.css";
import AvatarCircle from "./AvatarCircle";

export default function AvatarMenu({ avatarUrl, profile }) {
  return (
    <div className="avatar-menu">
      <div className="avatar-menu-profile">
        <span className="profile-section-label">ACCOUNT</span>

        <div className="profile-content">
          <AvatarCircle avatarUrl={avatarUrl} size={45} />

          <div className="profile-content-info">
            <p className="profile-name">{profile.full_name}</p>
            <p className="profile-bio">
              {profile.bio || "Add your bio to appear here"}
            </p>
          </div>
        </div>
      </div>
      <NavLink to="/profile">
        <button>Profile</button>
      </NavLink>
      <button>Settings</button>
    </div>
  );
}
