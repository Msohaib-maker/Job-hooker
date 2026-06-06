import { Mail, Send, X } from "lucide-react";
import { ReactElement, useEffect, useState } from "react";
import { subscribeApi } from "../services/subscribe";

export type ConnectionStatus = "connected" | "disconnected";

export interface NotificationDialogProps {
  setIsSettingsOpen: (value: boolean) => void;
  telegramStatus: ConnectionStatus;
  telegramConnection: () => void;
}

export const NotificationDialog = ({
  setIsSettingsOpen,
  telegramStatus,
  telegramConnection,
}: NotificationDialogProps): ReactElement => {
  const [emailStatus, setEmailStatus] = useState<
    "subscribed" | "not_subscribed"
  >("not_subscribed");

  useEffect(() => {
    const savedStatus = localStorage.getItem("emailSubscription");
    if (savedStatus === "subscribed") {
      setEmailStatus("subscribed");
    } else {
      setEmailStatus("not_subscribed");
    }
  }, []);

  const toggleEmailSubscription = async () => {
    try {
      const response = await subscribeApi.subscribe();

      if (response.success) {
        const newStatus = response.subsciption
          ? "subscribed"
          : "not_subscribed";
        setEmailStatus(newStatus);

        // Save the updated status in localStorage
        localStorage.setItem("emailSubscription", newStatus);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error("Failed to toggle email subscription:", error);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[999]"
        onClick={() => setIsSettingsOpen(false)}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
        <div
          className="
        w-full max-w-2xl
        bg-[#0B0F0D]/90 backdrop-blur-xl
        border border-[#1F2A24]
        rounded-2xl shadow-[0_0_40px_rgba(0,255,136,0.25)]
        p-8 space-y-6
        transition-all duration-300
      "
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-white tracking-wide">
              Notification Settings
            </h2>
            <button
              onClick={() => setIsSettingsOpen(false)}
              className="text-[#8FAE9B] hover:text-white transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Telegram Row */}
          <div
            className={`rounded-2xl border p-6 flex items-center justify-between
          transition-all duration-300
          ${
            telegramStatus === "connected"
              ? "border-green-500 shadow-[0_0_25px_rgba(0,255,136,0.3)]"
              : "border-[#1F2A24] hover:border-[#00FF88]/50 shadow-[0_0_15px_rgba(0,255,136,0.1)]"
          }
          bg-[#0B0F0D]/30
          min-h-[80px]
        `}
          >
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-sky-500/80 shadow-md">
                <Send className="w-7 h-7 text-white" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-white text-lg">
                    Telegram
                  </span>
                  {telegramStatus === "connected" && (
                    <span className="px-2 py-1 text-xs rounded-full bg-green-600/20 text-green-400">
                      Connected
                    </span>
                  )}
                </div>
                {telegramStatus !== "connected" && (
                  <span className="text-sm text-[#8FAE9B]">Not connected</span>
                )}
              </div>
            </div>

            <button
              onClick={telegramConnection}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition
            ${
              telegramStatus === "connected"
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-orange-500 text-white hover:bg-orange-600"
            } shadow-lg`}
            >
              {telegramStatus === "connected" ? "Enabled" : "Connect"}
            </button>
          </div>

          {/* Email Row */}
          {/* Email Row */}
          <div
            className={`rounded-2xl border p-6 flex items-center justify-between
    transition-all duration-300
    ${
      emailStatus === "subscribed"
        ? "border-green-500 shadow-[0_0_25px_rgba(0,255,136,0.3)]"
        : "border-[#1F2A24] hover:border-[#00FF88]/50 shadow-[0_0_15px_rgba(0,255,136,0.1)]"
    }
    bg-[#0B0F0D]/30
    min-h-[80px]
  `}
          >
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-600/80">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-white text-lg">
                    Email
                  </span>
                  {emailStatus === "subscribed" && (
                    <span className="px-2 py-1 text-xs rounded-full bg-green-600/20 text-green-400">
                      Subscribed
                    </span>
                  )}
                  {emailStatus !== "subscribed" && (
                    <span className="text-sm text-[#8FAE9B]">
                      Not Subscribed
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={toggleEmailSubscription}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition
      ${
        emailStatus === "subscribed"
          ? "bg-green-500 text-white hover:bg-green-600"
          : "bg-orange-500 text-white hover:bg-orange-600"
      } shadow-lg`}
            >
              {emailStatus === "subscribed" ? "Unsubscribe" : "Subscribe"}
            </button>
          </div>

          {/* Webhook Row */}
          {/* <div className="rounded-2xl border border-[#1F2A24] bg-black/20 p-6 flex items-center justify-between min-h-[80px] opacity-70 shadow-[0_0_15px_rgba(0,255,136,0.05)]">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-purple-500/80">
            <Wifi className="w-7 h-7 text-white" />
          </div>
          <div>
            <span className="font-semibold text-white text-lg">
              Webhook
            </span>
            <p className="text-sm text-[#8FAE9B]">Coming Soon</p>
          </div>
        </div>
        <button
          disabled
          className="px-6 py-3 rounded-xl bg-gray-700 text-gray-400 font-medium cursor-not-allowed"
        >
          Active Development 🔧
        </button>
      </div> */}
        </div>
      </div>
    </>
  );
};
