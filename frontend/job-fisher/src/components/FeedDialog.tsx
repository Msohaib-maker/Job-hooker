import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { CreateFeedDto } from "../types";

interface FeedDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (feed: CreateFeedDto) => Promise<void>;
  feed?: CreateFeedDto & { id?: string } | null;
}

const FeedDialog = ({ isOpen, onClose, onSave, feed }: FeedDialogProps) => {
  const [title, setTitle] = useState("");
  const [exp, setExp] = useState("");
  const [type, setType] = useState<"remote" | "on_site">("remote");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (feed) {
      setTitle(feed.title || "");
      setExp(feed.exp || "");
      setType(feed.type || "remote");
      setLocation(feed.location || "");
      setSalary(feed.salary?.toString() || "");
    } else {
      setTitle("");
      setExp("");
      setType("remote");
      setLocation("");
      setSalary("");
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
      });
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save feed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-card rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-dark-border">
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

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="feed-title" className="block text-sm font-medium text-dark-text mb-2">
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
            <label htmlFor="feed-exp" className="block text-sm font-medium text-dark-text mb-2">
              Experience *
            </label>
            <input
              id="feed-exp"
              type="text"
              value={exp}
              onChange={(e) => setExp(e.target.value)}
              required
              className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
              placeholder="e.g., 3-5 years"
            />
          </div>

          <div>
            <label htmlFor="feed-type" className="block text-sm font-medium text-dark-text mb-2">
              Type *
            </label>
            <select
              id="feed-type"
              value={type}
              onChange={(e) => setType(e.target.value as "remote" | "on_site")}
              required
              className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
            >
              <option value="remote">Remote</option>
              <option value="on_site">On Site</option>
            </select>
          </div>

          <div>
            <label htmlFor="feed-location" className="block text-sm font-medium text-dark-text mb-2">
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
            <label htmlFor="feed-salary" className="block text-sm font-medium text-dark-text mb-2">
              Salary *
            </label>
            <input
              id="feed-salary"
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
              placeholder="e.g., 80000"
            />
          </div>

          <div className="flex gap-3 pt-4">
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
              className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-dark-card disabled:opacity-50 disabled:cursor-not-allowed transition"
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
