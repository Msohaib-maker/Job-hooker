import axios from "axios";
import type { JobBody } from "../types";

const API_BASE_URL = "https://backend-young-snow-881.fly.dev";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "x-role": import.meta.env.VITE_USERNAME,
    "x-pass": import.meta.env.VITE_PASSWORD,
  },
});

export const jobService = {
  createJobs: async (jobs: JobBody) => {
    const response = await api.post("/admin/jobs", jobs);
    return response.data;
  },
};
