import {
  MapPin,
  DollarSign,
  Briefcase,
  Clock,
  ExternalLink,
} from "lucide-react";
import { Job } from "../types";

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <div className="bg-dark-surface rounded-2xl border border-dark-border p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col gap-4">
      {/* Title & Company */}
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-semibold text-green-500">{job.title}</h3>
        {job.company && (
          <p className="text-white font-medium text-sm">{job.company}</p>
        )}
      </div>

      {/* Job Meta */}
      <div className="flex flex-wrap gap-2 text-sm text-dark-text-muted">
        {job.location && (
          <span className="flex items-center gap-1 bg-dark-border px-2 py-1 rounded-md">
            <MapPin className="w-4 h-4" />
            {job.location}
          </span>
        )}
        {job.salary && (
          <span className="flex items-center gap-1 bg-dark-border px-2 py-1 rounded-md">
            <DollarSign className="w-4 h-4" />
            {new Intl.NumberFormat("en-US").format(job.salary)}
          </span>
        )}
        <span className="flex items-center gap-1 bg-dark-border px-2 py-1 rounded-md">
          <Briefcase className="w-4 h-4" />
          {job.type === "remote" ? "Remote" : "On-site"}
        </span>
      </div>

      {/* Description */}
      {job.description && (
        <p className="text-white text-sm line-clamp-3">{job.description}</p>
      )}

      {/* Footer: Date & Apply */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-dark-text-muted">
          <Clock className="w-4 h-4" />
          <span>{new Date(job.creation).toLocaleDateString()}</span>
        </div>

        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition-colors text-sm sm:text-base flex-1 sm:flex-none"
        >
          Apply Now
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default JobCard;
