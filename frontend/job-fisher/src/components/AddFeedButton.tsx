import { Plus } from "lucide-react";

interface AddFeedButtonProps {
  onClick: () => void;
}

const AddFeedButton = ({ onClick }: AddFeedButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="
        w-full flex items-center justify-center gap-2
        px-4 py-3
        rounded-xl
        bg-[#111111] text-white font-semibold
        border-2 border-[#00FF88]
        shadow-[0_0_20px_rgba(0,255,136,0.6)]
        hover:shadow-[0_0_35px_rgba(0,255,136,0.9)]
        active:scale-[0.97]
        transition
      "
    >
      <Plus className="w-5 h-5" />
      Add Feed ✨
    </button>
  );
};

export default AddFeedButton;
