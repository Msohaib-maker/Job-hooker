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
