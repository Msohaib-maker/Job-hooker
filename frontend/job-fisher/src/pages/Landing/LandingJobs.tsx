import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Building2,
  Lock,
  ArrowRight,
  Search,
  RefreshCw,
} from "lucide-react";
import { jobService } from "../../services/jobs";
import type { PublicJob } from "../../types";
import { useTranslation } from "../../i18n";
import type { TranslationKey } from "../../i18n";

const PREVIEW_LIMIT = 9;

const TYPE_STYLES: Record<string, { labelKey: TranslationKey; className: string }> =
  {
    remote: {
      labelKey: "jobs.typeRemote",
      className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    },
    on_site: {
      labelKey: "jobs.typeOnSite",
      className: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    },
  };

const FILTERS: { labelKey: TranslationKey; value: string }[] = [
  { labelKey: "jobs.filterAll", value: "" },
  { labelKey: "jobs.filterRemote", value: "remote" },
  { labelKey: "jobs.filterOnSite", value: "on_site" },
];

const formatSalary = (salary: number | null, currency: string) => {
  if (!salary) return null;
  const compact =
    salary >= 1000 ? `${Math.round(salary / 1000)}k` : `${salary}`;
  return `${currency === "USD" ? "$" : `${currency} `}${compact}`;
};

type Translate = ReturnType<typeof useTranslation>["t"];

const timeAgo = (iso: string, t: Translate) => {
  const days = Math.floor(
    (Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24),
  );
  if (Number.isNaN(days)) return null;
  if (days <= 0) return t("jobs.postedToday");
  if (days === 1) return t("jobs.postedYesterday");
  if (days < 30) return t("jobs.postedDaysAgo", { count: days });
  return t("jobs.postedMonthsAgo", { count: Math.floor(days / 30) });
};

const JobPreviewCard = ({
  job,
  index,
  onApply,
}: {
  job: PublicJob;
  index: number;
  onApply: () => void;
}) => {
  const { t } = useTranslation();
  const typeStyle = TYPE_STYLES[job.type];
  const typeLabel = typeStyle ? t(typeStyle.labelKey) : job.type;
  const typeClassName =
    typeStyle?.className ?? "bg-[#262626] text-[#A1A1AA] border-[#333333]";
  const salary = formatSalary(job.salary, job.salaryCurrency);
  const posted = timeAgo(job.creation, t);
  const tags = job.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 3);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: Math.min(index, 5) * 0.06 }}
      className="group flex flex-col bg-[#151515] border border-[#262626] rounded-2xl p-6 hover:border-[#10B981]/40 hover:bg-[#171717] transition-colors"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <span
          className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${typeClassName}`}
        >
          {typeLabel}
        </span>
        {posted && (
          <span className="text-[11px] text-[#525252] flex-shrink-0">
            {posted}
          </span>
        )}
      </div>

      <h3 className="text-lg font-bold text-[#EDEDED] leading-snug mb-2 group-hover:text-white transition-colors">
        {job.title}
      </h3>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-[#A1A1AA] mb-4">
        {job.company && (
          <span className="flex items-center gap-1.5 min-w-0">
            <Building2 className="w-3.5 h-3.5 flex-shrink-0 text-[#737373]" />
            <span className="truncate">{job.company}</span>
          </span>
        )}
        {job.location && (
          <span className="flex items-center gap-1.5 min-w-0">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-[#737373]" />
            <span className="truncate">{job.location}</span>
          </span>
        )}
      </div>

      {job.description && (
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          {job.description}
        </p>
      )}

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] text-[#A1A1AA] bg-[#0F0F0F] border border-[#262626] px-2.5 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto pt-4 border-t border-[#262626] flex items-center justify-between gap-3">
        <span className="text-base font-bold text-[#10B981]">
          {salary ?? (
            <span className="text-[#525252]">{t("jobs.salaryUndisclosed")}</span>
          )}
        </span>
        <button
          onClick={onApply}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#A1A1AA] hover:text-[#10B981] transition-colors"
        >
          <Lock className="w-3.5 h-3.5" />
          {t("jobs.unlockApply")}
        </button>
      </div>
    </motion.article>
  );
};

const SkeletonCard = () => (
  <div className="bg-[#151515] border border-[#262626] rounded-2xl p-6 animate-pulse">
    <div className="h-5 w-20 bg-[#262626] rounded-full mb-4" />
    <div className="h-5 w-3/4 bg-[#262626] rounded mb-3" />
    <div className="h-4 w-1/2 bg-[#1F1F1F] rounded mb-5" />
    <div className="h-3 w-full bg-[#1F1F1F] rounded mb-2" />
    <div className="h-3 w-5/6 bg-[#1F1F1F] rounded mb-6" />
    <div className="h-4 w-24 bg-[#262626] rounded" />
  </div>
);

const LandingJobs = () => {
  const navigate = useNavigate();
  const { t, formatNumber } = useTranslation();
  const [jobs, setJobs] = useState<PublicJob[]>([]);
  const [total, setTotal] = useState(0);
  const [type, setType] = useState<string>("");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setStatus("loading");
      try {
        const data = await jobService.getPublicJobs({
          limit: PREVIEW_LIMIT,
          ...(type ? { type } : {}),
          ...(query ? { search: query } : {}),
        });
        if (cancelled) return;
        setJobs(data.jobs);
        setTotal(data.total);
        setStatus("ready");
      } catch {
        if (cancelled) return;
        setStatus("error");
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [type, query, reloadKey]);

  const remaining = useMemo(
    () => Math.max(total - jobs.length, 0),
    [total, jobs.length],
  );

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setQuery(search.trim());
  };

  const roundToNearestThousandth = useCallback(
    (n: number): string => {
      if (n < 1000) {
        return `999`;
      }

      const mod = n % 1000;
      return `${mod}000+`;
    },
    [remaining],
  );

  return (
    <section
      id="open-roles"
      className="w-full py-24 px-6 bg-[#0F0F0F] relative z-10 border-t border-[#262626] scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-[2px] bg-[#10B981]" />
          <span className="text-[#10B981] text-sm font-bold tracking-widest uppercase">
            {t("jobs.eyebrow")}
          </span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#EDEDED] leading-tight mb-4">
              {t("jobs.title")}
            </h2>
            <p className="text-[#A1A1AA] text-lg max-w-2xl">
              {t("jobs.subtitle")}
            </p>
          </div>

          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 w-full lg:w-auto"
          >
            <div className="relative flex-1 lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#525252] pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t("jobs.searchPlaceholder")}
                aria-label={t("jobs.searchAria")}
                className="w-full bg-[#151515] border border-[#262626] rounded-lg pl-9 pr-3 py-2.5 text-sm text-[#EDEDED] placeholder:text-[#525252] focus:outline-none focus:border-[#10B981]/50 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#1A1A1A] border border-[#262626] text-[#EDEDED] hover:border-[#10B981]/50 transition-colors"
            >
              {t("common.search")}
            </button>
          </form>
        </div>
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {FILTERS.map((filter) => (
            <button
              key={filter.labelKey}
              onClick={() => setType(filter.value)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                type === filter.value
                  ? "bg-[#10B981] text-[#0F0F0F] border-[#10B981]"
                  : "bg-[#151515] text-[#A1A1AA] border-[#262626] hover:border-[#10B981]/40 hover:text-[#EDEDED]"
              }`}
            >
              {t(filter.labelKey)}
            </button>
          ))}
          {status === "ready" && total > 0 && (
            <span className="text-sm text-[#525252] sm:ml-3">
              {t(total === 1 ? "jobs.positionsOne" : "jobs.positionsOther", {
                count: formatNumber(total),
              })}
            </span>
          )}
        </div>
        {status === "loading" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        )}
        {status === "error" && (
          <div className="text-center py-16 bg-[#151515] border border-[#262626] rounded-2xl">
            <p className="text-[#A1A1AA] mb-5">{t("jobs.loadError")}</p>
            <button
              onClick={() => setReloadKey((key) => key + 1)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1A1A1A] border border-[#262626] text-sm font-semibold text-[#EDEDED] hover:border-[#10B981]/50 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              {t("common.tryAgain")}
            </button>
          </div>
        )}
        {status === "ready" && jobs.length === 0 && (
          <div className="text-center py-16 bg-[#151515] border border-[#262626] rounded-2xl">
            <p className="text-[#EDEDED] font-semibold mb-2">
              {t("jobs.emptyTitle")}
            </p>
            <p className="text-[#737373] text-sm">{t("jobs.emptyBody")}</p>
          </div>
        )}
        {status === "ready" && jobs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobs.map((job, index) => (
              <JobPreviewCard
                key={job.id}
                job={job}
                index={index}
                onApply={() => navigate("/register")}
              />
            ))}
          </div>
        )}
        {status === "ready" && jobs.length > 0 && (
          <div className="mt-12 bg-[#151515] border border-[#262626] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xl font-bold text-[#EDEDED] mb-1">
                {remaining > 0
                  ? t("jobs.behindLogin", {
                      count: roundToNearestThousandth(remaining),
                    })
                  : t("jobs.readyToApply")}
              </p>
              <p className="text-[#737373] text-sm">{t("jobs.ctaBody")}</p>
            </div>
            <button
              onClick={() => navigate("/register")}
              className="flex-shrink-0 bg-[#10B981] text-[#0F0F0F] font-bold py-3.5 px-7 rounded-xl hover:bg-[#34D399] transition shadow-[0_0_20px_rgba(16, 185, 129,0.25)] hover:shadow-[0_0_30px_rgba(16, 185, 129,0.45)] flex items-center gap-2 group"
            >
              {t("jobs.ctaButton")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default LandingJobs;
