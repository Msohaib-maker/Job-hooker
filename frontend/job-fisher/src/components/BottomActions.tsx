import { LogOut, Bell, CreditCard } from "lucide-react";

interface BottomActionsProps {
  setBillingDialog: (value: boolean) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (value: boolean) => void;
  signOut?: () => void;
}

const BottomActions = ({
  setBillingDialog,
  isSettingsOpen,
  setIsSettingsOpen,
  signOut,
}: BottomActionsProps) => {
  const buttonBase = `
      w-full flex items-center gap-4
      px-4 py-3 rounded-xl
      text-[#A1A1AA] font-medium
      hover:text-[#EDEDED] hover:bg-[#1A1A1A]
      transition-all duration-200
    `;

  return (
    <div className="border-t border-[#262626] pt-3 flex flex-col gap-1">
      <button onClick={() => setBillingDialog(true)} className={buttonBase}>
        <CreditCard className="w-5 h-5 text-[#737373]" />
        <span className="text-sm">Billing</span>
      </button>

      <button
        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        className={buttonBase}
      >
        <Bell className="w-5 h-5 text-[#737373]" />
        <span className="text-sm">Notification Settings</span>
      </button>

      {signOut && (
        <button onClick={signOut} className={`${buttonBase} hover:text-red-400`}>
          <LogOut className="w-5 h-5 text-[#737373]" />
          <span className="text-sm">Sign out</span>
        </button>
      )}
    </div>
  );
};

export default BottomActions;

