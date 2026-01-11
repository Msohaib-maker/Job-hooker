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
  const [step, setStep] = useState<number>(1);

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
    setStep(1);
    console.log("changes... 78 feed dialog");
    setError("");
  }, [feed]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
      await onSave(feedRequestObject);
      console.log("close");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className="
    relative z-10
    w-full max-w-3xl max-h-[90vh] overflow-y-auto
    rounded-2xl
    bg-[#0B0F0D]/90 backdrop-blur-xl
    border border-[#1F2A24]
    shadow-[0_0_60px_rgba(0,255,136,0.25)]
  "
      >
        <div className="flex items-center justify-between p-6 border-b border-[#1F2A24]">
          <h2 className="text-2xl font-extrabold text-white tracking-wide">
            {feed ? "Edit Feed ⚙️" : "Create Feed ✨"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="
      p-2 rounded-lg
      text-[#8FAE9B]
      hover:text-white
      hover:bg-[#050807]
      transition
    "
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 pt-4">
          <div className="flex items-center gap-2 text-sm">
            <span
              className={`font-semibold ${
                step === 1 ? "text-green-400" : "text-[#8FAE9B]"
              }`}
            >
              Step 1
            </span>
            <div className="flex-1 h-px bg-[#1F2A24]" />
            <span
              className={`font-semibold ${
                step === 2 ? "text-green-400" : "text-[#8FAE9B]"
              }`}
            >
              Step 2
            </span>
          </div>
        </div>

        <div
          // onSubmit={(e) => {}}
          className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {error && (
            <div className="md:col-span-2 p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* ---------------- STEP 1 ---------------- */}
          {step === 1 && (
            <>
              <InputElement
                id="feed-title"
                label="Title"
                value={title}
                setValue={setTitle}
                type="text"
              />

              <InputElement
                id="feed-exp"
                label="Experience"
                value={exp}
                setValue={setExp}
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
            </>
          )}

          {/* ---------------- STEP 2 ---------------- */}
          {step === 2 && (
            <>
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
                <label className="block text-sm font-medium text-dark-text mb-2">
                  Salary *
                </label>

                <div className="flex gap-3">
                  <input
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="flex-1 px-4 py-2 bg-dark-bg border border-dark-border rounded-lg"
                    placeholder="e.g. 80000"
                  />

                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-24 px-3 py-2 bg-dark-bg border border-dark-border rounded-lg"
                  >
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                    <option>UZS</option>
                  </select>
                </div>
              </div>

              <div className="md:col-span-2">
                <p className="mb-2 text-sm text-dark-text-muted">
                  Select relevant skills
                </p>

                <div className="flex flex-wrap gap-2">
                  {Object.values(TAGS).map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-2 rounded-md border text-sm
                ${
                  tags.includes(tag)
                    ? "bg-orange-500 text-white"
                    : "bg-dark-bg text-dark-text-muted border-dark-border"
                }
              `}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ---------------- FOOTER ---------------- */}
          <div className="md:col-span-2 flex gap-3 pt-6">
            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 px-4 py-2 border border-dark-border rounded-lg"
              >
                Back
              </button>
            )}

            {step === 1 ? (
              <button
                type="button"
                onClick={() => setStep(2)}
                className="
      group relative flex-1
      px-5 py-3
      rounded-xl
      font-semibold tracking-wide
      text-[#00FF88]
      bg-[#0B0F0D]/60
      border border-[#1F2A24]
      backdrop-blur-md
      shadow-[0_0_20px_rgba(0,255,136,0.25)]
      hover:shadow-[0_0_30px_rgba(0,255,136,0.5)]
      hover:border-[#00FF88]
      transition-all duration-300
    "
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Next
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>

                {/* glow layer */}
                <span
                  className="
        absolute inset-0 rounded-xl
        opacity-0 group-hover:opacity-100
        bg-gradient-to-r
        from-transparent
        via-[#00FF88]/10
        to-transparent
        transition-opacity
      "
                />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="
      group relative flex-1
      px-5 py-3
      rounded-xl
      font-semibold tracking-wide
      text-black
      bg-gradient-to-r from-[#00FF88] to-[#4DFFB3]
      shadow-[0_0_30px_rgba(0,255,136,0.6)]
      hover:shadow-[0_0_45px_rgba(0,255,136,0.85)]
      transition-all duration-300
      disabled:opacity-50
      disabled:cursor-not-allowed
    "
                onClick={handleSubmit}
              >
                <span className="relative z-10">
                  {isLoading
                    ? "Saving..."
                    : feed
                      ? "Update Feed"
                      : "Create Feed"}
                </span>
              </button>
            )}
          </div>
        </div>
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
