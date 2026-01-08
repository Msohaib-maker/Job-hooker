import { Mail, Send, X } from "lucide-react";
import { ReactElement } from "react";

export type ConnectionStatus = "connected" | "disconnected";

export interface NotificationDialogProps {
  //   isOpen: boolean;
  //   onClose: () => void;

  //   telegram: {
  //     status: ConnectionStatus;
  //     username?: string;
  //     onConnect: () => void;
  //   };

  //   email?: {
  //     enabled: boolean;
  //   };

  setIsSettingsOpen: (value: boolean) => void;
  telegramStatus: ConnectionStatus;
  telegramConnection: () => void;
}

export const NotificationDialog = ({
  setIsSettingsOpen,
  telegramStatus,
  telegramConnection,
}: NotificationDialogProps): ReactElement => {
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-70 z-60"
        onClick={() => setIsSettingsOpen(false)}
      >
        {/* Modal */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="w-full max-w-lg bg-dark-card border border-dark-border rounded-xl shadow-2xl p-6 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                Notification Settings
              </h2>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="text-dark-text-muted hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Telegram Card */}
            <div className="rounded-xl border border-dark-border bg-black/30 p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-sky-500">
                  <Send className="w-6 h-6 text-white" />
                </div>

                {/* Info */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">Telegram</span>
                    {telegramStatus === "connected" && (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-green-600/20 text-green-400">
                        Connected
                      </span>
                    )}
                  </div>

                  {telegramStatus !== "connected" && (
                    <span className="text-sm text-dark-text-muted">
                      Not connected
                    </span>
                  )}
                </div>
              </div>

              {/* Action */}
              <button
                onClick={telegramConnection}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition
              ${
                telegramStatus === "connected"
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-orange-500 text-white hover:bg-orange-600"
              }
            `}
              >
                {telegramStatus === "connected" ? "Enabled" : "Connect"}
              </button>
            </div>

            {/* Email Card (Coming Soon) */}
            <div className="rounded-xl border border-dark-border bg-black/20 p-4 flex items-center justify-between opacity-70">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-600">
                  <Mail className="w-6 h-6 text-white" />
                </div>

                <div className="space-y-1">
                  <span className="font-semibold text-white">Email</span>
                </div>
              </div>

              <button
                disabled
                className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-700 text-gray-400 cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
