import { useState } from "react";
import JobForm from "./JobForm";
import { Job } from "../types";

type Props = {
  job: Job;
  id: string;
  onJobCreate: (key: string, job: Job) => void;
};

export default function CollapsibleJobCard({ job, id, onJobCreate }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left"
      >
        <div>
          <h3 className="text-white font-semibold">
            {job.title || "Untitled Job"}
          </h3>
          <p className="text-sm text-gray-400">
            {job.company || "No company"} • {job.type}
          </p>
        </div>

        <span
          className={`text-gray-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {/* Body */}
      {open && (
        <div className="px-6 pb-6 border-t border-gray-700">
          <JobForm id={id} job={job} onJobCreate={onJobCreate} />
        </div>
      )}
    </div>
  );
}
