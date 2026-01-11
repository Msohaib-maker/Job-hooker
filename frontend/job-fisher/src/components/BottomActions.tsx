interface BottomActionsProps {
  setBillingDialog: (value: boolean) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (value: boolean) => void;
}

const BottomActions = ({
  setBillingDialog,
  isSettingsOpen,
  setIsSettingsOpen,
}: BottomActionsProps) => {
  const buttonBase = `
      flex items-center gap-3 w-[90%]
      px-4 py-4 rounded-xl
      text-white font-medium
      bg-[#0B0F0D]/70 backdrop-blur-md
      border border-[#1F2A24]
      shadow-[0_0_15px_rgba(0,255,136,0.25)]
      hover:shadow-[0_0_30px_rgba(0,255,136,0.5)]
      hover:border-[#00FF88]
      transition-all duration-300
    `;

  return (
    <div className="relative border-t border-dark-border p-4 flex flex-col items-center gap-2">
      <button onClick={() => setBillingDialog(true)} className={buttonBase}>
        <span className="text-xl">💳</span>
        <span className="text-sm">Billing</span>
      </button>

      <button
        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        className={buttonBase}
      >
        <span className="text-xl">🔔</span>
        <span className="text-sm">Notifications</span>
      </button>
    </div>
  );
};

export default BottomActions;
