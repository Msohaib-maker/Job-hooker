import { InputHTMLAttributes } from "react";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "prefix"> {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  // Clamp: if provided, onBlur enforces min
  clampMin?: number;
  // Style overrides
  className?: string;
  inputClassName?: string;
  // Addons
  prefix?: React.ReactNode;  // e.g. "$" or an icon
  suffix?: React.ReactNode;  // e.g. "USD" or an icon
}

export function InputElement({
  value,
  onChange,
  label,
  required,
  error,
  hint,
  clampMin,
  className = "",
  inputClassName = "",
  prefix,
  suffix,
  placeholder,
  type = "text",
  disabled,
  ...rest
}: InputProps) {
  const handleBlur = () => {
    if (clampMin !== undefined && type === "number") {
      const num = parseFloat(value);
      if (!isNaN(num) && num < clampMin) onChange(String(clampMin));
    }
  };

  const hasAddon = prefix || suffix;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-[#8FAE9B]">
          {label}
          {required && <span className="text-[#00FF88] ml-0.5">*</span>}
        </label>
      )}

      <div className={`
        flex items-center
        rounded-xl bg-[#0B0F0D]
        border transition-all duration-200
        ${error ? "border-red-500/60" : "border-[#1F2A24] hover:border-[#2A3D30]"}
        focus-within:border-[#00FF88]/60
        focus-within:shadow-[0_0_16px_rgba(0,255,136,0.15)]
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}>
        {prefix && (
          <span className="pl-4 text-[#4A6157] text-sm flex-shrink-0">{prefix}</span>
        )}

        <input
          {...rest}
          type={type}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleBlur}
          className={`
            flex-1 px-4 py-2.5 bg-transparent
            text-sm text-white placeholder:text-[#4A6157]
            focus:outline-none
            ${hasAddon ? (prefix ? "pl-2" : "") : ""}
            ${inputClassName}
          `}
        />

        {suffix && (
          <span className="pr-4 text-[#4A6157] text-sm flex-shrink-0">{suffix}</span>
        )}
      </div>

      {hint && !error && (
        <p className="text-xs text-[#4A6157]">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}