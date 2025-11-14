import { useContext, useEffect, useState } from "react";
import { Type, BookText, Flag, Image as ImageIcon } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { getProfile, updateProfile } from "../services/profile";
import "../styles/ProfilePage.css";
import AvatarCircle from "../components/UserAvatar/AvatarCircle";

export default function ProfilePage() {
  const { token } = useContext(AuthContext);
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile(token);

        if (!profile) return;

        setAvatar(profile.avatar_url || "");
        setFullName(profile.full_name || "");
        setPhone(profile.phone || "");
        setJobTitle(profile.job_title || "");
      } catch (error) {
        console.error("fetchProfile error:", error);
      }
    };

    fetchProfile();
  }, []);

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
    formData.append("phone", phone);
    formData.append("job_title", jobTitle);

    try {
      const updatedProfile = await updateProfile(token, formData);

      if (!updatedProfile) return;
    } catch (error) {
      console.error("updateProfile error:", error);
    }
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className="profile-form-header">
        <h2>Welcome {fullName || "User"}</h2>
        <AvatarCircle size={100} />
      </div>

      {/* Avatar Upload */}
      <label className="input-text">
        <ImageIcon size={18} />
        <span>Profile Image</span>
      </label>

      <input type="file" accept="image/*" onChange={handleImageChange} />

      {preview && (
        <img
          src={preview}
          alt="preview"
          className="avatar-preview"
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            marginTop: "10px",
          }}
        />
      )}

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

      {/* Phone */}
      <label className="input-text">
        <BookText size={18} />
        <span>Phone Number</span>
      </label>
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
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
