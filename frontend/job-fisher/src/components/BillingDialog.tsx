import { ReactElement } from "react";
import { X } from "lucide-react";

export interface BillingDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BillingDialog = ({
  isOpen,
  onClose,
}: BillingDialogProps): ReactElement | null => {
  if (!isOpen) return null;

  const subscriptions = [
    {
      name: "Free",
      price: 0,
      period: "per 12h",
      features: ["10 jobs per feed", "Manual apply only"],
      active: false,
    },
    {
      name: "Pro",
      price: 15,
      period: "per month",
      features: [
        "40 jobs per feed every 2h",
        "Proposal generator",
        "Automatic job apply",
      ],
      active: false,
    },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[999]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
        <div
          className="w-full max-w-4xl bg-[#0B0F0D]/90 backdrop-blur-xl
          border border-[#1F2A24] rounded-2xl shadow-[0_0_40px_rgba(0,255,136,0.25)]
          p-6 space-y-6 transition-all duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-white tracking-wide">
              Billing & Subscription
            </h2>
            <button
              onClick={onClose}
              className="text-[#8FAE9B] hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Subscription Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subscriptions.map((sub) => (
              <div
                key={sub.name}
                className={`rounded-2xl border p-6 flex flex-col justify-between
                bg-[#0B0F0D]/30
                border-[#1F2A24]
                shadow-[0_0_20px_rgba(0,255,136,0.1)]
                hover:shadow-[0_0_30px_rgba(0,255,136,0.3)]
                transition-all duration-300`}
              >
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">{sub.name}</h3>
                  <p className="text-2xl font-extrabold text-orange-500">
                    {sub.price === 0 ? "$0" : `$${sub.price}`}{" "}
                    <span className="text-sm font-medium text-[#8FAE9B]">
                      {sub.period}
                    </span>
                  </p>

                  <ul className="space-y-2 text-sm text-[#8FAE9B] list-disc list-inside">
                    {sub.features.map((feat) => (
                      <li key={feat}>{feat}</li>
                    ))}
                  </ul>
                </div>

                {/* Button / Active Development */}
                <button
                  disabled
                  className="mt-4 px-4 py-2 rounded-lg bg-gray-700 text-gray-400 font-medium cursor-not-allowed transition"
                >
                  Active Development 🔧
                </button>
              </div>
            ))}
          </div>

          <p className="mt-4 text-sm text-[#8FAE9B] text-center">
            Subscription system is under active development. New features coming
            soon!
          </p>
        </div>
      </div>
    </>
  );
};
