export type Job = {
  id?: string;
  title: string;
  description?: string;
  company?: string;
  location?: string;
  creation: Date | string;
  salary?: number;
  experience?: string;
  salaryCurrency: string;
  tags: string;
  type: "remote" | "on_site";
  url?: string;
  contactEmail: string;
};

export type JobBody = {
  data: Job[];
};

export type JobWithUI = { job: Job } & { key: string };
