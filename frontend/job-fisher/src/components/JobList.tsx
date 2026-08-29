import { useState } from "react";
import { Job } from "../types";
import JobCard from "./JobCard";
import { Search } from "lucide-react";
import { UpworkJobProposal } from "../hooks/useJobFetcher";
import { useTranslation } from "../i18n";

interface JobListProps {
  jobs: Job[];
  selectedJob: Job | null;
  checkSelected: (job: Job) => void;
  showUpworkProposal: ({ jobId, proposal }: UpworkJobProposal) => void;
}

const JobList = ({ jobs, selectedJob, checkSelected, showUpworkProposal }: JobListProps) => {
  const [query, setQuery] = useState("");
  const { t, formatNumber } = useTranslation();

  const filtered = query.trim()
    ? jobs.filter(job => job.title.toLowerCase().includes(query.toLowerCase()))
    : jobs;

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
        <input
          type="text"
          placeholder={t("jobList.searchPlaceholder")}
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full bg-[#1A1A1A] border border-[#262626] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-[#555] focus:outline-none focus:border-[#10B981] transition"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label={t("jobList.clearSearch")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] hover:text-white transition text-xs"
          >
            ✕
          </button>
        )}
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#10B981]">
          {t(
            filtered.length === 1 ? "jobList.foundOne" : "jobList.foundOther",
            { count: formatNumber(filtered.length) },
          )}
        </h2>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-dark-text text-lg">{t("jobList.emptyTitle")}</p>
          <p className="text-dark-text-muted text-sm mt-2">
            {t("jobList.emptyBody")}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filtered.map(job => (
            <JobCard
              key={job.id}
              job={job}
              isSelected={selectedJob?.id === job.id}
              checkSelected={checkSelected}
              showUpworkProposal={showUpworkProposal}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;