import { useState, useEffect, useContext, useRef } from "react";
import { ProfileApi } from "../services";
import { AuthContext } from "../context";
import AvatarCircle from "./UserAvatar/AvatarCircle";
import { PlusCircleIcon } from "lucide-react";
import "../styles/DebounceInput.css";

function useDebounce(value) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), 1000);
    return () => clearTimeout(handler);
  }, [value]);
  return debouncedValue;
}

export default function DebounceInput({ members, addMember }) {
  const { token } = useContext(AuthContext);
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const debouncedQuery = useDebounce(query);
  const refInput = useRef();

  const handlePlus = () => {
    refInput.current.focus();
  };

  useEffect(() => {
    if (!debouncedQuery) {
      setData([]);
      return;
    }

    const getProfilesByWord = async () => {
      try {
        const profiles = await ProfileApi.getByWord(token, debouncedQuery);
        setData(profiles || []);
      } catch (error) {
        console.error(error);
      }
    };

    getProfilesByWord();
  }, [debouncedQuery, token]);

  return (
    <div className="project-form">
      <div className="search-members-container">
        <div className="members-row">
          {members.map((member) => (
            <AvatarCircle
              key={member.user_id}
              avatarUrl={
                member?.avatar_url
                  ? `http://localhost:5000${member.avatar_url}`
                  : ""
              }
              size={30}
            />
          ))}
          <PlusCircleIcon
            size={30}
            className="plus-icon"
            onClick={handlePlus}
          />
        </div>

        <input
          id="search"
          type="text"
          ref={refInput}
          className="project-input"
          placeholder="Type a name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <ul className="project-list">
        {data.map((profile) => (
          <li
            key={profile.user_id}
            className="project-list-item"
            onClick={() => addMember(profile)}
          >
            <AvatarCircle
              avatarUrl={
                profile?.avatar_url
                  ? `http://localhost:5000${profile.avatar_url}`
                  : ""
              }
              size={40}
            />
            <div className="profile-info">
              <p className="profile-name">{profile?.full_name}</p>
              <p className="profile-job">{profile?.job_title}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
