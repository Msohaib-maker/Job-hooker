import { api } from "./api";
import type { Job } from "../types";

export const jobService = {
  getJobs: async (feedId?: string): Promise<Job[]> => {
    const params = feedId ? { feedId } : {};
    const response = await api.get("/jobs", { params });
    return response.data;
  },
};

