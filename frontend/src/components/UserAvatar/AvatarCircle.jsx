import "../../styles/UserAvatar.css";

export default function AvatarCircle({ avatarUrl, size = 40, onAvatarClick }) {
  const defaultAvatar =
    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

  const handleClick = () => {
    if (typeof onAvatarClick === "function") {
      onAvatarClick(); // safe call
    }
  };

  return (
    <img
      src={avatarUrl || defaultAvatar}
      width={size}
      height={size}
      className="avatar-img"
      onClick={handleClick}
      alt="User Avatar"
    />
  );
}
