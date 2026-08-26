import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { JobFeed } from "@/src/models/job-feed-model";
import {
  PublicJob,
  PublicJobsQuery,
  PublicJobsResponse,
} from "./dto/public-jobs.dto";


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

  /** Hard ceiling so the public endpoint can never be used to dump the table. */
  private static readonly PUBLIC_MAX_LIMIT = 24;
  private static readonly PUBLIC_DEFAULT_LIMIT = 9;
  private static readonly PUBLIC_DESCRIPTION_CHARS = 220;
  /** How many extra rows to pull so dedupe still fills the preview. */
  private static readonly PUBLIC_OVERFETCH = 6;

  private parseLimit(raw?: string): number {
    const parsed = Number.parseInt(raw ?? "", 10);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      return JobService.PUBLIC_DEFAULT_LIMIT;
    }
    return Math.min(parsed, JobService.PUBLIC_MAX_LIMIT);
  }

  /**
   * Strips everything a signed-out visitor should not get: the apply `url`
   * and `contactEmail` never leave the server, and the description is cut to
   * a teaser length.
   */
  private toPublicJob(job: any): PublicJob {
    const description: string | null = job.description ?? null;
    const truncated =
      description && description.length > JobService.PUBLIC_DESCRIPTION_CHARS
        ? `${description.slice(0, JobService.PUBLIC_DESCRIPTION_CHARS).trimEnd()}…`
        : description;

    return {
      id: job.id,
      title: job.title,
      description: truncated,
      company: job.company ?? null,
      platform: job.platform ?? null,
      location: job.location ?? null,
      salary: job.salary ?? null,
      salaryCurrency: job.salaryCurrency,
      experience: job.experience ?? null,
      type: job.type,
      tags: job.tags,
      creation: job.creation,
    };
  }

  /**
   * Free preview of the board for the landing page — no auth required.
   * Returns the newest non-rejected jobs, capped and sanitised.
   */
  async getPublicJobs(query: PublicJobsQuery): Promise<PublicJobsResponse> {
    const { search, location, type } = query;
    const limit = this.parseLimit(query.limit);

    const where: any = {
      status: { not: "rejected" },
      ...(type === "remote" || type === "on_site" ? { type } : {}),
      ...(location
        ? { location: { contains: location, mode: "insensitive" } }
        : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { company: { contains: search, mode: "insensitive" } },
              { tags: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
    };

    // Scrapers re-import the same posting repeatedly, so a straight
    // `take: limit` can fill the whole preview with one duplicated listing.
    // Over-fetch, collapse duplicates, then trim to the requested size.
    const [candidates, total] = await Promise.all([
      this.prisma.job.findMany({
        where,
        orderBy: { creation: "desc" },
        take: Math.min(limit * JobService.PUBLIC_OVERFETCH, 200),
      }),
      this.prisma.job.count({ where }),
    ]);

    const jobs = this.dedupe(candidates).slice(0, limit);

    return {
      jobs: jobs.map((job) => this.toPublicJob(job)),
      total,
      returned: jobs.length,
    };
  }

  /**
   * Collapses listings that are the same opening posted more than once,
   * keyed on title + company. Order is preserved, so the newest copy wins.
   */
  private dedupe(jobs: any[]): any[] {
    const seen = new Set<string>();
    const unique: any[] = [];

    for (const job of jobs) {
      const key = `${(job.title ?? "").trim().toLowerCase()}|${(
        job.company ?? ""
      )
        .trim()
        .toLowerCase()}`;

      if (seen.has(key)) continue;
      seen.add(key);
      unique.push(job);
    }

    return unique;
  }
}
