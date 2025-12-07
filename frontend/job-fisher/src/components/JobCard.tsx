import { MapPin, DollarSign, Briefcase, Clock } from "lucide-react";
import { Job } from "../types";

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <div className="bg-dark-surface rounded-lg border border-dark-border p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-green-500 mb-1">
            {job.title}
          </h3>
          <p className="text-white font-medium">{job.company}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-4 text-sm text-dark-text-muted">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <DollarSign className="w-4 h-4" />
          <span>{job.salary}</span>
        </div>
        <div className="flex items-center gap-1">
          <Briefcase className="w-4 h-4" />
          <span>{job.type}</span>
        </div>
      </div>

      <p className="text-white mb-4 line-clamp-2">{job.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2"></div>
        <div className="flex items-center gap-2 text-sm text-dark-text-muted">
          <Clock className="w-4 h-4" />
          <span>{new Date(job.creation).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
