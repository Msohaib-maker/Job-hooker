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
    <div
      className="
        relative
        bg-[#0B0F0D]/80 backdrop-blur-xl
        rounded-2xl p-6
        border border-[#1F2A24]
        shadow-[0_0_30px_rgba(0,255,136,0.04)]
        transition-all duration-300
        hover:border-[#00FF88]
        hover:shadow-[0_0_40px_rgba(0,255,136,0.25)]
        hover:-translate-y-1
        flex flex-col gap-5
      "
    >
      {/* Neon edge glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none
        bg-gradient-to-r from-transparent via-[#00FF88]/10 to-transparent opacity-0
        hover:opacity-100 transition-opacity"
      />

      {/* Title & Company */}
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white tracking-wide">
          {job.title}
        </h3>
        {job.company && (
          <p className="text-sm text-[#8FAE9B] mt-1">{job.company}</p>
        )}
      </div>

      {/* Job Meta */}
      <div className="relative z-10 flex flex-wrap gap-2 text-xs text-[#8FAE9B]">
        {job.location && (
          <span
            className="flex items-center gap-1 px-3 py-1 rounded-full
            border border-[#1F2A24] bg-[#050807]"
          >
            <MapPin className="w-3.5 h-3.5 text-[#00FF88]" />
            {job.location}
          </span>
        )}

        {job.salary && (
          <span
            className="flex items-center gap-1 px-3 py-1 rounded-full
            border border-[#1F2A24] bg-[#050807]"
          >
            <DollarSign className="w-3.5 h-3.5 text-[#00FF88]" />
            {new Intl.NumberFormat("en-US").format(job.salary)}
          </span>
        )}

        <span
          className="flex items-center gap-1 px-3 py-1 rounded-full
          border border-[#1F2A24] bg-[#050807]"
        >
          <Briefcase className="w-3.5 h-3.5 text-[#00FF88]" />
          {job.type === "remote" ? "Remote" : "On-site"}
        </span>
      </div>

      {/* Description */}
      {job.description && (
        <p className="relative z-10 text-sm text-white/90 line-clamp-3">
          {job.description}
        </p>
      )}

      {/* Footer */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
        <div className="flex items-center gap-2 text-xs text-[#8FAE9B]">
          <Clock className="w-4 h-4 text-[#00FF88]" />
          <span>{new Date(job.creation).toLocaleDateString()}</span>
        </div>

        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center justify-center gap-2
            px-6 py-3 rounded-xl
            bg-[#111111] text-white font-semibold
            border-2 border-[#00FF88]
            shadow-[0_0_20px_rgba(0,255,136,0.6)]
            hover:shadow-[0_0_35px_rgba(0,255,136,0.9)]
            active:scale-[0.97]
            transition
          "
        >
          Apply Now
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default JobCard;
