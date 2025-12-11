import { useState, useEffect } from "react";
import {
  Plus,
  Rss,
  Trash2,
  Edit2,
  Loader2,
  Mail,
  Send,
  X,
  Settings,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import FeedDialog from "./FeedDialog";
import type { Feed } from "../types";
import { useFeedManager } from "../hooks/useFeedHook";
import { generateOTP } from "../utils/code-generator";
import { api } from "../services/api";

interface FeedListProps {
  selectedFeedId: string | null;
  onFeedSelect: (feedId: string | null) => void;
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
    code,
    setCode,

    emailLink,
    setEmailLink,
    emailStatus,
    isEmailDialogOpen,
    setIsEmailDialogOpen,
    handleEmailSetup,
  } = useFeedManager(onFeedSelect, setFeeds);

  const checkTelegramConnection = async () => {
    return await api.get("telegram/connection");
  };

  const telegramConnection = async () => {
    const res = await checkTelegramConnection();
    if (!res.data.connect) {
      const code = generateOTP();
      setCode(code);
      setIsTelegramDialogOpen(false);
      await api.post("telegram/code", { code });
      window.open(`https://t.me/job_fisher_bot?start=${code}`, "_blank");
    } else {
      setTelegramConnectionStatus(true);
      window.open(`https://t.me/job_fisher_bot`, "_blank");
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
        <div className="relative border-t border-dark-border p-4 flex justify-center">
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="
    flex items-center justify-center gap-2 
    px-4 
    w-[90%] 
    pt-4
    pb-4
    rounded-xl       /* radius ~12px */
    bg-gray-600      /* good contrast on dark bg */
    border border-gray-500
    hover:bg-gray-500
    text-white 
    transition
  "
          >
            <Settings className="w-5 h-5" />
            <span className="text-sm font-medium">Settings</span>
          </button>

          {/* Dropdown Menu */}
          {isSettingsOpen && (
            <>
              {/* Backdrop to close dropdown */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsSettingsOpen(false)}
              />
              <div className="absolute bottom-full right-0 mb-2 bg-dark-card border border-dark-border rounded-lg shadow-xl z-50 p-4 space-y-3 min-w-[280px] transform translate-x-1/2">
                {/* Telegram Setting */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Send className="w-5 h-5 text-dark-text" />
                      <span className="text-sm font-semibold text-dark-text">
                        Telegram
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {telegramStatus === "connected" ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span className="text-xs font-medium text-green-500">
                            Connected
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-dark-text-muted" />
                          <span className="text-xs font-medium text-dark-text-muted">
                            Not Connected
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      telegramConnection();
                      setIsSettingsOpen(false);
                    }}
                    className="w-full px-3 py-2 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 transition font-medium"
                  >
                    {telegramStatus === "connected"
                      ? "Edit Telegram"
                      : "Connect Telegram"}
                  </button>
                </div>

                {/* Email Setting */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="w-5 h-5 text-dark-text" />
                      <span className="text-sm font-semibold text-dark-text">
                        Email
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {emailStatus === "connected" ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span className="text-xs font-medium text-green-500">
                            Connected
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-dark-text-muted" />
                          <span className="text-xs font-medium text-dark-text-muted">
                            Not Connected
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setIsEmailDialogOpen(true);
                      setIsSettingsOpen(false);
                    }}
                    className="w-full px-3 py-2 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 transition font-medium"
                  >
                    {emailStatus === "connected"
                      ? "Edit Email"
                      : "Connect Email"}
                  </button>
                </div>
              </div>
            </>
          )}
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

      {/* Email Dialog */}
      {isEmailDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-card rounded-xl shadow-2xl max-w-md w-full border border-dark-border">
            <div className="flex items-center justify-between p-6 border-b border-dark-border">
              <h2 className="text-2xl font-bold text-dark-text">Email Setup</h2>
              <button
                onClick={() => setIsEmailDialogOpen(false)}
                className="text-dark-text-muted hover:text-dark-text transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-text mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={emailLink}
                  onChange={(e) => setEmailLink(e.target.value)}
                  className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                  placeholder="your@email.com"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setIsEmailDialogOpen(false)}
                  className="flex-1 px-4 py-2 border border-dark-border rounded-lg text-dark-text font-medium hover:bg-dark-bg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEmailSetup}
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedList;
