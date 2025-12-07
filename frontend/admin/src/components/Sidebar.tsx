import { Briefcase, Plus, List } from "lucide-react";

type View = "form" | "list";

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

export default function Sidebar({ currentView, setCurrentView }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-800 border-r border-gray-700 p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-primary-600 rounded-lg">
          <Briefcase className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Admin Panel</h2>
          <p className="text-xs text-gray-400">Job Scrapper</p>
        </div>
      </div>

      <nav className="space-y-2">
        <button
          onClick={() => setCurrentView("form")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            currentView === "form"
              ? "bg-primary-600 text-white"
              : "text-gray-300 hover:bg-gray-700"
          }`}
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Create Job</span>
        </button>

        <button
          onClick={() => setCurrentView("list")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            currentView === "list"
              ? "bg-primary-600 text-white"
              : "text-gray-300 hover:bg-gray-700"
          }`}
        >
          <List className="w-5 h-5" />
          <span className="font-medium">Job List</span>
        </button>
      </nav>
    </aside>
  );
}

