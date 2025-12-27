import { View } from "./Sidebar";
import { CreateJob } from "./CreateJob";
import { MainScreen } from "./MainScreen";
import { UploadBulk } from "./BulkUpload";
import { Job, JobWithUI } from "../types";

type DashboardProps = {
  view: View;
  jobList: JobWithUI[];
  updateJobHandler: (key: string, updatedJob: Job) => void;
  addJobHandler: () => void;
  addCSVJobsHandler: (jobs: JobWithUI[]) => void;
};

export default function Dashboard({
  view,
  jobList,
  updateJobHandler,
  addJobHandler,
  addCSVJobsHandler,
}: DashboardProps) {
  if (view === "form") {
    return (
      <CreateJob
        jobList={jobList}
        updateJobHandler={updateJobHandler}
        addJobHandler={addJobHandler}
      />
    );
  }
  if (view === "dashboard") {
    return <MainScreen jobList={jobList} />;
  }
  return (
    <UploadBulk
      onImport={(jobs) => {
        console.log(jobs);
        addCSVJobsHandler(jobs);
      }}
    />
  );
}
