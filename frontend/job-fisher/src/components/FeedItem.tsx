import { Rss, Edit2, Trash2 } from "lucide-react";
import type { Feed } from "../types";

interface FeedItemProps {
  feed: Feed;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: (feed: Feed, e: React.MouseEvent) => void;
  onDelete: (id: number, e: React.MouseEvent) => void;
}

const FeedItem = ({
  feed,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
}: FeedItemProps) => {
  return (
    <div
      onClick={onSelect}
      className={`
        group relative p-4 mb-2 rounded-xl cursor-pointer
        transition-all duration-300
        ${
          isSelected
            ? "bg-[#050807] border border-[#00FF88] shadow-[0_0_25px_rgba(0,255,136,0.35)]"
            : "bg-[#0B0F0D] border border-[#1F2A24] hover:border-[#00FF88]/40"
        }
      `}
    >
      <div className="flex items-start gap-3">
        <Rss
          className={`w-5 h-5 mt-1 flex-shrink-0 ${isSelected ? "text-[#00FF88]" : "text-[#8FAE9B]"}`}
        />

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-white truncate">
            {feed.title} 💼
          </h3>
          <div className="text-xs text-[#8FAE9B] mt-1 space-y-0.5">
            <p className="line-clamp-1">
              🌍 {feed.location} •{" "}
              {feed.type === "remote" ? "Remote" : "On-site"}
            </p>
            <p className="line-clamp-1">
              🧠 Exp: {feed.exp} • 💰 ${feed.salary.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={(e) => onEdit(feed, e)}
          className="p-1.5 rounded-md text-[#8FAE9B] hover:text-[#00FF88] hover:bg-[#050807] transition"
          title="Edit feed"
        >
          <Edit2 className="w-4 h-4" />
        </button>

        <button
          onClick={(e) => onDelete(feed.id, e)}
          className="p-1.5 rounded-md text-[#8FAE9B] hover:text-red-500 hover:bg-[#050807] transition"
          title="Delete feed"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default FeedItem;
