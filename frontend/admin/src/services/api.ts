import axios from "axios";
import type { JobBody } from "../types";

const API_BASE_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "x-role": "MisterRobot",
    "x-pass": "Lo3kedHe2ven#!#",
  },
});

export const jobService = {
  createJobs: async (jobs: JobBody) => {
    const response = await api.post("/admin/jobs", jobs);
    return response.data;
  },
};
