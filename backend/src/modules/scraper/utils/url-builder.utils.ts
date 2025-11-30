import { JOB_SEARCH_URL } from "../constants/jobs-urls";
import {
  ExperienceLevel,
  WorkType,
  JobType,
  TimePosted,
} from "../../../filters/job-filters";

interface LinkedInSearchParams {
  keywords?: string;
  location?: string;
  experience?: ExperienceLevel[];
  workType?: WorkType[];
  jobType?: JobType[];
  timePosted?: TimePosted;
}

export function buildLinkedInSearchUrl(params: LinkedInSearchParams): string {
  const query = new URLSearchParams();

  if (params.keywords) query.set("keywords", params.keywords);
  if (params.location) query.set("location", params.location);
  if (params.experience?.length) query.set("f_E", params.experience.join(","));
  if (params.workType?.length) query.set("f_WT", params.workType.join(","));
  if (params.jobType?.length) query.set("f_JT", params.jobType.join(","));
  if (params.timePosted) query.set("f_TPR", params.timePosted);

  return `${JOB_SEARCH_URL}?${query.toString()}`;
}
