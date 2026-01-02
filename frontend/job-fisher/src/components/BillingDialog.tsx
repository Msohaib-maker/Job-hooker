import { ReactElement } from "react";
import { X } from "lucide-react";

export interface BillingDialogProps {
  isOpen: boolean;
  onClose: () => void;

  billingInfo?: {
    planName: string;
    price: number;
    currency: string;
    nextBillingDate?: string;
  };

  onUpgrade?: () => void;
  onCancelSubscription?: () => void;
}

export const BillingDialog = ({
  isOpen,
  onClose,
  billingInfo,
  onUpgrade,
  onCancelSubscription,
}: BillingDialogProps): ReactElement | null => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-70 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="w-full max-w-lg bg-dark-card border border-dark-border rounded-xl shadow-2xl p-6 space-y-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              Billing & Subscription
            </h2>
            <button
              onClick={onClose}
              className="text-dark-text-muted hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Billing Info */}
          {billingInfo ? (
            <div className="space-y-2">
              <div className="flex justify-between text-white">
                <span>Plan:</span>
                <span>{billingInfo.planName}</span>
              </div>
              <div className="flex justify-between text-white">
                <span>Price:</span>
                <span>
                  {billingInfo.currency} {billingInfo.price}
                </span>
              </div>
              {billingInfo.nextBillingDate && (
                <div className="flex justify-between text-dark-text-muted text-sm">
                  <span>Next Billing:</span>
                  <span>{billingInfo.nextBillingDate}</span>
                </div>
              )}
            </div>
          ) : (
            <p className="text-dark-text-muted text-sm">
              No billing information available.
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            {onCancelSubscription && (
              <button
                onClick={onCancelSubscription}
                className="flex-1 px-4 py-2 border border-dark-border rounded-lg text-dark-text font-medium hover:bg-dark-bg transition"
              >
                Cancel Subscription
              </button>
            )}

            {onUpgrade && (
              <button
                onClick={onUpgrade}
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition"
              >
                Upgrade Plan
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
