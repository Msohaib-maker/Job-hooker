import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import Sidebar, { View } from "./components/Sidebar";
import { JobWithUI, Job } from "./types";
import { v4 as uuid } from "uuid";

function App() {
  // const [currentView, setCurrentView] = useState<View>("form");
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [jobList, setJobList] = useState<JobWithUI[]>([]);

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

  const addCSVJobsHandler = (jobs: JobWithUI[]) => {
    const updatedJobList = [...jobList, ...jobs];
    setJobList(updatedJobList);
  };
  console.log(import.meta.env.VITE_USERNAME);
  // main jobs idher

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex">
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
        <main className="ml-64 p-8 min-h-screen overflow-auto">
          <div className="max-w-7xl mx-auto">
            <Dashboard
              view={currentView}
              jobList={jobList}
              updateJobHandler={updateJobHandler}
              addJobHandler={addJobHandler}
              addCSVJobsHandler={addCSVJobsHandler}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
