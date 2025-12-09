import { useEffect, useState } from "react";
import { Feed, CreateFeedDto } from "../types";
import { feedService } from "../services/feeds";

export const useFeedManager = (
  onFeedSelect: (id: string | null) => void,
  setFeeds: (feeds: Feed[]) => void
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

  useEffect(() => {
    loadFeeds();

    const savedTelegram = localStorage.getItem("telegram_link");
    if (savedTelegram) {
      setTelegramLink(savedTelegram);
      setTelegramStatus("connected");
    }

    const savedEmail = localStorage.getItem("email_link");
    if (savedEmail) {
      setEmailLink(savedEmail);
      setEmailStatus("connected");
    }
  }, []);

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

  const handleCreateFeed = async (feedData: CreateFeedDto) => {
    await feedService.createFeed(feedData);
    await loadFeeds();
  };

  const handleUpdateFeed = async (feedData: CreateFeedDto) => {
    if (!editingFeed) return;
    await feedService.updateFeed(editingFeed.id, feedData);
    await loadFeeds();
  };

  const handleDeleteFeed = async (feedId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this feed?")) return;

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

  const handleTelegramSetup = () => {
    if (telegramLink.trim()) {
      localStorage.setItem("telegram_link", telegramLink);
      setTelegramStatus("connected");
    }
    setIsTelegramDialogOpen(false);
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
    handleTelegramSetup,
    code,
    setCode,

    // Email
    emailLink,
    setEmailLink,
    emailStatus,
    isEmailDialogOpen,
    setIsEmailDialogOpen,
    handleEmailSetup,
  };
};
