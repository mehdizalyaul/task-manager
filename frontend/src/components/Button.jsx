import { Plus } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "../context";
import "../styles/Button.css";

export default function Button({
  title,
  onClickButton,
  fullWidth = false,
  alignLeft = false,
}) {
  const { theme } = useContext(ThemeContext);

  return (
    <button
      className={`add-task ${fullWidth ? "full-width" : ""} ${
        alignLeft ? "left" : ""
      } ${theme === "dark" ? "dark-mode" : "light-mode"}`}
      onClick={() => onClickButton()}
      aria-label={title}
    >
      <Plus className="button-icon" size={25} />
      <span className="button-title">{title}</span>
    </button>
  );
}
