import { useContext } from "react";
import { AuthContext, SearchContext } from "../context";
import Search from "./Search";
import Button from "./Button";
import { Boxes } from "lucide-react";
import UserAvatar from "./UserAvatar/UserAvatar";
import "../styles/Navbar.css";

export default function Navbar({ openModal }) {
  const { isAuthenticated } = useContext(AuthContext);
  const { search, setSearch } = useContext(SearchContext);
  return (
    <nav className="navbar-navigation">
      <div className="navbar-logo">
        <Boxes color="white" size={30} />
      </div>

      {isAuthenticated && (
        <div className="navbar-actions">
          <Search search={search} setSearch={setSearch} />
          <Button
            fullWidth={false}
            alignLeft={false}
            title="Create Project"
            onClickButton={openModal}
          />
        </div>
      )}

      {isAuthenticated && <UserAvatar />}
    </nav>
  );
}
