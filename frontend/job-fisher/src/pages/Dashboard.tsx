import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { LogOut, Briefcase } from "lucide-react";
import FeedList from "../components/FeedList";
import JobList from "../components/JobList";
import { Feed } from "../types";
import { feedService } from "../services/feeds";
import { useJobFetcher } from "../hooks/useJobFetcher";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [selectedFeedId, setSelectedFeedId] = useState<number | null>(null);
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const { feedJobs, loading } = useJobFetcher({
    feedId: selectedFeedId,
    feeds,
  });

  useEffect(() => {
    const loadFeeds = async () => {
      try {
        const data = await feedService.getFeeds();
        setFeeds(data);
      } catch (error) {
        console.error("Failed to load feeds:", error);
        setFeeds([]);
      }
    };
    loadFeeds();
  }, []);

  return (
    <div className="h-screen flex flex-col bg-[#050807] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#00FF88]/10 blur-[160px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#00FF88]/5 blur-[140px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 bg-[#0B0F0D]/80 backdrop-blur-xl border-b border-[#1F2A24] px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-wide text-white">
              Job <span className="text-[#00FF88]">Fisher</span>
            </h1>
            <p className="text-sm text-[#8FAE9B]">Manage your job feeds</p>
          </div>

          <div className="flex items-center gap-5">
            <div className="text-right">
              <p className="text-sm font-semibold text-white">
                {user?.name || user?.email}
              </p>
              <p className="text-xs text-[#8FAE9B]">{user?.email}</p>
            </div>

            <button
              onClick={signOut}
              className="
          flex items-center gap-2 px-4 py-2
          text-white border border-[#1F2A24]
          rounded-lg
          hover:border-[#00FF88]
          hover:shadow-[0_0_20px_rgba(0,255,136,0.4)]
          transition
        "
            >
              <LogOut className="w-4 h-4 text-[#00FF88]" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Feeds */}
        <div className="w-[350px] min-w-[350px] flex-shrink-0">
          <FeedList
            selectedFeedId={selectedFeedId}
            onFeedSelect={(id) => setSelectedFeedId(id)}
            feeds={feeds}
            setFeeds={setFeeds}
          />
        </div>

        {/* Main Content Area - Jobs */}
        <div className="flex-1 overflow-y-auto p-8 bg-dark-bg">
          <div className="max-w-4xl mx-auto">
            {selectedFeedId ? (
              <div>
                <h2 className="text-2xl font-bold text-green-500 mb-4">Jobs</h2>

                <div
                  className="
  bg-[#0B0F0D]/80 backdrop-blur-xl
  rounded-2xl p-8
  border border-[#1F2A24]
  shadow-[0_0_40px_rgba(0,255,136,0.05)]
"
                >
                  {loading ? (
                    <div className="flex justify-center py-10">
                      <div className="animate-spin w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full"></div>
                    </div>
                  ) : (
                    <JobList jobs={feedJobs} />
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-dark-card rounded-lg border border-dark-border p-12 text-center">
                <Briefcase className="w-20 h-20 text-dark-text-muted mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-green-500 mb-2">
                  No Feed Selected
                </h2>
                <p className="text-white mb-6">
                  Select a feed from the left panel to view jobs, or create a
                  new feed to get started.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
