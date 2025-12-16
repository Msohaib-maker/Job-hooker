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
    <div className="h-screen flex flex-col bg-dark-bg">
      {/* Header */}
      <header className="bg-dark-surface border-b border-dark-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-orange-500" />
            <div>
              <h1 className="text-2xl font-bold text-dark-text">Job Fisher</h1>
              <p className="text-sm text-dark-text-muted">
                Manage your job feeds
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-dark-text">
                {user?.name || user?.email}
              </p>
              <p className="text-xs text-dark-text-muted">{user?.email}</p>
            </div>
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-4 py-2 text-dark-text hover:bg-dark-card rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Feeds */}
        <div className="w-80 flex-shrink-0">
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

                <div className="bg-dark-card rounded-lg border border-dark-border p-8">
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
