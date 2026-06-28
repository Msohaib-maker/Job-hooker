import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
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


   private extractKeywords(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[()\/]/g, " ")   // remove brackets, slashes
      .split(/\s+/)
      .filter(w => w.length > 2) // drop tiny words like "a", "of"
      .filter(w => !["and", "the", "for", "with"].includes(w));
  }

  private matchScore(jobTitle: string, searchRole: string): number {
  const jobKeywords = this.extractKeywords(jobTitle);
  const searchKeywords = this.extractKeywords(searchRole);

  let score = 0;
  for (const kw of searchKeywords) {
    if (jobKeywords.some(jk => jk.includes(kw) || kw.includes(jk))) {
      score++;
    }
  }
  return score;
}


  async getFilteredJobs(feed: JobFeed) {
  const { title, location, type } = feed;
  const jobsKey = "Filtered Jobs";

  const jobs = await this.prisma.job.findMany({
    where: {
      ...(type && { type }),
      ...(location && {
        location: { contains: location, mode: "insensitive" },
      }),
    },
  });

  const searchKeywords = this.extractKeywords(title);
  let minScore = Math.ceil(searchKeywords.length / 2); // e.g. "Frontend Developer" → needs 1 out of 2... 

  // Actually for 2-word queries, require ALL keywords to match
  minScore = searchKeywords.length >= 3
    ? Math.ceil(searchKeywords.length / 2)  // 3+ words: majority match
    : searchKeywords.length; 



  const filteredJobs = jobs
    .map(job => ({ job, score: this.matchScore(job.title ?? "", title) }))
    .filter(({ score }) => score >= minScore)
    .sort((a, b) => b.score - a.score)
    .map(({ job }) => job); // pure Prisma Job[], no extra props

  console.log(title)
  console.log(`${jobsKey} `, filteredJobs)
  return { filteredJobs };
}
}
