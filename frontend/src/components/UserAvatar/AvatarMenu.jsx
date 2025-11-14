import { NavLink } from "react-router-dom";
import "../../styles/UserAvatar.css";
import AvatarCircle from "./AvatarCircle";

export default function AvatarMenu() {
  return (
    <div className="avatar-menu">
      <div className="avatar-menu-profile">
        <span className="profile-section-label">ACCOUNT</span>

        <div className="profile-content">
          <AvatarCircle size={45} />

          <div className="profile-content-info">
            <p className="profile-name">mehdi zalyaul</p>
            <p className="profile-email">mehdi.zalyaul@gmail.com</p>
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
