import { useContext, useEffect, useRef, useState } from "react";
import { Type, Phone, Flag, NotebookTabs } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import AvatarCircle from "../components/UserAvatar/AvatarCircle";
import { ProfileApi } from "../services";
import "../styles/ProfilePage.css";
import { NotificationContext } from "../context/NotificationContext";
import { LoadingContext } from "../context";

export default function ProfilePage() {
  const { token } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");

  const [phone_number, setPhoneNumber] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      startLoading();
      try {
        const profile = await ProfileApi.get(token);
        if (!profile) return;
        const imageUrl = `http://localhost:5000${profile.avatar_url}`;
        setPreview(imageUrl || "");
        setFullName(profile.full_name || "");
        setBio(profile.bio || "");
        setPhoneNumber(profile.phone_number || "");
        setJobTitle(profile.job_title || "");
      } catch (error) {
        console.error("fetchProfile error:", error);
      } finally {
        stopLoading();
      }
    };

    fetchProfile();
  }, []);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("full_name", fullName);
    formData.append("bio", bio);
    formData.append("phone_number", phone_number);
    formData.append("job_title", jobTitle);

    startLoading();
    try {
      const updatedProfile = await ProfileApi.update(token, formData);
      if (!updatedProfile) return;
      showNotification("Profile Updated Successfully");
    } catch (error) {
      console.error("updateProfile error:", error);
    } finally {
      stopLoading();
    }
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className="profile-form-header">
        <h2>Welcome {fullName || "User"}</h2>

        {/* Avatar Clickable Area */}
        <div className="avatar-upload" onClick={handleAvatarClick}>
          {preview ? (
            <img src={preview} className="avatar-preview" alt="avatar" />
          ) : (
            <AvatarCircle size={130} />
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </div>

      {/* Full Name */}
      <label className="input-text">
        <Type size={18} />
        <span>Full Name</span>
      </label>
      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Enter your full name"
        required
      />

      {/* Bio */}
      <label className="input-text">
        <NotebookTabs size={18} />
        <span>Bio</span>
      </label>
      <input
        type="text"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Enter a description of you"
      />

      {/* Phone */}
      <label className="input-text">
        <Phone size={18} /> <span>Phone Number</span>
      </label>
      <input
        type="text"
        value={phone_number}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter your phone number"
        required
      />

      {/* Job Title */}
      <label className="input-text">
        <Flag size={18} />
        <span>Job Title</span>
      </label>
      <input
        type="text"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        placeholder="Enter your job title"
        required
      />

      <button type="submit" className="submit-change">
        Submit Changes
      </button>
    </form>
  );
}
