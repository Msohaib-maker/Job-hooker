import { Rss, Loader2 } from "lucide-react";
import FeedDialog from "./FeedDialog";
import type { Feed } from "../types";
import { useFeedManager } from "../hooks/useFeedHook";
import { generateOTP } from "../utils/code-generator";
import { api } from "../services/api";
import { NotificationDialog } from "./NotificationDialog";
import { BillingDialog } from "./BillingDialog";
import AddFeedButton from "./AddFeedButton";
import FeedItem from "./FeedItem";
import BottomActions from "./BottomActions";

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
      <div
        className="
  h-full flex flex-col
  bg-[#0B0F0D]/80 backdrop-blur-xl
  border-r border-[#1F2A24]
"
      >
        <div className="p-4 border-b border-dark-border">
          <AddFeedButton
            onClick={() => {
              setEditingFeed(null);
              setIsDialogOpen(true);
            }}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="w-6 h-6 text-dark-text-muted animate-spin" />
            </div>
          ) : feeds.length === 0 ? (
            <div className="p-8 text-center text-[#8FAE9B]">
              <Rss className="w-12 h-12 mx-auto mb-3 text-[#00FF88]/80" />
              <p className="text-sm font-medium">No feeds yet 📡</p>
              <p className="text-xs mt-1">Create one to start tracking jobs</p>
            </div>
          ) : (
            feeds.map((feed) => (
              <FeedItem
                key={feed.id}
                feed={feed}
                isSelected={selectedFeedId === feed.id}
                onSelect={() => onFeedSelect(feed.id)}
                onEdit={handleEditFeed}
                onDelete={handleDeleteFeed}
              />
            ))
          )}
        </div>

        <BottomActions
          setBillingDialog={setBillingDialog}
          isSettingsOpen={isSettingsOpen}
          setIsSettingsOpen={setIsSettingsOpen}
        />
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
