import { useState } from "react";
import { jobService } from "../services/api";
import { JobWithUI } from "../types";

interface MainScreenProps {
  jobList: JobWithUI[];
}

export const MainScreen = ({ jobList }: MainScreenProps) => {
  const [isLoading, setLoading] = useState(false);

  const sendDataToAPI = async () => {
    const myJobs = jobList.map((value) => value.job);
    setLoading(true);
    try {
      await jobService.createJobs({ data: myJobs });
    } catch (e) {}
    setLoading(false);
  };

  return (
    <div className="animate-slide-up">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold heading-gradient mb-2">Dashboard</h1>
          <p className="text-[var(--text-muted)]">Manage and sync your scraped jobs</p>
        </div>
        <button
          onClick={sendDataToAPI}
          disabled={isLoading}
          className="btn-glow flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Syncing...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
              <span>Sync to API</span>
            </>
          )}
        </button>
      </div>

      <div className="space-y-4 mt-6">
        {jobList.map((item, idx) => {
          const job = item.job;

          return (
            <div
              key={job.id ?? idx}
              className="glass-panel p-6 hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <h2 className="text-xl font-semibold mb-1 text-white">{job.title}</h2>

              {job.company && (
                <p className="text-sm font-medium text-[#00d4ff] mb-1">{job.company}</p>
              )}

              {job.location && (
                <p className="text-sm text-[var(--text-muted)] mb-4 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  {job.location}
                </p>
              )}

              <div className="flex flex-wrap gap-2 mt-4 text-sm">
                <span className={`tag-pill ${job.type === "remote" ? "tag-remote" : "tag-onsite"}`}>
                  {job.type === "remote" ? "Remote" : "On-site"}
                </span>

                {job.platform && (
                  <span className="tag-pill platform-tag">
                    {job.platform}
                  </span>
                )}

                {job.status && (
                  <span className={`tag-pill status-${job.status}`}>
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </span>
                )}

                {job.salary && (
                  <span className="tag-pill bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.1)] text-[var(--text-main)]">
                    {job.salary} {job.salaryCurrency}
                  </span>
                )}
              </div>

              {job.description && (
                <p className="mt-3 text-gray-300 text-sm line-clamp-3">
                  {job.description}
                </p>
              )}

              {job.url && (
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-blue-400 hover:underline text-sm"
                >
                  View job →
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
