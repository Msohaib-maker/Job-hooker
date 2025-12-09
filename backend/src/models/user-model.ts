import { JobFeed } from "./job-feed-model";

export type User = {
  id?: number;
  email: string;
  password: string;
  telegram_handle?: string;
  telegram_one_time_code?: string;
  email_handler?: string;

  feeds: JobFeed[];
};
