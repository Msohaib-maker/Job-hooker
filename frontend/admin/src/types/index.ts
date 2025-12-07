export type Job = {
  id?: string;
  title: string;
  description?: string;
  company?: string;
  location?: string;
  creation: Date | string;
};

export type JobBody = {
  data: Job[];
};

