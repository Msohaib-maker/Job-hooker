import axios from "axios";
import type { JobBody } from "../types";

const BASE_API_DEV = "https://backend-young-snow-881.fly.dev";
// const BASE_API_DEV = "http://localhost:3000";

const api = axios.create({
  baseURL: BASE_API_DEV,
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
