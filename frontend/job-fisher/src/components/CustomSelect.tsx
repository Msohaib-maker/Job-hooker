import { Check, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Platform } from "../types/job.type";

interface SelectOption {
  value: string;
  label: Platform;
  icon?: React.ReactNode;
}

interface CustomSelectProps {
  id: string;
  label: string;
  value: Platform[];
  onChange: (value: Platform) => void;
  options: SelectOption[];
  required?: boolean;
  placeholder?: string;
}

export function CustomSelect({
  id,
  label,
  value,
  onChange,
  options,
  required = false,
  placeholder = "Select option",
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-dark-text mb-2"
      >
        {label} {required && <span className="text-orange-500">*</span>}
      </label>

      {/* Trigger */}
      <button
        type="button"
        id={id}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:ring-2 focus:ring-orange-500"
      >
        <div className="flex items-center gap-2">
          <span>{placeholder}</span>
        </div>
        <ChevronDown className="w-4 h-4 text-dark-text-muted" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 w-36 mt-2 bg-dark-card border border-dark-border rounded-lg shadow-lg overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.label);
                setOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-left text-dark-text hover:bg-dark-bg"
            >
              {opt.icon}
              {opt.label}
              {value.includes(opt.label) && <Check size={16} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
