import { useState, useEffect } from "react";
import { Calendar, MapPin, Building2, FileText, Search } from "lucide-react";
import type { Job } from "../types";

// Mock data for demonstration - replace with actual API call
const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Software Engineer",
    company: "Tech Corp",
    location: "San Francisco, CA",
    description: "We are looking for an experienced software engineer...",
    creation: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "Frontend Developer",
    company: "Design Studio",
    location: "Remote",
    description: "Join our team to build amazing user interfaces...",
    creation: new Date("2024-01-20"),
  },
];

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [searchTerm, setSearchTerm] = useState("");

  // TODO: Replace with actual API call
  // useEffect(() => {
  //   const fetchJobs = async () => {
  //     try {
  //       const response = await jobService.getJobs();
  //       setJobs(response.data);
  //     } catch (error) {
  //       console.error("Failed to fetch jobs:", error);
  //     }
  //   };
  //   fetchJobs();
  // }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date: Date | string) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="card p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search jobs by title, company, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length === 0 ? (
        <div className="card p-12 text-center">
          <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">
            No jobs found
          </h3>
          <p className="text-gray-500">
            {searchTerm
              ? "Try adjusting your search terms"
              : "No jobs have been created yet"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="card p-6 hover:border-primary-600 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-white line-clamp-2">
                  {job.title}
                </h3>
              </div>

              <div className="space-y-3 mb-4">
                {job.company && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <Building2 className="w-4 h-4" />
                    <span className="text-sm">{job.company}</span>
                  </div>
                )}

                {job.location && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {formatDate(job.creation)}
                  </span>
                </div>
              </div>

              {job.description && (
                <p className="text-gray-300 text-sm line-clamp-3 mb-4">
                  {job.description}
                </p>
              )}

              <div className="pt-4 border-t border-gray-700">
                <span className="text-xs text-gray-500">ID: {job.id}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="card p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Total Jobs</p>
            <p className="text-2xl font-bold text-white">{jobs.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Showing</p>
            <p className="text-2xl font-bold text-white">
              {filteredJobs.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

