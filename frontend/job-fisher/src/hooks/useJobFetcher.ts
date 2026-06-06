import { useEffect, useState, useRef } from "react";
import { Feed, Job } from "../types";
import { api } from "../services/api";
import { jobCacheService, JobGroups } from "../services/jobCache";

type JobFetcherProps = {
  feedId: number | null;
  feeds: Feed[];
};

export type UpworkJobProposal = {
  jobId: string | undefined
  proposal: string
}

export const useJobFetcher = ({ feedId, feeds }: JobFetcherProps) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [feedJobs, setFeedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [upworkJobProposal, setUpworkJobProposal] = useState<UpworkJobProposal|null>(null)
  const [jobStats, setJobStats] = useState<JobGroups>({
    all: [],
    highScore: [],
    today: [],
    weekly: [],
  });

  // Browser-safe timers
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);


  const scheduler = async (feed: Feed) => {
    try {
      const response = await api.post("jobs", feed);
      console.log(response)

      setLoading(false); // First response received

      if (response.data.filteredJobs) {
        const fetchedJobs: Job[] = response.data.filteredJobs;
        setFeedJobs((prevJobs) => {
          console.log("prev jobs exist",)
          const jobMap = new Map<string | number, Job>();
          prevJobs.forEach((job) => jobMap.set(job.id ?? "", job));
          fetchedJobs.forEach((job) => jobMap.set(job.id ?? "", job));

          return Array.from(jobMap.values());
        });

        const cachedGroups = jobCacheService.categorizeAndCache(feed.id, fetchedJobs);
        setJobStats(cachedGroups);
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);

    }
  };

  const checkSelected = (job: Job) => {
    console.log("select kia h job ko", job)
    setSelectedJob(job)
  }

  const setUpworkJob = (upworkJobProposal: UpworkJobProposal) => {
    setUpworkJobProposal(upworkJobProposal)
  }

  useEffect(() => {
    if (!feedId || feeds.length === 0) return;

    const feed = feeds.find((f) => f.id === feedId);
    if (!feed) return;

    // Clear jobs
    setFeedJobs([])

    // Load from cache first
    const cached = jobCacheService.getCache(feedId);
    if (cached) {
      setJobStats(cached);

      // Safeguard de-duplication when resolving cached groups into an array
      const allCachedJobs = Array.from(
        new Map(
          [...cached.all, ...cached.today, ...cached.weekly, ...cached.highScore].map(job => [job.id, job])
        ).values()
      );

      if (allCachedJobs.length > 0) {
        setFeedJobs(allCachedJobs);
      } else {
        setLoading(true); // Show loading immediately
      }
    } else {

      setFeedJobs([]);
      setJobStats({ all: [], highScore: [], today: [], weekly: [] });

    }



    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => scheduler(feed), 500);
    intervalRef.current = window.setInterval(() => scheduler(feed), 60_000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [feedId, feeds]);

  return { feedJobs, loading, jobStats, selectedJob, checkSelected, upworkJobProposal, setUpworkJob };
};