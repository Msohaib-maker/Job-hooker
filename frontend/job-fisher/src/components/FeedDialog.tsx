import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { CreateFeedDto } from "../types";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (feed) {
      setTitle(feed.title || "");
      setExp(feed.exp || "");
      setType(feed.type || "remote");
      setLocation(feed.location || "");
      setSalary(feed.salary?.toString() || "");
      setTags(feed.tags.split(","));
      setCurrency(feed.salaryCurrency);
    } else {
      setTitle("");
      setExp("");
      setType("remote");
      setLocation("");
      setSalary("");
      setTags([]);
      setCurrency("USD");
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
      await onSave({
        title: title.trim(),
        exp: exp.trim(),
        type,
        location: location.trim(),
        salary: salaryNum,
        salaryCurrency: currency,
        tags: tags.join(","),
      });
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
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

          <div>
            <label
              htmlFor="feed-title"
              className="block text-sm font-medium text-dark-text mb-2"
            >
              Title *
            </label>
            <input
              id="feed-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
              placeholder="e.g., Senior Software Engineer"
            />
          </div>

          <div>
            <label
              htmlFor="feed-exp"
              className="block text-sm font-medium text-dark-text mb-2"
            >
              Experience *
            </label>

            <div className="flex items-center gap-3">
              <input
                id="feed-exp"
                type="number"
                min={0}
                step={1}
                value={exp}
                onChange={(e) => setExp(e.target.value)}
                required
                className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
              />

              <span className="text-sm text-dark-text-muted whitespace-nowrap">
                years
              </span>
            </div>
          </div>

          <div>
            <label
              htmlFor="feed-type"
              className="block text-sm font-medium text-dark-text mb-2"
            >
              Type *
            </label>
            <div className="relative w-full">
              <select
                id="feed-type"
                value={type}
                onChange={(e) =>
                  setType(e.target.value as "remote" | "on_site")
                }
                required
                className="w-full appearance-none pr-10 px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
              >
                <option value="remote">Remote</option>
                <option value="on_site">On Site</option>
              </select>

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

          <div>
            <label
              htmlFor="feed-location"
              className="block text-sm font-medium text-dark-text mb-2"
            >
              Location *
            </label>
            <input
              id="feed-location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
              placeholder="e.g., New York, NY"
            />
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
