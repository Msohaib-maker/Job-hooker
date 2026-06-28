import { Job, JobWithUI } from "../types";
import CollapsibleJobCard from "./CollapsibleCard";

interface CreateJobProps {
  jobList: JobWithUI[];
  updateJobHandler: (key: string, updatedJob: Job) => void;
  addJobHandler: () => void;
}

export const CreateJob = ({
  jobList,
  updateJobHandler,
  addJobHandler,
}: CreateJobProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold heading-gradient mb-2">Create Job</h1>
          <p className="text-[var(--text-muted)]">Add new job postings to the system</p>
        </div>
        <button
          onClick={addJobHandler}
          className="btn-glow flex items-center gap-2"
        >
          <span className="text-lg leading-none">＋</span>
          Add New Job
        </button>
      </div>

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
};
