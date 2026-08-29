import { useEffect, useState } from "react";
import { Feed, CreateFeedDto } from "../types";
import { feedService } from "../services/feeds";
import { api } from "../services/api";

export const useFeedManager = (
  onFeedSelect: (id: number | null) => void,
  setFeeds: (feeds: Feed[]) => void,
  /** Localised copy for the delete confirmation prompt. */
  deleteConfirmMessage: string
) => {
  const [isLoading, setIsLoading] = useState(true);

  // Dialog & settings UI
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFeed, setEditingFeed] = useState<Feed | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [code, setCode] = useState("");

  // Telegram
  const [telegramLink, setTelegramLink] = useState("");
  const [telegramStatus, setTelegramStatus] = useState<
    "connected" | "disconnected"
  >("disconnected");
  const [isTelegramDialogOpen, setIsTelegramDialogOpen] = useState(false);

  // Email
  const [emailLink, setEmailLink] = useState("");
  const [emailStatus, setEmailStatus] = useState<"connected" | "disconnected">(
    "disconnected"
  );
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);

  // Billing
  const [isBillingDialog, setBillingDialog] = useState(false);

  useEffect(() => {
    loadFeeds();
    checkTelegramStatus();
  }, []);

  const checkTelegramStatus = async () => {
    const savedStatus = localStorage.getItem("telegram_status");
    if (savedStatus === "connected") {
      setTelegramStatus("connected");
      return;
    }
    const res = await api.get("telegram/connection");
    if (res.data.connect) {
      localStorage.setItem("telegram_status", "connected");
      setTelegramStatus("connected");
      return;
    }
  };

  const loadFeeds = async () => {
    try {
      setIsLoading(true);
      const data = await feedService.getFeeds();
      setFeeds(data);
    } catch (error) {
      console.error("Failed to load feeds:", error);
      setFeeds([]);
    } finally {
      setIsLoading(false);
    }
  };

  const setTelegramConnectionStatus = (status: boolean) => {
    if (status) {
      setTelegramStatus("connected");
      localStorage.setItem("telegram_status", "connected");
    } else {
      setTelegramStatus("disconnected");
      localStorage.setItem("telegram_status", "disconnected");
    }
  };

  const handleCreateFeed = async (feedData: CreateFeedDto) => {
    await feedService.createFeed(feedData);
    await loadFeeds();
  };

  const handleUpdateFeed = async (feedData: CreateFeedDto) => {
    if (!editingFeed) return;

    await feedService.updateFeed(editingFeed.id, feedData);
    await loadFeeds();
  };

  const handleDeleteFeed = async (feedId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm(deleteConfirmMessage)) return;

    try {
      await feedService.deleteFeed(feedId);
      await loadFeeds();
      onFeedSelect(null);
    } catch (error) {
      console.error("Failed to delete feed:", error);
    }
  };

  const handleEditFeed = (feed: Feed, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingFeed(feed);
    setIsDialogOpen(true);
  };

  const handleSave = async (feedData: CreateFeedDto) => {
    if (editingFeed) await handleUpdateFeed(feedData);
    else await handleCreateFeed(feedData);
  };

  const handleEmailSetup = () => {
    if (emailLink.trim()) {
      localStorage.setItem("email_link", emailLink);
      setEmailStatus("connected");
    }
    setIsEmailDialogOpen(false);
  };

  return {
    isLoading,
    isDialogOpen,
    setIsDialogOpen,
    editingFeed,
    handleEditFeed,
    handleSave,
    handleDeleteFeed,
    setEditingFeed,
    isSettingsOpen,
    setIsSettingsOpen,

    // Telegram
    telegramLink,
    setTelegramLink,
    telegramStatus,
    isTelegramDialogOpen,
    setIsTelegramDialogOpen,
    setTelegramConnectionStatus,
    code,
    setCode,

    // Email
    emailLink,
    setEmailLink,
    emailStatus,
    isEmailDialogOpen,
    setIsEmailDialogOpen,
    handleEmailSetup,

    //Billing
    isBillingDialog,
    setBillingDialog,
  };
};
