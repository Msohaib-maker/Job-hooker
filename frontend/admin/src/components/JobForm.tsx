import { useState } from "react";
import { CheckCircle2, XCircle, Loader2, Briefcase } from "lucide-react";
import type { Job } from "../types";

type JobFormProps = {
  job: Job;
  id: string;
  onJobCreate: (key: string, job: Job) => void;
};
export default function JobForm({ id, job, onJobCreate }: JobFormProps) {
  const { creation, ...rest } = job;

  const [formData, setFormData] = useState<
    Omit<Job, "creation"> & { creation: string }
  >({
    ...rest,
    creation: creation ? new Date(creation).toISOString().split("T")[0] : "",
  });

  const [status, setStatus] = useState<{
    type: "success" | "error" | "idle";
    message: string;
  }>({ type: "idle", message: "" });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const dateValue = e.target.value;
  //   setFormData((prev) => ({
  //     ...prev,
  //     creation: dateValue,
  //   }));
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "idle", message: "" });

    try {
      const jobData: Job = {
        ...formData,
        creation: new Date(formData.creation),
      };

      onJobCreate(id, jobData);

      setStatus({
        type: "success",
        message: "Job created successfully!",
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        company: "",
        location: "",
        creation: new Date().toISOString().split("T")[0],
        salary: 0,
        salaryCurrency: "usd",
        experience: "0",
        tags: "",
        type: "remote",
        url: "",
        contactEmail: "",
      });

      setTimeout(() => {
        setStatus({ type: "idle", message: "" });
      }, 3000);
    } catch (error: any) {
      setStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Failed to create job. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const autoFillData = () => {
    setFormData((prev) => ({
      ...prev,
      title: "Software Developer",
      description:
        "Responsible person who can work under pressure and deliver high-quality software.",
      company: "Tech Solutions Ltd.",
      location: "New York, USA",
      creation: new Date().toISOString().split("T")[0], // today
      salary: 90000,
      salaryCurrency: "USD",
      experience: "3+ years",
      tags: "C#, React, Python, Node.js",
      type: "remote", // options: remote, hybrid, onsite
      url: "https://example.com/jobs/123",
      contactEmail: "hr@example.com",
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={autoFillData}
          className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Auto Fill
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <Briefcase className="w-6 h-6 text-orange-500" />
            </div>
            <h1 className="text-3xl font-bold text-white">Create New Job</h1>
          </div>
          <p className="text-gray-400">
            Fill in the details to create a new job posting
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-200 mb-2"
              >
                Job Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="e.g., Senior Software Engineer"
              />
            </div>

            {/* Company and Location Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-semibold text-gray-200 mb-2"
                >
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="e.g., Tech Corp Inc."
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-semibold text-gray-200 mb-2"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="e.g., San Francisco, CA"
                />
              </div>
            </div>

            {/* Salary and Currency Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <label
                  htmlFor="salary"
                  className="block text-sm font-semibold text-gray-200 mb-2"
                >
                  Salary
                </label>
                <input
                  type="number"
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="e.g., 100000"
                  min="0"
                />
              </div>

              <div>
                <label
                  htmlFor="salaryCurrency"
                  className="block text-sm font-semibold text-gray-200 mb-2"
                >
                  Currency
                </label>
                <select
                  id="salaryCurrency"
                  name="salaryCurrency"
                  value={formData.salaryCurrency}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="INR">INR</option>
                  <option value="CAD">CAD</option>
                </select>
              </div>
            </div>

            {/* Experience and Job Type Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="experience"
                  className="block text-sm font-semibold text-gray-200 mb-2"
                >
                  Experience
                </label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="e.g., 3-5 years"
                />
              </div>

              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-semibold text-gray-200 mb-2"
                >
                  Job Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                >
                  <option value="remote">Remote</option>

                  <option value="on_site">Onsite</option>
                </select>
              </div>
            </div>

            {/* URL and Contact Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="url"
                  className="block text-sm font-semibold text-gray-200 mb-2"
                >
                  Job URL
                </label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="https://company.com/job/123"
                />
              </div>

              <div>
                <label
                  htmlFor="contactEmail"
                  className="block text-sm font-semibold text-gray-200 mb-2"
                >
                  Contact Email
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="hr@company.com"
                />
              </div>
            </div>

            {/* Tags Field */}
            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-semibold text-gray-200 mb-2"
              >
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="e.g., React, TypeScript, Node.js (comma-separated)"
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate multiple tags with commas
              </p>
            </div>

            {/* Description Field */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-200 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                placeholder="Enter job description, requirements, responsibilities, and benefits..."
              />
            </div>

            {/* Creation Date Field */}
            <div>
              <label
                htmlFor="creation"
                className="block text-sm font-semibold text-gray-200 mb-2"
              >
                Creation Date
              </label>
              <input
                type="date"
                id="creation"
                name="creation"
                value={formData.creation}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all [color-scheme:dark]"
              />
            </div>

            {/* Status Message */}
            {status.type !== "idle" && (
              <div
                className={`flex items-center gap-3 p-4 rounded-lg border ${
                  status.type === "success"
                    ? "bg-green-900/20 border-green-700/50 text-green-400"
                    : "bg-red-900/20 border-red-700/50 text-red-400"
                }`}
              >
                {status.type === "success" ? (
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 flex-shrink-0" />
                )}
                <span className="font-medium">{status.message}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-4 border-t border-gray-700">
              <button
                type="submit"
                disabled={isSubmitting || !formData.title}
                className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-500/20"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Briefcase className="w-5 h-5" />
                    Create Job
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
