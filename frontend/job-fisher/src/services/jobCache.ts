import { Job } from "../types";

export interface JobGroups {
  all: Job[];
  highScore: Job[];
  today: Job[];
  weekly: Job[];
}

const CACHE_PREFIX = "job_fisher_cache_";

export const jobCacheService = {
  categorizeAndCache: (feedId: number, newJobs: Job[]): JobGroups => {
    const cacheKey = `${CACHE_PREFIX}${feedId}`;
    let accumulatedJobs = [...newJobs];

    // 1. Pull existing data from cache if it exists
    const rawExistingCache = localStorage.getItem(cacheKey);
    if (rawExistingCache) {
      try {
        const existingCache = JSON.parse(rawExistingCache) as JobGroups;
        const oldJobs = existingCache.all || [];

        // 2. Merge old and new jobs safely using a Map to avoid duplicate IDs
        const jobMap = new Map<string | number, Job>();
        oldJobs.forEach((job) => jobMap.set(job.id ?? "", job));
        newJobs.forEach((job) => jobMap.set(job.id ?? "", job)); // New jobs overwrite old ones if IDs match

        accumulatedJobs = Array.from(jobMap.values());
      } catch (e) {
        console.error("Error parsing existing cache, defaulting to new jobs only", e);
      }
    }

    // 3. Initialize groups using the combined total list of jobs
    const groups: JobGroups = {
      all: accumulatedJobs,
      highScore: [],
      today: [],
      weekly: [],
    };

    const now = new Date();
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).getTime();
    const startOfWeek = startOfToday - 7 * 24 * 60 * 60 * 1000;

    // 4. Categorize the aggregated list
    accumulatedJobs.forEach((job) => {
      const jobDate = new Date(job.creation).getTime();

      if (jobDate >= startOfToday) {
        groups.today.push(job);
      }
      if (jobDate >= startOfWeek) {
        groups.weekly.push(job);
      }
      if (job.salary && job.salary >= 5000) {
        groups.highScore.push(job);
      }
    });

    // 5. Save the fully aggregated groups back to localStorage
    localStorage.setItem(cacheKey, JSON.stringify(groups));
    return groups;
  },

  getCache: (feedId: number): JobGroups | null => {
    const raw = localStorage.getItem(`${CACHE_PREFIX}${feedId}`);
    return raw ? JSON.parse(raw) : null;
  },

  clearCache: (feedId: number) => {
    localStorage.removeItem(`${CACHE_PREFIX}${feedId}`);
  }
};
