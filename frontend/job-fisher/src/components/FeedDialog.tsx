import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { CreateFeedDto } from "../types";
import { SelectField } from "./SelectField";
import { CustomSelect } from "./CustomSelect";
import { InputElement } from "./InputElement";
import { Platform, SalaryType } from "../types/job.type";

interface FeedDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (feed: CreateFeedDto) => Promise<void>;
  feed?: (CreateFeedDto & { id?: number }) | null;
}

const TAGS = {
  C_SHARP: "C#",
  PYTHON: "Python",
  JAVA: "Java",
  C: "C",

  // Modern / widely used
  JAVASCRIPT: "JavaScript",
  TYPESCRIPT: "TypeScript",
  REACT: "React",
  NODE_JS: "Node.js",
  GO: "Go",
};

const FeedDialog = ({ isOpen, onClose, onSave, feed }: FeedDialogProps) => {
  const [title, setTitle] = useState("");
  const [exp, setExp] = useState("");
  const [type, setType] = useState<"remote" | "on_site">("remote");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [tags, setTags] = useState<string[]>([]);
  const [salaryType, setSalaryType] = useState<SalaryType>("Fixed");
  const salaryTypes: SalaryType[] = ["Fixed", "Hourly"];
  const [platforms, setPlatforms] = useState<Platform[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const COUNTRIES = [
    "United States",
    "United Kingdom",
    "Germany",
    "Canada",
    "India",
    "Uzbekistan",
    "Remote / Any",
  ];

  useEffect(() => {
    if (feed) {
      setTitle(feed.title || "");
      setExp(feed.exp || "");
      setType(feed.type || "remote");
      setLocation(feed.location || "");
      setSalary(feed.salary?.toString() || "");
      setTags(feed.tags.split(","));
      setCurrency(feed.salaryCurrency);
      setSalaryType(feed.salaryType);
      setPlatforms(feed.platforms.split(",") as Platform[]);
    } else {
      setTitle("");
      setExp("");
      setType("remote");
      setLocation("");
      setSalary("");
      setTags([]);
      setCurrency("USD");
      setPlatforms([]);
      setSalaryType("Fixed");
    }
    setError("");
  }, [feed, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (!exp.trim()) {
      setError("Experience is required");
      return;
    }

    if (!location.trim()) {
      setError("Location is required");
      return;
    }

    const salaryNum = parseFloat(salary);
    if (!salary.trim() || isNaN(salaryNum) || salaryNum < 0) {
      setError("Please enter a valid salary (must be a positive number)");
      return;
    }

    setIsLoading(true);
    try {
      const feedRequestObject = {
        title: title.trim(),
        exp: exp.trim(),
        type,
        location: location.trim(),
        salary: salaryNum,
        salaryCurrency: currency,
        tags: tags.join(","),
        salaryType: salaryType,
        platforms: platforms.join(","),
      };
      console.log(feedRequestObject);
      await onSave(feedRequestObject);
      onClose();
    } catch (err: unknown) {
      setError("Failed to save feed");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const setPlatformList = (value: Platform) => {
    if (platforms.includes(value)) {
      const newPlatforms = platforms.filter((p) => p !== value);
      setPlatforms(newPlatforms);
    } else {
      setPlatforms([...platforms, value]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 p-4">
      <div className="bg-dark-card rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-dark-border">
        <div className="flex items-center justify-between p-6 border-b border-dark-border">
          <h2 className="text-2xl font-bold text-dark-text">
            {feed ? "Edit Feed" : "Add New Feed"}
          </h2>
          <button
            onClick={onClose}
            className="text-dark-text-muted hover:text-dark-text transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {error && (
            <div className="md:col-span-2 p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <InputElement
            id="feed-title"
            label="Title"
            value={title}
            setValue={(value) => setTitle(value)}
            type="text"
          />

          <InputElement
            id="feed-exp"
            label="Experience"
            value={exp}
            setValue={(value) => setExp(value)}
            type="number"
            min={0}
            step={1}
          />

          <CustomSelect
            id="feed-platform"
            label="Platform"
            value={platforms}
            onChange={setPlatformList}
            required
            options={[
              {
                value: "upwork",
                label: "Upwork",
                icon: <Icon src="/upwork.png" size={16} />,
              },
              {
                value: "linkedin",
                label: "LinkedIn",
                icon: <Icon src="/linkedIn.png" size={16} />,
              },
            ]}
          />

          <SelectField
            id="feed-type"
            label="Type"
            value={type}
            onChange={(v) => setType(v as "remote" | "on_site")}
            required
            options={[
              { label: "Remote", value: "remote" },
              { label: "On Site", value: "on_site" },
            ]}
            renderOption={(opt) => {
              return (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              );
            }}
          />
          <SelectField
            id="feed-country"
            label="Country"
            value={location}
            onChange={setLocation}
            required
            placeholder="Select country"
            options={COUNTRIES.map((c) => ({ label: c, value: c }))}
            renderOption={(opt) => {
              return (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              );
            }}
          />

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-dark-text mb-2">
              Salary Type *
            </label>

            <div className="flex gap-3">
              {salaryTypes.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSalaryType(t)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition
          ${
            salaryType === t
              ? "bg-orange-500 text-white border-orange-500"
              : "border-dark-border text-dark-text-muted hover:bg-dark-card"
          }
        `}
                >
                  {t === "Fixed" ? "Fixed Price" : "Hourly Rate"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="feed-salary"
              className="block text-sm font-medium text-dark-text mb-2"
            >
              Salary *
            </label>

            <div className="flex items-center gap-3">
              {/* Salary input */}
              <input
                id="feed-salary"
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                required
                min="0"
                step="0.01"
                className="flex-1 px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                placeholder="e.g., 80000"
              />

              {/* Currency select */}
              <div className="relative w-24">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full appearance-none pr-8 px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="UZS">UZS</option>
                </select>

                <svg
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-text-muted"
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
          </div>

          <div className="md:col-span-2">
            {/* Instruction text */}
            <p className="mb-2 text-sm text-dark-text-muted">
              Select relevant skills / technologies
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {Object.values(TAGS).map((tag) => {
                const selected = tags.includes(tag);

                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-2 rounded-md text-sm font-medium border transition-colors
            ${
              selected
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-dark-bg text-dark-text-muted border-dark-border hover:bg-dark-card hover:text-dark-text"
            }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>

            {/* Selected summary */}
            {tags.length > 0 && (
              <div className="mt-3 text-sm text-dark-text">
                <span className="text-dark-text-muted">Selected:</span>{" "}
                {tags.join(", ")}
              </div>
            )}
          </div>

          <div className="md:col-span-2 flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-dark-border rounded-lg text-dark-text font-medium hover:bg-dark-bg transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 disabled:opacity-50 transition"
            >
              {isLoading ? "Saving..." : feed ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedDialog;

interface IconProps {
  src: string;
  alt?: string;
  size?: number;
  className?: string;
}

const Icon = ({ src, alt = "", size = 16, className = "" }: IconProps) => {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`inline-block ${className}`}
      draggable={false}
    />
  );
};
