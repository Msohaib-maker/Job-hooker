import { Loader2, Plus } from "lucide-react";
import FeedDialog from "./FeedDialog";
import type { Feed } from "../types";
import { useFeedManager } from "../hooks/useFeedHook";
import { generateOTP } from "../utils/code-generator";
import { api } from "../services/api";
import { NotificationDialog } from "./NotificationDialog";
import { BillingDialog } from "./BillingDialog";
import FeedItem from "./FeedItem";
import BottomActions from "./BottomActions";
import { PlatformTitle } from "./PlatformTitle";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "../i18n";

interface FeedListProps {
  selectedFeedId: number | null;
  onFeedSelect: (feedId: number | null) => void;
  feeds: Feed[];
  setFeeds: (feeds: Feed[]) => void;
  signOut?: () => void;
}

const FeedList = ({
  selectedFeedId,
  onFeedSelect,
  feeds,
  setFeeds,
  signOut,
}: FeedListProps) => {
  const { t } = useTranslation();
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
  } = useFeedManager(onFeedSelect, setFeeds, t("feeds.confirmDelete"));

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
      <div className="h-full flex flex-col bg-[#0F0F0F]">
        {/* Logo Area — sticky, never scrolls */}
        <div className="flex-shrink-0 px-6 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#10B981] flex items-center justify-center">
              <img src="./hook1.png" />
            </div>
            <span className="text-xl font-extrabold text-[#EDEDED] tracking-wide">
              <PlatformTitle />
            </span>
            <LanguageSwitcher variant="compact" className="ml-auto" />
          </div>
        </div>
        <hr className="border-[#262626] mx-0" />
        <br></br>

        {/* Create Feed — sticky below logo, never scrolls */}
        <div className="flex-shrink-0 px-4 pb-2">
          <button
            onClick={() => {
              setEditingFeed(null);
              setIsDialogOpen(true);
            }}
            className="w-full flex items-center gap-4 px-4 py-3 text-[#A1A1AA] hover:text-[#EDEDED] transition-colors group rounded-xl hover:bg-[#1A1A1A] border border-[#262626] hover:border-[#10B981]/40"
          >
            <Plus className="w-5 h-5 text-[#737373] group-hover:text-[#10B981] transition-colors" />
            <span className="font-medium">{t("feeds.createFeed")}</span>
          </button>
        </div>

        {/* Scrollable feeds list */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          <div className="space-y-2 mb-6">
            {" "}
            {/* Adjusted spacing */}
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="w-5 h-5 text-[#A1A1AA] animate-spin" />
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
        </div>

        {/* Bottom Actions — sticky at bottom, never scrolls */}
        <div className="flex-shrink-0 px-4 pb-4">
          <BottomActions
            setBillingDialog={setBillingDialog}
            isSettingsOpen={isSettingsOpen}
            setIsSettingsOpen={setIsSettingsOpen}
            signOut={signOut}
          />
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
