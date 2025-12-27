import { useState } from "react";
import { jobService } from "../services/api";
import { JobWithUI } from "../types";

interface MainScreenProps {
  jobList: JobWithUI[];
}

export const MainScreen = ({ jobList }: MainScreenProps) => {
  const [isLoading, setLoading] = useState(false);

  const sendDataToAPI = async () => {
    // const myJobs = jobList.map((value) => value.job);
    // setLoading(true);
    // try {
    //   await jobService.createJobs({ data: myJobs });
    // } catch (e) {}
    setLoading(false);
  };

  return (
    <div>
      <button
        onClick={sendDataToAPI}
        disabled={isLoading}
        className="
  inline-flex items-center gap-2
  bg-blue-600 hover:bg-blue-500
  text-white font-medium
  px-5 py-2.5
  rounded-lg
  shadow-sm hover:shadow
  transition
  focus:outline-none focus:ring-2 focus:ring-blue-400
  disabled:opacity-50 disabled:cursor-not-allowed
"
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
            Sending...
          </>
        ) : (
          <>
            <span className="text-lg leading-none">＋</span>
            Send Data to API
          </>
        )}
      </button>
      <h1>---------------------------</h1>

      <div className="space-y-4 mt-6">
        {jobList.map((item, idx) => {
          const job = item.job;

          return (
            <div
              key={job.id ?? idx}
              className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-white"
            >
              <h2 className="text-lg font-semibold">{job.title}</h2>

              {job.company && (
                <p className="text-sm text-gray-400">{job.company}</p>
              )}

              {job.location && (
                <p className="text-sm text-gray-400">{job.location}</p>
              )}

              <div className="flex gap-2 mt-2 text-sm">
                <span className="px-2 py-1 bg-gray-700 rounded">
                  {job.type === "remote" ? "Remote" : "On-site"}
                </span>

                {job.salary && (
                  <span className="px-2 py-1 bg-gray-700 rounded">
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
