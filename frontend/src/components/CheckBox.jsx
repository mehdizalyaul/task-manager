import { useContext } from "react";
import { ThemeContext } from "../context";
import "../styles/CheckBox.css";
export default function CheckBox() {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <input
        type="checkbox"
        id="checkbox"
        className="checkbox"
        onChange={toggleTheme}
      />
      <label htmlFor="checkbox" className="checkbox-label">
        <i className="fas fa-moon"></i>
        <i className="fas fa-sun"></i>
        <span className="ball"></span>
      </label>
    </div>
  );
}
