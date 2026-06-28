export type Job = {
  id?: string;
  title: string;
  description?: string;
  platform?: "Upwork" | "Upwork_Inc" | "YC" | "Y_Combinator" | "Fiverr" | null;
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
