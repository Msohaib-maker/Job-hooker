import {
  Plus,
  Rss,
  Trash2,
  Edit2,
  Loader2,
  CreditCard,
  Bell,
} from "lucide-react";
import FeedDialog from "./FeedDialog";
import type { Feed } from "../types";
import { useFeedManager } from "../hooks/useFeedHook";
import { generateOTP } from "../utils/code-generator";
import { api } from "../services/api";
import { NotificationDialog } from "./NotificationDialog";
import { BillingDialog } from "./BillingDialog";

interface FeedListProps {
  selectedFeedId: number | null;
  onFeedSelect: (feedId: number | null) => void;
  feeds: Feed[];
  setFeeds: (feeds: Feed[]) => void;
}

const FeedList = ({
  selectedFeedId,
  onFeedSelect,
  feeds,
  setFeeds,
}: FeedListProps) => {
  const {
    isLoading,
    isDialogOpen,
    setIsDialogOpen,
    setEditingFeed,
    editingFeed,
    handleEditFeed,
    handleSave,
    handleDeleteFeed,

    isSettingsOpen,
    setIsSettingsOpen,

    telegramStatus,
    setTelegramConnectionStatus,
    setIsTelegramDialogOpen,
    setCode,

    isBillingDialog,
    setBillingDialog,
  } = useFeedManager(onFeedSelect, setFeeds);

  const checkTelegramConnection = async () => {
    return await api.get("telegram/connection");
  };

  const telegramConnection = async () => {
    const res = await checkTelegramConnection();
    const botBaseUrl = import.meta.env.VITE_BOT_URL;
    if (!res.data.connect) {
      const code = generateOTP();
      setCode(code);
      setIsTelegramDialogOpen(false);
      await api.post("telegram/code", { code });
      // https://t.me/real_job_fisher_bot production
      window.open(`${botBaseUrl}?start=${code}`, "_blank");
    } else {
      setTelegramConnectionStatus(true);
      window.open(`${botBaseUrl}`, "_blank");
    }
  };

  return (
    <>
      <div className="h-full flex flex-col bg-dark-surface border-r border-dark-border">
        <div className="p-4 border-b border-dark-border">
          <button
            onClick={() => {
              setEditingFeed(null);
              setIsDialogOpen(true);
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition"
          >
            <Plus className="w-5 h-5" />
            Add Feed
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="w-6 h-6 text-dark-text-muted animate-spin" />
            </div>
          ) : feeds.length === 0 ? (
            <div className="p-8 text-center text-dark-text-muted">
              <Rss className="w-12 h-12 mx-auto mb-3 text-dark-text-muted" />
              <p className="text-sm">No feeds yet</p>
              <p className="text-xs mt-1">Click "Add Feed" to get started</p>
            </div>
          ) : (
            <div className="p-2">
              {feeds.map((feed) => (
                <div
                  key={feed.id}
                  onClick={() => onFeedSelect(feed.id)}
                  className={`group relative p-3 mb-2 rounded-lg cursor-pointer transition ${
                    selectedFeedId === feed.id
                      ? "bg-dark-card border-2 border-orange-500"
                      : "bg-dark-card border-2 border-transparent hover:border-dark-border"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Rss
                      className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        selectedFeedId === feed.id
                          ? "text-orange-500"
                          : "text-dark-text-muted"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-medium text-sm truncate ${
                          selectedFeedId === feed.id
                            ? "text-dark-text"
                            : "text-dark-text"
                        }`}
                      >
                        {feed.title}
                      </h3>
                      <div className="text-xs text-dark-text-muted mt-1 space-y-0.5">
                        <p className="line-clamp-1">
                          {feed.location} •{" "}
                          {feed.type === "remote" ? "Remote" : "On Site"}
                        </p>
                        <p className="line-clamp-1">
                          Exp: {feed.exp} • ${feed.salary.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={(e) => handleEditFeed(feed, e)}
                      className="p-1.5 text-dark-text-muted hover:text-orange-500 hover:bg-dark-bg rounded transition"
                      title="Edit feed"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => handleDeleteFeed(feed.id, e)}
                      className="p-1.5 text-dark-text-muted hover:text-red-500 hover:bg-dark-bg rounded transition"
                      title="Delete feed"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Settings Button at Bottom */}
        <div className="relative border-t border-dark-border p-4 flex flex-col items-center gap-2">
          <button
            onClick={() => setBillingDialog(true)}
            className="
              flex  gap-4 
              px-4 
              w-[90%] 
              pt-4
              pb-4
              rounded-xl       /* radius ~12px */
              hover:bg-gray-500
              text-white 
              transition
            "
          >
            <CreditCard className="w-5 h-5" />
            <span className="text-sm font-medium">Billings</span>
          </button>
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="
    flex  gap-4 
    px-4 
    w-[90%] 
    pt-4
    pb-4
    rounded-xl       /* radius ~12px */
    hover:bg-gray-500
    text-white 
    transition
  "
          >
            <Bell className="w-5 h-5" />
            <span className="text-sm font-medium">Notifications</span>
          </button>

          {/* Dropdown Menu */}
        </div>
      </div>

      <FeedDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingFeed(null);
        }}
        onSave={handleSave}
        feed={editingFeed}
      />

      {/* Telegram Dialog */}
      {isSettingsOpen && (
        <NotificationDialog
          setIsSettingsOpen={(value) => setIsSettingsOpen(value)}
          telegramStatus={telegramStatus}
          telegramConnection={() => telegramConnection()}
        />
      )}

      {isBillingDialog && (
        <BillingDialog
          isOpen={isBillingDialog}
          onClose={() => setBillingDialog(false)}
        />
      )}
    </>
  );
};

export default FeedList;
