export type JobFeed = {
  title: string;
  exp: string;
  type: "remote" | "on_site" | "hybrid" | "contract"; // or JobType enum if you want
  location: string;
  salary: number;
};
