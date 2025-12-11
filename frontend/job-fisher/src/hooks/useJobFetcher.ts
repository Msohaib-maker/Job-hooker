import { useEffect, useState, useRef } from "react";
import { Feed, Job } from "../types";
import { api } from "../services/api";

type JobFetcherProps = {
  feedId: string | null;
  feeds: Feed[];
};

export const useJobFetcher = ({ feedId, feeds }: JobFetcherProps) => {
  const [feedJobs, setFeedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  // Browser-safe timers
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  // First request decides loading state
  const firstFetchDoneRef = useRef(false);

  const scheduler = async (feed: Feed) => {
    try {
      const response = await api.post("jobs", feed);

      if (!firstFetchDoneRef.current) {
        setLoading(false); // First response received
        firstFetchDoneRef.current = true;
      }

      if (response.data.filteredJobs) {
        setFeedJobs(response.data.filteredJobs);
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
      if (!firstFetchDoneRef.current) {
        setLoading(false);
        firstFetchDoneRef.current = true;
      }
    }
  };

  useEffect(() => {
    if (!feedId || feeds.length === 0) return;

    const feed = feeds.find((f) => f.id === feedId);
    if (!feed) return;

    setFeedJobs([]);
    setLoading(true); // Show loading immediately
    firstFetchDoneRef.current = false;

    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => scheduler(feed), 500);
    intervalRef.current = window.setInterval(() => scheduler(feed), 60_000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [feedId, feeds]);

  return { feedJobs, loading };
};
