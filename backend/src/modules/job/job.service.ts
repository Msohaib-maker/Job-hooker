import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Job } from "@/src/models/job-model";
import { JobFeed } from "@/src/models/job-feed-model";


// const DUMMY_JOBS = [
//   {
//     id: "job_001",
//     title: "Senior Full Stack Developer",
//     description: "We are looking for an experienced Full Stack Developer to join our team.",
//     company: "TechCorp",
//     platform: "Upwork",
//     location: "Remote",
//     salary: 120000,
//     type: "remote",
//     experience: "5+ years",
//     url: "https://upwork.com/jobs/1",
//   },
//   {
//     id: "job_002",
//     title: "React Native Developer",
//     description: "Build cross-platform mobile apps for our growing user base.",
//     company: "MobileFirst",
//     platform: "Upwork Inc",
//     location: "Remote",
//     salary: 95000,
//     type: "contract",
//     experience: "3+ years",
//     url: "https://upwork.com/jobs/2",
//   },
//   {
//     id: "job_003",
//     title: "Backend Engineer",
//     description: "Join our YC-backed startup to build scalable backend systems.",
//     company: "StartupAI",
//     platform: "YC",
//     location: "San Francisco, CA",
//     salary: 150000,
//     type: "on_site",
//     experience: "4+ years",
//     url: "https://ycombinator.com/jobs/3",
//   },
//   {
//     id: "job_004",
//     title: "Founding Engineer",
//     description: "Be the first engineer at our Y Combinator startup.",
//     company: "NeuralFlow",
//     platform: "Y Combinator",
//     location: "New York, NY",
//     salary: 180000,
//     type: "hybrid",
//     experience: "6+ years",
//     url: "https://ycombinator.com/jobs/4",
//   },
//   {
//     id: "job_005",
//     title: "WordPress Developer",
//     description: "Custom WordPress theme and plugin development for clients.",
//     company: null,
//     platform: "Fiverr",
//     location: "United States",
//     salary: 40000,
//     type: "contract",
//     experience: "2+ years",
//     url: "https://fiverr.com/jobs/5",
//   },
//   {
//     id: "job_006",
//     title: "Logo & Brand Identity Designer",
//     description: "Create stunning logos and brand identities for businesses.",
//     company: null,
//     platform: "Fiverr",
//     location: "Remote",
//     salary: 30000,
//     type: "contract",
//     experience: "1+ years",
//     url: "https://fiverr.com/jobs/6",
//   },
//   {
//     id: "job_007",
//     title: "DevOps Engineer",
//     description: "Manage and scale our cloud infrastructure.",
//     company: "CloudBase",
//     platform: null,
//     location: "Austin, TX",
//     salary: 130000,
//     type: "hybrid",
//     experience: "4+ years",
//     url: "https://example.com/jobs/7",
//   },
// ];


@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) { }

  async getFilteredJobs(feed: JobFeed) {
    const { title, location, salary, type } = feed;

    const jobs = await this.prisma.job.findMany();

    const filteredJobs = [];

    for (const job of jobs) {
      const jobTitle = job.title?.toLowerCase() || "";
      const searchTitle = title?.toLowerCase() || "";
      const jobLoc = job.location?.toLowerCase() || "";
      const searchLoc = location?.toLowerCase() || "";

      const titleCheck = !searchTitle || jobTitle.includes(searchTitle);
      const typeCheck = !type || job.type === type;
      const salaryCheck = !salary || (job.salary && job.salary >= salary);
      const locationCheck = !searchLoc || jobLoc.includes(searchLoc);

      // Less rigid: matching title or location or type is enough if they are provided.
      // But let's just make the matching case-insensitive and allow partial matches.
      // We will include the job if it matches at least one of the provided search criteria 
      // or if we use standard AND filtering but with relaxed strings.
      // Let's use relaxed AND filtering.
      if (!typeCheck || !locationCheck) {
        continue
      }
      if (titleCheck || salaryCheck) {
        filteredJobs.push(job);

      }
    }
    return { filteredJobs: filteredJobs };
  }
}
