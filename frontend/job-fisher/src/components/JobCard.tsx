import { useState } from "react";
import { MapPin, DollarSign, Clock, ExternalLink, FileText, ScrollText, Sparkles, Video, MessageSquare, AlignLeft, Building2 } from "lucide-react";
import { Job } from "../types";
import { JobType } from "../models/types";
import ProfileDialog, { ProfileForm } from "./ProfileDialog";
import { filesService } from "../services/files";

interface JobCardProps {
  job: Job;
  isSelected: boolean;
  checkSelected: (job: Job) => void;
}

const JOB_TYPE_STYLES: Record<JobType, { label: string; className: string }> = {
  remote: { label: "Remote", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" },
  on_site: { label: "On-site", className: "bg-blue-500/10 text-blue-400 border-blue-500/30" },
  hybrid: { label: "Hybrid", className: "bg-violet-500/10 text-violet-400 border-violet-500/30" },
  contract: { label: "Contract", className: "bg-amber-500/10 text-amber-400 border-amber-500/30" },
};

const PLATFORM_STYLES: Record<string, { label: string; className: string }> = {
  "Upwork": { label: "Upwork", className: "bg-green-500/10 text-green-400 border-green-500/30" },
  "Upwork Inc": { label: "Upwork", className: "bg-green-500/10 text-green-400 border-green-500/30" },
  "YC": { label: "Y Combinator", className: "bg-orange-500/10 text-orange-400 border-orange-500/30" },
  "Y Combinator": { label: "Y Combinator", className: "bg-orange-500/10 text-orange-400 border-orange-500/30" },
  "Fiverr": { label: "Fiverr", className: "bg-teal-500/10 text-teal-400 border-teal-500/30" },
};

interface CheckboxProps {
  label: string;
  icon: React.ReactNode;
  checked: boolean;
  onChange: (val: boolean) => void;
}

const Checkbox = ({ label, icon, checked, onChange }: CheckboxProps) => (
  <button
    type="button"
    onClick={(e) => { e.stopPropagation(); onChange(!checked); }}
    className={`
      flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium
      transition-all duration-200 select-none
      ${checked
        ? "bg-[#C4F029]/10 border-[#C4F029]/40 text-[#C4F029]"
        : "bg-[#151515] border-[#262626] text-[#737373] hover:border-[#C4F029]/20 hover:text-[#A1A1AA]"
      }
    `}
  >
    <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all
      ${checked ? "bg-[#C4F029] border-[#C4F029]" : "border-[#3f3f3f]"}`}
    >
      {checked && (
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path d="M1 4L3.5 6.5L9 1" stroke="#0F0F0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
    {icon}
    {label}
  </button>
);

// ─── platform-aware options ──────────────────────────────────────────────────

type GenerateOptions = {
  coverLetter: boolean;
  cv: boolean;
  proposal: boolean;
  pitchVideo: boolean;
  ycInterview: boolean;
};

function useGenerateOptions() {
  const [opts, setOpts] = useState<GenerateOptions>({
    coverLetter: false,
    cv: false,
    proposal: false,
    pitchVideo: false,
    ycInterview: false,
  });

  const toggle = (key: keyof GenerateOptions) =>
    setOpts((prev) => ({ ...prev, [key]: !prev[key] }));

  const hasAny = Object.values(opts).some(Boolean);

  return { opts, toggle, hasAny };
}

function PlatformCheckboxes({
  platform,
  opts,
  toggle,
}: {
  platform: Job["platform"] | undefined;
  opts: GenerateOptions;
  toggle: (key: keyof GenerateOptions) => void;
}) {
  const isUpwork = platform === "Upwork" || platform === "Upwork Inc";
  const isYC = platform === "YC" || platform === "Y Combinator";
  const isFiverr = platform === "Fiverr";

  if (isFiverr) {
    return (
      <Checkbox
        label="Description"
        icon={<AlignLeft className="w-3.5 h-3.5" />}
        checked={opts.cv} // reuse cv slot or add dedicated field
        onChange={() => toggle("cv")}
      />
    );
  }

  if (isUpwork) {
    return (
      <>
        <Checkbox label="CV" icon={<FileText className="w-3.5 h-3.5" />} checked={opts.cv} onChange={() => toggle("cv")} />
        <Checkbox label="Proposal" icon={<MessageSquare className="w-3.5 h-3.5" />} checked={opts.proposal} onChange={() => toggle("proposal")} />
      </>
    );
  }

  if (isYC) {
    return (
      <>
        <Checkbox label="Pitch Video" icon={<Video className="w-3.5 h-3.5" />} checked={opts.pitchVideo} onChange={() => toggle("pitchVideo")} />
        <Checkbox label="YC Interview" icon={<MessageSquare className="w-3.5 h-3.5" />} checked={opts.ycInterview} onChange={() => toggle("ycInterview")} />
      </>
    );
  }

  // default
  return (
    <>
      <Checkbox label="Cover Letter" icon={<ScrollText className="w-3.5 h-3.5" />} checked={opts.coverLetter} onChange={() => toggle("coverLetter")} />
      <Checkbox label="CV" icon={<FileText className="w-3.5 h-3.5" />} checked={opts.cv} onChange={() => toggle("cv")} />
    </>
  );
}

// ─── main component ──────────────────────────────────────────────────────────

const JobCard = ({ job, isSelected, checkSelected }: JobCardProps) => {
  const { opts, toggle, hasAny } = useGenerateOptions();
  const [profileOpen, setProfileOpen] = useState(false);

  const typeStyle = JOB_TYPE_STYLES[job.type];
  const platformStyle = job.platform ? PLATFORM_STYLES[job.platform] : null;

  const formattedDate = new Date(job.creation).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });

  const handleGenerate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setProfileOpen(true);
  };

  const handleProfileSubmit = async (data: ProfileForm) => {
    try {
      if (opts.coverLetter) {
        const blob = await filesService.getCoverLetter({ profile: data, job });
        triggerDownload(blob, `CoverLetter_${job.title.replace(/\s+/g, "_")}.pdf`);
      }
      if (opts.cv) {
        const blob = await filesService.getCV({ profile: data, job });
        triggerDownload(blob, `CV_${job.title.replace(/\s+/g, "_")}.pdf`);
      }
      // TODO: handle proposal, pitchVideo, ycInterview
    } catch (error) {
      console.error("Generating documents failed:", error);
    }
  };

  return (
    <>
      <ProfileDialog job={job} open={profileOpen} onClose={() => setProfileOpen(false)} onSubmit={handleProfileSubmit} />

      <div
        onClick={() => checkSelected(job)}
        className={`
          relative bg-[#111111] rounded-2xl p-6
          border transition-all duration-300
          flex flex-col gap-4 cursor-pointer hover:-translate-y-0.5
          ${isSelected
            ? "border-[#C4F029] shadow-[0_0_25px_rgba(196,240,41,0.12)]"
            : "border-[#262626] hover:border-[#C4F029]/30 hover:shadow-[0_0_30px_rgba(196,240,41,0.06)]"
          }
        `}
      >
        {/* Title & badges */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-[#EDEDED] leading-snug">{job.title}</h3>
            {job.company && <p className="text-sm text-[#737373] mt-0.5">{job.company}</p>}
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className={`flex-shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-md border ${typeStyle.className}`}>
              {typeStyle.label}
            </span>
            {platformStyle && (
              <span className={`flex items-center gap-1 flex-shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-md border ${platformStyle.className}`}>
                <Building2 className="w-3 h-3" />
                {platformStyle.label}
              </span>
            )}
          </div>
        </div>

        {/* Meta pills */}
        <div className="flex flex-wrap gap-2">
          {job.location && (
            <span className="flex items-center gap-1.5 text-xs text-[#737373] px-2.5 py-1 rounded-lg bg-[#1A1A1A] border border-[#262626]">
              <MapPin className="w-3 h-3 text-[#525252]" /> {job.location}
            </span>
          )}
          {job.salary && (
            <span className="flex items-center gap-1.5 text-xs text-[#737373] px-2.5 py-1 rounded-lg bg-[#1A1A1A] border border-[#262626]">
              <DollarSign className="w-3 h-3 text-[#525252]" /> {new Intl.NumberFormat("en-US").format(job.salary)}
            </span>
          )}
          {job.experience && (
            <span className="flex items-center gap-1.5 text-xs text-[#737373] px-2.5 py-1 rounded-lg bg-[#1A1A1A] border border-[#262626]">
              {job.experience}
            </span>
          )}
          {job.platform && (
  <span className={`flex items-center gap-1.5 flex-shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-md border ${platformStyle?.className}`}>
    <img
      src={`/${
        job.platform === "YC" || job.platform === "Y Combinator" ? "YC" :
        job.platform === "Upwork" || job.platform === "Upwork Inc" ? "upwork" :
        "fiverr"
      }.png`}
      alt={job.platform}
      className="w-3.5 h-3.5 object-contain"
    />
    {platformStyle?.label?? ""}
  </span>
)}
        </div>

        {/* Description */}
        {job.description && (
          <p className="text-sm text-[#737373] line-clamp-2 leading-relaxed">{job.description}</p>
        )}

        {/* Platform-aware checkboxes */}
        <div className="flex items-center gap-2 pt-1 flex-wrap">
          <PlatformCheckboxes platform={job.platform} opts={opts} toggle={toggle} />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1 border-t border-[#1A1A1A]">
          <div className="flex items-center gap-1.5 text-xs text-[#525252]">
            <Clock className="w-3.5 h-3.5" /> {formattedDate}
          </div>

          <div className="flex items-center gap-2">
            {isSelected && hasAny && (
              <button
                onClick={handleGenerate}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold
                  bg-[#1A1A1A] border border-[#C4F029]/40 text-[#C4F029]
                  hover:bg-[#C4F029]/10 active:scale-[0.97] transition-all duration-150"
              >
                <Sparkles className="w-3.5 h-3.5" /> Generate
              </button>
            )}
            {job.url && (
              <a
                href={job.url} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold
                  bg-[#C4F029] text-[#0F0F0F] hover:bg-[#D4FF39] active:scale-[0.97] transition-all duration-150"
              >
                Apply Now <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// ─── helpers ─────────────────────────────────────────────────────────────────

function triggerDownload(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

export default JobCard;