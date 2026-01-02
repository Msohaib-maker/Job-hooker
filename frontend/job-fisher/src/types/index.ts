export interface Job {
  id?: string;
  title: string;
  description?: string;
  company?: string;
  location?: string;
  creation: Date;
  salary?: number;
  url?: string;
  experience?: string;
  type: "remote" | "on_site";
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
  title: string;
  exp: string;
  type: "remote" | "on_site";
  location: string;
  salary: number;
  salaryCurrency: string;
  tags: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateFeedDto {
  title: string;
  exp: string;
  type: "remote" | "on_site";
  location: string;
  salary: number;
  tags: string;
  salaryCurrency: string;
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
