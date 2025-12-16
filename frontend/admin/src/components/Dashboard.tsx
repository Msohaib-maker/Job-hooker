import { useEffect, useState } from "react";
import { Job } from "../types";
import { v4 as uuid } from "uuid";
import CollapsibleJobCard from "./CollapsibleCard";
import { jobService } from "../services/api";

type JobWithUI = { job: Job } & { key: string };

export default function Dashboard() {
  const [jobList, setJobList] = useState<JobWithUI[]>([]);
  const [isLoading, setLoading] = useState(false);

  const sendDataToAPI = async () => {
    const myJobs = jobList.map((value) => value.job);
    setLoading(true);
    try {
      await jobService.createJobs({ data: myJobs });
    } catch (e) {}
    setLoading(false);
  };

  useEffect(() => {
    console.log(jobList);
  }, [jobList]);

  const updateJobHandler = (key: string, updatedJob: Job) => {
    setJobList((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, job: updatedJob } : item
      )
    );
  };

  const addJobHandler = () => {
    setJobList([
      ...jobList,
      {
        key: uuid(),
        job: {
          title: "",
          description: "",
          company: "",
          location: "",
          creation: new Date().toISOString().split("T")[0],
          salary: 0,
          experience: "",
          tags: "",
          salaryCurrency: "USD",
          type: "remote",
          url: "",
          contactEmail: "",
        },
      },
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-white">Dashboard</h2>
        <p className="text-gray-400">Manage and post new jobs</p>
      </div>
      <button
        onClick={addJobHandler}
        className="
    inline-flex items-center gap-2
    bg-blue-600 hover:bg-blue-500
    text-white font-medium
    px-5 py-2.5
    rounded-lg
    shadow-sm hover:shadow
    transition
    focus:outline-none focus:ring-2 focus:ring-blue-400
  "
      >
        <span className="text-lg leading-none">＋</span>
        Add New Job
      </button>
      <br></br>
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

      {/* Main Card */}
      {jobList.map((value) => (
        <CollapsibleJobCard
          key={value.key}
          job={value.job}
          id={value.key}
          onJobCreate={updateJobHandler}
        />
      ))}
    </div>
  );
}
