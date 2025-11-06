import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext, SearchContext } from "../context";

import Search from "./Search";
import "../styles/Navbar.css";
import Button from "./Button";

export default function Navbar() {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const { search, setSearch } = useContext(SearchContext);
  return (
    <nav>
      <div>
        {user.role === "admin" && (
          <>
            <NavLink to="/" end>
              Dashboard
            </NavLink>
            <NavLink to="/tasks">Tasks</NavLink>
            <NavLink to="/profiles">Profiles</NavLink>
          </>
        )}

        {isAuthenticated && (
          <div className="navbar-navigation">
            <NavLink to="/tasks/mine">MyTasks</NavLink>
            <NavLink to="/settings">Settings</NavLink>
            <NavLink to="/login" onClick={logout}>
              Logout
            </NavLink>
          </div>
        )}
      </div>

      {isAuthenticated && <Search search={search} setSearch={setSearch} />}
      {isAuthenticated && (
        <Button fullWidth={false} alignLeft={false} title="Create Project" />
      )}
    </nav>
  );
}
