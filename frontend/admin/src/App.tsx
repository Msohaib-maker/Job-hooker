import { useState } from "react";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import Sidebar from "./components/Sidebar";

type View = "form" | "list";

function App() {
  const [currentView, setCurrentView] = useState<View>("form");

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex">
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
        <main className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                {currentView === "form" ? "Create New Job" : "Job List"}
              </h1>
              <p className="text-gray-400">
                {currentView === "form"
                  ? "Add a new job posting to the database"
                  : "View and manage all job postings"}
              </p>
            </div>

            {currentView === "form" ? <JobForm /> : <JobList />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;

