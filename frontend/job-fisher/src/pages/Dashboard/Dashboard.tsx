import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Briefcase, Star, TrendingUp, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import FeedList from "../../components/FeedList";
import JobList from "../../components/JobList";
import { Feed, Job } from "../../types";
import { useJobFetcher, UpworkJobProposal } from "../../hooks/useJobFetcher";

const Dashboard = () => {
  const { signOut } = useAuth();
  const [selectedFeedId, setSelectedFeedId] = useState<number | null>(null);
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);


  const { feedJobs, loading, jobStats, selectedJob, checkSelected, upworkJobProposal, setUpworkJob } = useJobFetcher({ feedId: selectedFeedId, feeds });



  useEffect(() => {
    if (selectedFeedId) setIsPanelOpen(true);
  }, [selectedFeedId]);


  return (
    <div className="h-screen flex flex-row bg-[#0A0A0A] overflow-hidden font-sans">

      {/* ── Left sidebar ── */}
      <div className="w-[380px] flex-shrink-0 border-r border-[#1F1F1F] bg-[#0F0F0F] z-20 flex flex-col">
        <FeedList
          selectedFeedId={selectedFeedId}
          onFeedSelect={(id) => setSelectedFeedId(id)}
          feeds={feeds}
          setFeeds={setFeeds}
          signOut={signOut}
        />
      </div>

      {/* ── Jobs panel — part of flex row, not absolute ── */}
      <div
        className={`
          flex-shrink-0 border-r border-[#1F1F1F] bg-[#0F0F0F]
          flex flex-col overflow-hidden
          transition-all duration-300 ease-in-out
          ${isPanelOpen && selectedFeedId ? "w-[450px]" : "w-0"}
        `}
      >
        {/* prevent content flashing through while collapsed */}
        <div className="w-[450px] flex flex-col h-full">
          <div className="p-6 border-b border-[#1F1F1F] flex items-center justify-between flex-shrink-0">
            <div>
              <h2 className="text-xl font-bold text-[#EDEDED] flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#C4F029]" />
                {feeds.find((f) => f.id === selectedFeedId)?.title || "Feed"} Jobs
              </h2>
              <p className="text-xs text-[#A1A1AA] mt-1">Showing scraped results</p>
            </div>
            <button
              onClick={() => setIsPanelOpen(false)}
              className="p-2 hover:bg-[#1A1A1A] text-[#A1A1AA] hover:text-[#C4F029] rounded-lg transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin w-10 h-10 border-4 border-[#C4F029] border-t-transparent rounded-full" />
              </div>
            ) : (
              <JobList jobs={feedJobs} selectedJob={selectedJob} checkSelected={checkSelected} showUpworkProposal={setUpworkJob} />
            )}
          </div>
        </div>
      </div>

      {/* ── Toggle handle — sits between panel and main content ── */}
      {selectedFeedId && !isPanelOpen && (
        <button
          onClick={() => setIsPanelOpen(true)}
          className="
      flex-shrink-0 self-center
      bg-[#1A1A1A] border border-[#262626] border-l-0
      text-[#C4F029]
      rounded-r-xl px-2 py-8
      transition-all duration-300 hover:bg-[#222222]
      flex items-center justify-center cursor-pointer
      shadow-[2px_0_8px_rgba(0,0,0,0.4)]
    "
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col overflow-y-auto relative p-8">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#C4F029]/10 blur-[160px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C4F029]/5 blur-[140px]" />
        </div>

        <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col h-full gap-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#EDEDED] mb-1">Dashboard</h1>
            <p className="text-sm text-[#A1A1AA]">Overview of your job hunting activity</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#151515] border border-[#262626] rounded-xl p-5 flex flex-col shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#C4F029]/10 flex items-center justify-center">
                  <Star className="w-4 h-4 text-[#C4F029]" />
                </div>
                <span className="text-[#A1A1AA] text-sm font-medium">High-Score Matches</span>
              </div>
              <span className="text-3xl font-bold text-[#EDEDED]">{jobStats?.highScore.length ?? 0}</span>
            </div>
            <div className="bg-[#151515] border border-[#262626] rounded-xl p-5 flex flex-col shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#C4F029]/10 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-[#C4F029]" />
                </div>
                <span className="text-[#A1A1AA] text-sm font-medium">New Today</span>
              </div>
              <span className="text-3xl font-bold text-[#EDEDED]">{jobStats?.today.length ?? 0}</span>
            </div>
            <div className="bg-[#151515] border border-[#262626] rounded-xl p-5 flex flex-col shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#C4F029]/10 flex items-center justify-center">
                  <CalendarDays className="w-4 h-4 text-[#C4F029]" />
                </div>
                <span className="text-[#A1A1AA] text-sm font-medium">New This Week</span>
              </div>
              <span className="text-3xl font-bold text-[#EDEDED]">{jobStats?.weekly.length ?? 0}</span>
            </div>
          </div>

          <div className="flex-1 min-h-[500px] bg-[#151515] border border-[#262626] rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            {selectedJob ? (
              (selectedJob.platform === "Upwork" || selectedJob.platform === "Upwork Inc") ? (
                <UpworkProposalDisplayer job={selectedJob} proposalData={upworkJobProposal} />
              ) : (
                <div className="flex-1 p-12 overflow-y-auto">
                  <h2 className="text-3xl font-bold text-[#EDEDED] mb-4">{selectedJob.title}</h2>
                  <div className="flex items-center gap-4 text-[#A1A1AA] text-sm mb-8">
                    <span className="font-medium text-[#C4F029]">{selectedJob.platform}</span>
                    <span>•</span>
                    <span>{selectedJob.company || "Unknown Company"}</span>
                    <span>•</span>
                    <span>{selectedJob.location || "Remote"}</span>
                  </div>
                  <div className="text-[#A1A1AA] text-base leading-relaxed whitespace-pre-wrap">
                    {selectedJob.description}
                  </div>
                </div>
              )
            ) : selectedFeedId ? (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#C4F029]/5 rounded-full blur-[80px] pointer-events-none" />
                <div className="relative z-10 max-w-lg">
                  <div className="w-16 h-16 rounded-2xl bg-[#C4F029]/10 border border-[#C4F029]/20 flex items-center justify-center mx-auto mb-6">
                    <Briefcase className="w-8 h-8 text-[#C4F029]" />
                  </div>
                  <h2 className="text-3xl font-bold text-[#EDEDED] mb-3">
                    {feeds.find((f) => f.id === selectedFeedId)?.title} Feed Selected
                  </h2>
                  <p className="text-[#A1A1AA] text-sm leading-relaxed mb-8">
                    The scraping feed is fully synchronized. All matches are processed and categorized in your local database.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                      onClick={() => setIsPanelOpen(true)}
                      className="px-8 py-3.5 rounded-xl bg-[#C4F029] hover:bg-[#a9cf24] text-[#0F0F0F] font-bold text-sm tracking-wide active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" /> Open Jobs List Panel
                    </button>
                    <button className="px-8 py-3.5 rounded-xl bg-[#1A1A1A] border border-[#262626] hover:bg-[#222] text-[#EDEDED] font-semibold text-sm transition-all">
                      Configure Notifications
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                <Briefcase className="w-16 h-16 text-[#262626] mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-[#EDEDED] mb-2">No Feed Selected</h2>
                <p className="text-[#A1A1AA] text-sm max-w-sm mx-auto">
                  Select a feed from the left panel to view jobs, or create a new feed to get started.
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

const UpworkProposalDisplayer = ({ job, proposalData }: { job: Job, proposalData?: UpworkJobProposal | null }) => {
  const [proposalText, setProposalText] = useState("");

  useEffect(() => {
    if (proposalData?.proposal && proposalData?.jobId === job.id) {
      setProposalText(proposalData.proposal);
    } else {
      setProposalText("");
    }
  }, [proposalData, job.id]);

  return (
    <div className="flex-1 p-8 overflow-y-auto flex flex-col h-full relative">
      <h2 className="text-2xl font-bold text-[#EDEDED] mb-2">Upwork Proposal</h2>
      <p className="text-[#A1A1AA] text-sm mb-6">Generated for: <span className="text-[#C4F029] font-medium">{job.title}</span></p>
      
      <div className="flex-1 flex flex-col bg-[#1A1A1A] rounded-xl border border-[#262626] p-5 shadow-inner">
        <label className="text-xs tracking-widest uppercase font-bold text-[#555] mb-3">Editable Proposal text</label>
        {proposalData && proposalData.jobId === job.id ? (
          <textarea
            className="flex-1 w-full bg-transparent border-none outline-none text-[#EDEDED] resize-none whitespace-pre-wrap leading-relaxed focus:ring-0 p-0 text-sm"
            value={proposalText}
            onChange={(e) => setProposalText(e.target.value)}
            placeholder="Edit your AI-generated proposal here..."
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-[#555] text-sm italic">
            Waiting for proposal generation...
          </div>
        )}
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <button 
          onClick={() => navigator.clipboard.writeText(proposalText)}
          className="px-6 py-2.5 rounded-xl bg-[#262626] hover:bg-[#333] active:bg-[#1a1a1a] text-[#EDEDED] font-semibold text-sm transition-all border border-[#333]"
        >
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
};
