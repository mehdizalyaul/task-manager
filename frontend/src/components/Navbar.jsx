import { useContext } from "react";
import { AuthContext, SearchContext } from "../context";

import Search from "./Search";
import "../styles/Navbar.css";
import Button from "./Button";
import { Boxes } from "lucide-react";

export default function Navbar({ openModal }) {
  const { isAuthenticated } = useContext(AuthContext);
  const { search, setSearch } = useContext(SearchContext);
  return (
    <nav>
      <div className="navbar-navigation">
        <Boxes color="white" size={30} />
      </div>

      {isAuthenticated && <Search search={search} setSearch={setSearch} />}
      {isAuthenticated && (
        <Button
          fullWidth={false}
          alignLeft={false}
          title="Create Project"
          onClickButton={openModal}
        />
      )}
    </nav>
  );
}
