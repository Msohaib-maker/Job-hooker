export interface CheckboxProps {
  label: string;
  icon: React.ReactNode;
  checked: boolean;
  onChange: (val: boolean) => void;
}

export const Checkbox = ({ label, icon, checked, onChange }: CheckboxProps) => (
  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      onChange(!checked);
    }}
    className={`
        flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium
        transition-all duration-200 select-none
        ${
          checked
            ? "bg-[#C4F029]/10 border-[#C4F029]/40 text-[#C4F029]"
            : "bg-[#151515] border-[#262626] text-[#737373] hover:border-[#C4F029]/20 hover:text-[#A1A1AA]"
        }
      `}
  >
    <span
      className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all
        ${checked ? "bg-[#C4F029] border-[#C4F029]" : "border-[#3f3f3f]"}`}
    >
      {checked && (
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path
            d="M1 4L3.5 6.5L9 1"
            stroke="#0F0F0F"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
    {icon}
    {label}
  </button>
);
