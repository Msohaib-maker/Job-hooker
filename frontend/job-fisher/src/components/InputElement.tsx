interface InputElementProps {
  id: string;
  label: string;
  value: string;
  setValue: (val: string) => void;
  type: "text" | "number";
  min?: number;
  step?: number;
}
export const InputElement = ({
  id,
  label,
  value,
  setValue,
  type,
  min,
  step,
}: InputElementProps) => {
  if (type === "number") {
    return (
      <div>
        <label
          htmlFor={id}
          className="block text-sm font-medium text-dark-text mb-2"
        >
          {label} <span className="text-orange-500">*</span>
        </label>
        <input
          id={id}
          type={type}
          value={value}
          min={min}
          step={step}
          onChange={(e) => setValue(e.target.value)}
          required
          className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
          placeholder="e.g., Senior Software Engineer"
        />
      </div>
    );
  }
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-dark-text mb-2"
      >
        {label} <span className="text-orange-500">*</span>
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
        placeholder="e.g., Senior Software Engineer"
      />
    </div>
  );
};
