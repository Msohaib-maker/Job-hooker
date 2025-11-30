import { useState, useMemo } from "react";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import JobList from "../components/JobList";
import { FilterState, Job } from "../types";
import { mockJobs } from "../data/mockJobs";

const Home = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    location: "",
    jobType: "",
    remote: null,
    salaryMin: "",
  });

  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job: Job) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          job.title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower) ||
          job.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
          job.description.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Location filter
      if (filters.location) {
        const locationLower = filters.location.toLowerCase();
        if (!job.location.toLowerCase().includes(locationLower)) {
          return false;
        }
      }

      // Job type filter
      if (filters.jobType && job.type !== filters.jobType) {
        return false;
      }

      // Remote filter
      if (filters.remote !== null && job.remote !== filters.remote) {
        return false;
      }

      // Salary filter (basic implementation)
      if (filters.salaryMin) {
        const minSalary = parseInt(filters.salaryMin);
        const jobSalary = parseInt(job.salary.replace(/[^0-9]/g, ""));
        if (isNaN(jobSalary) || jobSalary < minSalary) {
          return false;
        }
      }

      return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Find Your Dream Job
          </h1>
          <p className="text-gray-600 text-lg">
            Discover thousands of opportunities from top companies
          </p>
        </div>

        <SearchBar filters={filters} onFiltersChange={setFilters} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Filters filters={filters} onFiltersChange={setFilters} />
          </div>
          <div className="lg:col-span-3">
            <JobList jobs={filteredJobs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
