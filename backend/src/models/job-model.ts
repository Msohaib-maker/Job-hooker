export type Job = {
  id?: string;
  title: string;
  description?: string;
  company?: string;
  location?: string;
  creation: Date;
  salary?: number;
  experience?: string;
  type: "remote" | "on_site";
  url?: string;
  tags: string;
  contactEmail?: string;
  salaryCurrency: string;
  status: "pending" | "approved" | "rejected";
};

export type JobBody = {
  data: Job[];
};
