import { ReactElement } from "react";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  required?: boolean;
  placeholder?: string;
  icon?: boolean;
  renderOption: (option: SelectOption) => ReactElement;
}

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  required = false,
  placeholder,
  renderOption,
}: SelectFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-dark-text mb-2"
      >
        {label} {required && <span className="text-orange-500">*</span>}
      </label>

      <div className="relative w-full">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="w-full appearance-none pr-10 px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
        >
          {placeholder && <option value="">{placeholder}</option>}

          {options.map((opt) => renderOption(opt))}
        </select>

        {/* Custom arrow */}
        <svg
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-text-muted"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}
