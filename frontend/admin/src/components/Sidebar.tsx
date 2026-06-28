import { Briefcase, Plus, List } from "lucide-react";

export type View = "dashboard" | "form" | "list";

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

export default function Sidebar({ currentView, setCurrentView }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 glass-panel rounded-none border-t-0 border-b-0 border-l-0 border-r border-gray-800 p-6 z-50">
      <div className="flex items-center gap-3 mb-10 mt-2">
        <div className="p-2 bg-gradient-to-br from-[#00d4ff] to-[#7000ff] rounded-xl shadow-[0_0_15px_rgba(0,212,255,0.4)]">
          <Briefcase className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide">Admin</h2>
          <p className="text-xs text-[#00d4ff] tracking-widest uppercase font-semibold">Job Scrapper</p>
        </div>
      </div>

      <nav className="space-y-3">
        <button
          onClick={() => setCurrentView("form")}
          className={`w-full sidebar-link ${currentView === "form" ? "active" : ""}`}
        >
          <Plus className="w-5 h-5" />
          <span>Create Job</span>
        </button>
        <button
          onClick={() => setCurrentView("dashboard")}
          className={`w-full sidebar-link ${currentView === "dashboard" ? "active" : ""}`}
        >
          <Briefcase className="w-5 h-5" />
          <span>Dashboard</span>
        </button>
        <button
          onClick={() => setCurrentView("list")}
          className={`w-full sidebar-link ${currentView === "list" ? "active" : ""}`}
        >
          <List className="w-5 h-5" />
          <span>Excel Upload</span>
        </button>
      </nav>
    </aside>
  );
}
