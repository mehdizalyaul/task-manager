import {
  ChevronDown,
  Bell,
  Star,
  Users,
  Share2,
  MoreHorizontal,
  FilterIcon,
} from "lucide-react";
import "../../styles/BoardHeader.css";

export default function BoardHeader({ title }) {
  return (
    <header className="trello-header">
      <div className="header-left">
        <h2 className="board-title">My {title} board</h2>
        <ChevronDown size={25} className="icon" />
      </div>

      <div className="header-right">
        <Bell size={18} className="icon" />
        <FilterIcon size={18} className="icon" />
        <Star size={18} className="icon" />
        <Users size={18} className="icon" />

        <button className="share-btn">
          <Share2 size={16} />
          <span>Share</span>
        </button>

        <div className="avatar">MZ</div>

        <MoreHorizontal size={20} className="icon" />
      </div>
    </header>
  );
}
