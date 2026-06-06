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
  // Prevent parent onClick from firing when clicking action buttons
  const handleAction = (
    e: React.MouseEvent,
    callback: (e: React.MouseEvent) => void
  ) => {
    e.stopPropagation();
    callback(e);
  };

  return (
    <div
      onClick={onSelect}
      className={`
        group relative p-4 rounded-xl cursor-pointer
        border transition-all duration-300 ease-out select-none mb-0
        ${
          isSelected
            ? "bg-[#151515] border-[#C4F029] shadow-[0_0_20px_rgba(196,240,41,0.15)]"
            : "bg-[#0F0F0F] border-[#262626] hover:bg-[#1A1A1A] hover:border-[#C4F029]/40 hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
        }
      `}
    >
      <div className="flex items-start gap-3.5">
        {/* Left Icon Indicator */}
        <div
          className={`
            p-2 rounded-lg transition-colors duration-300 mt-0.5
            ${isSelected ? "bg-[#C4F029]/10 text-[#C4F029]" : "bg-[#262626] text-[#737373] group-hover:text-[#C4F029]"}
          `}
        >
          <Rss className="w-4 h-4 flex-shrink-0" />
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0 pr-16">
          {" "}
          {/* pr-16 leaves safe room for hover actions */}
          <h3 className="font-medium text-sm text-[#EDEDED] group-hover:text-[#C4F029] tracking-wide truncate transition-colors">
            {feed.title}
          </h3>
          <div className="text-xs text-[#A1A1AA] mt-1.5 space-y-1 font-normal">
            <p className="flex items-center gap-1.5 line-clamp-1">
              <span className="opacity-70">🌍</span> {feed.location}
              <span className="text-[#262626]">•</span>
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] font-medium tracking-wider uppercase ${feed.type === "remote" ? "bg-sky-500/10 text-sky-400" : "bg-amber-500/10 text-amber-400"}`}
              >
                {feed.type}
              </span>
            </p>

            <p className="flex items-center gap-1 line-clamp-1 text-[#A1A1AA]">
              Experience:{" "}
              <span className="text-[#EDEDED] font-medium">{feed.exp}yr</span>
              <span className="text-[#262626] mx-0.5">•</span>
              <span className="text-[#C4F029] font-medium">
                {feed.salary.toLocaleString()} {feed.salaryCurrency}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Floating Action Menu */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1.5 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
        <div className="flex items-center gap-1 bg-[#0F0F0F]/90 backdrop-blur-sm p-1 rounded-lg border border-[#262626] shadow-xl">
          <button
            onClick={(e) => handleAction(e, (ev) => onEdit(feed, ev))}
            className="p-1.5 rounded-md text-[#A1A1AA] hover:text-[#C4F029] hover:bg-[#1A1A1A] transition-all"
            title="Edit feed"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={(e) => handleAction(e, (ev) => onDelete(feed.id, ev))}
            className="p-1.5 rounded-md text-[#A1A1AA] hover:text-red-400 hover:bg-red-500/10 transition-all"
            title="Delete feed"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedItem;
