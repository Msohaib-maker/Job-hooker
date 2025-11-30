export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  salary: string;
  type: "Full-time" | "Part-time" | "Contract" | "Freelance";
  remote: boolean;
  postedDate: string;
  description: string;
  requirements: string[];
  tags: string[];
  url: string;
}

export interface FilterState {
  search: string;
  location: string;
  jobType: string;
  remote: boolean | null;
  salaryMin: string;
}
