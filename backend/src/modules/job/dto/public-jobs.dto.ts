export type PublicJobsQuery = {
  search?: string;
  location?: string;
  type?: string;
  limit?: string;
};

/**
 * Job shape exposed on the public (unauthenticated) landing page.
 * `url` and `contactEmail` are deliberately omitted — applying is the
 * value users sign up for.
 */
export type PublicJob = {
  id: string;
  title: string;
  description: string | null;
  company: string | null;
  platform: string | null;
  location: string | null;
  salary: number | null;
  salaryCurrency: string;
  experience: string | null;
  type: string;
  tags: string;
  creation: Date;
};

export type PublicJobsResponse = {
  jobs: PublicJob[];
  /** Total matching the filters, so the UI can tease "N more inside". */
  total: number;
  /** How many of `total` were actually returned. */
  returned: number;
};
