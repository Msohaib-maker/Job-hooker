import { JobRole } from "../models/enums";
import { JobType } from "../models/types";
import { SalaryType } from "./job.type";

export interface Job {
  id?: string;
  title: string;
  description?: string;
  company?: string;
  platform?: "Upwork" | "Upwork_Inc" | "YC" | "Y_Combinator" | "Fiverr";
  location?: string;
  creation: Date;
  salary?: number;
  url?: string;
  experience?: string;
  type: JobType;
}

export interface FilterState {
  search: string;
  location: string;
  jobType: string;
  remote: boolean | null;
  salaryMin: string;
}

export interface Feed {
  id: number;
  title: JobRole;
  exp: string;
  type: "remote" | "on_site";
  location: string;
  salary: number;
  salaryCurrency: string;
  tags: string;
  salaryType: SalaryType;
  platforms: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateFeedDto {
  title: JobRole;
  exp: string;
  type: JobType;
  location: string;
  salary: number;
  tags: string;
  salaryCurrency: string;
  salaryType: SalaryType;
  platforms: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

/** Sanitised job returned by GET /jobs/public — no apply url, no contact email. */
export interface PublicJob {
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
  creation: string;
}

export interface PublicJobsResponse {
  jobs: PublicJob[];
  total: number;
  returned: number;
}
