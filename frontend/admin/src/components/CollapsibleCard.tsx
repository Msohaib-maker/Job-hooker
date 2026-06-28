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
    <div className="glass-panel overflow-hidden mb-6 animate-slide-up">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[rgba(255,255,255,0.02)] transition-colors"
      >
        <div>
          <h3 className="text-xl font-bold heading-gradient">
            {job.title || "Untitled Job"}
          </h3>
          <p className="text-sm text-[var(--text-muted)] font-medium mt-1">
            {job.company || "No company"} • {job.type}
          </p>
        </div>

        <span
          className={`text-[var(--accent-primary)] font-bold text-xl transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {/* Body */}
      <div 
        className={`transition-all duration-300 ease-in-out ${
          open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 border-t border-[rgba(255,255,255,0.08)] bg-[rgba(0,0,0,0.1)]">
          <JobForm id={id} job={job} onJobCreate={onJobCreate} />
        </div>
      </div>
    </div>
  );
}
