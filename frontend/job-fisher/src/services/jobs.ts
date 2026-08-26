import { api } from "./api";
import type { Job, PublicJob, PublicJobsResponse } from "../types";

export const jobService = {
  getJobs: async (feedId?: string): Promise<Job[]> => {
    const params = feedId ? { feedId } : {};
    const response = await api.get("/jobs", { params });
    return response.data;
  },

  /**
   * Free, signed-out job preview used by the landing page.
   * The API strips the apply url and contact email — those need an account.
   */
  getPublicJobs: async (params?: {
    search?: string;
    location?: string;
    type?: string;
    limit?: number;
  }): Promise<PublicJobsResponse> => {
    const response = await api.get("/jobs/public", { params });
    return response.data;
  },
};

export type { PublicJob };
