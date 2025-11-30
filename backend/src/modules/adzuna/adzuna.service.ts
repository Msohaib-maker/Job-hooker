import { Injectable } from "@nestjs/common";
import { apiKey, appId } from "./constant";

@Injectable()
export class AdzunaService {
  async getJobs() {
    const country = "gb"; // or another code depending on region
    const app_id = appId;
    const app_key = apiKey;
    const what = "software developer";
    const where = "London";

    const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${app_id}&app_key=${app_key}&what=${encodeURIComponent(what)}&where=${encodeURIComponent(where)}`;

    const resp = await fetch(url);
    const data = await resp.json();
    const jobs = data.results || [];

    // Map to a simple list with title and description
    const simplified = jobs.map((job) => ({
      title: job.title,
      description: job.description,
    }));

    console.log(simplified);
    return simplified;
  }
}
