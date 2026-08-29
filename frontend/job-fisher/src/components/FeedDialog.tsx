// FeedDialog.tsx

import type { CreateFeedDto } from "../types";
import { InputElement } from "./InputElement";
import { DropdownWrapper, Dropdown, DropdownOption } from "./DropDown";
import { JobRole, TAGS } from "../models/enums";
import { JOB_TYPE_VALUES, JobType } from "../models/types";
import { useFeedForm } from "../hooks/useFeedForm";
import { X } from "lucide-react";
import cc from "currency-codes";
import { Slider } from "./Slider";
import { SalaryType, Platform } from "../types/job.type";
import { useTranslation } from "../i18n";
import type { TranslationKey } from "../i18n";

interface FeedDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (feed: CreateFeedDto) => Promise<void>;
  feed?: (CreateFeedDto & { id?: number }) | null;
}

const JOB_TYPE_LABEL_KEYS: Record<JobType, TranslationKey> = {
  remote: "feeds.typeRemote",
  on_site: "feeds.typeOnSite",
  hybrid: "feeds.typeHybrid",
  contract: "feeds.typeContract",
};

const FeedDialog = ({ isOpen, onClose, onSave, feed }: FeedDialogProps) => {
  const { t } = useTranslation();
  const {
    title,
    setTitle,
    exp,
    setExp,
    type,
    setType,
    location,
    setLocation,
    salary,
    setSalary,
    currency,
    setCurrency,
    tags,
    salaryType,
    setSalaryType,
    platforms,
    step,
    setStep,
    isLoading,
    setIsLoading,
    error,
    setError,
    salaryTypes,
    COUNTRIES,
    jobRoleOptions,
    toggleTag,
    setPlatformList,
  } = useFeedForm({ feed });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError(t("feeds.errorTitle"));
      return;
    }

    if (!exp.trim()) {
      setError(t("feeds.errorExperience"));
      return;
    }

    if (!location.trim()) {
      setError(t("feeds.errorLocation"));
      return;
    }

    const salaryNum = parseFloat(salary);
    if (!salary.trim() || isNaN(salaryNum) || salaryNum < 0) {
      setError(t("feeds.errorSalary"));
      return;
    }

    setIsLoading(true);
    try {
      const feedRequestObject = {
        title: title.trim() as JobRole,
        exp: exp.trim(),
        type,
        location: location.trim(),
        salary: salaryNum,
        salaryCurrency: currency,
        tags: tags.join(","),
        salaryType: salaryType,
        platforms: platforms.join(","),
      };
      await onSave(feedRequestObject);
      console.log("close");
      onClose();
    } catch (err: unknown) {
      setError(t("feeds.errorSave"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      {/* Styled to match main container colors of FeedItem */}
      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0F0F0F] border border-[#262626] shadow-2xl">
        <DialogHeader feed={feed} onClose={onClose} />
        <StepIndicator step={step} />

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {error && <ErrorBanner message={error} />}

          {step === 1 && (
            <StepOne
              title={title}
              setTitle={setTitle}
              jobRoleOptions={jobRoleOptions}
              exp={exp}
              setExp={setExp}
              platforms={platforms}
              setPlatformList={setPlatformList}
              type={type}
              setType={setType}
              location={location}
              setLocation={setLocation}
              COUNTRIES={COUNTRIES}
            />
          )}

          {step === 2 && (
            <StepTwo
              tags={tags}
              toggleTag={toggleTag}
              salaryTypes={salaryTypes}
              salaryType={salaryType}
              setSalaryType={setSalaryType}
              salary={salary}
              setSalary={setSalary}
              currency={currency}
              setCurrency={setCurrency}
            />
          )}

          <DialogFooter
            step={step}
            setStep={setStep}
            isLoading={isLoading}
            feed={feed}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default FeedDialog;

// ─── Step indicator ───────────────────────────────────────────────
const StepIndicator = ({ step }: { step: number }) => {
  const { t } = useTranslation();

  return (
    <div className="px-6 pt-4">
      <div className="flex items-center gap-2 text-sm">
        <span
          className={`font-semibold ${step === 1 ? "text-[#10B981]" : "text-[#737373]"}`}
        >
          {t("feeds.step1")}
        </span>
        <div className="flex-1 h-px bg-[#262626]" />
        <span
          className={`font-semibold ${step === 2 ? "text-[#10B981]" : "text-[#737373]"}`}
        >
          {t("feeds.step2")}
        </span>
      </div>
    </div>
  );
};

// ─── Dialog header ────────────────────────────────────────────────
const DialogHeader = ({
  feed,
  onClose,
}: {
  feed: FeedDialogProps["feed"];
  onClose: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between p-6 border-b border-[#262626]">
      <h2 className="text-2xl font-extrabold text-[#EDEDED] tracking-wide">
        {feed ? t("feeds.editFeedTitle") : t("feeds.createFeedTitle")}
      </h2>
      <button
        type="button"
        onClick={onClose}
        aria-label={t("common.close")}
        className="p-2 rounded-lg text-[#737373] hover:text-[#EDEDED] hover:bg-[#1A1A1A] transition"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

// ─── Error banner ─────────────────────────────────────────────────
const ErrorBanner = ({ message }: { message: string }) => (
  <div className="md:col-span-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
    {message}
  </div>
);

// ─── Salary type toggle ───────────────────────────────────────────
const SalaryTypeToggle = ({
  salaryTypes,
  salaryType,
  onToggle,
}: {
  salaryTypes: SalaryType[];
  salaryType: SalaryType;
  onToggle: (value: SalaryType) => void;
}) => {
  const { t } = useTranslation();

  return (
    <div className="md:col-span-2">
      <label className="block text-sm font-medium text-[#A1A1AA] mb-3">
        {t("feeds.fieldSalaryType")} <span className="text-[#10B981]">*</span>
      </label>
      <div className="inline-flex p-1 rounded-xl bg-[#0F0F0F] border border-[#262626]">
        {salaryTypes.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onToggle(option)}
            className={`
            relative px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200
            ${
              salaryType === option
                ? "bg-[#151515] text-[#10B981] border border-[#10B981]/30"
                : "text-[#737373] hover:text-[#A1A1AA] border border-transparent"
            }
          `}
          >
            {option === "Fixed"
              ? t("feeds.salaryFixed")
              : t("feeds.salaryHourly")}
          </button>
        ))}
      </div>
    </div>
  );
};

// ─── Salary field ─────────────────────────────────────────────────
const SalaryField = ({
  salary,
  setSalary,
  salaryType,
  currency,
  setCurrency,
}: {
  salary: string;
  setSalary: (v: string) => void;
  salaryType: SalaryType;
  currency: string;
  setCurrency: (v: string) => void;
}) => {
  const { t } = useTranslation();

  return (
  <div>
    <label className="block text-sm font-medium text-[#A1A1AA] mb-3">
      {t("feeds.fieldSalary")} <span className="text-[#10B981]">*</span>
    </label>
    <div className="flex gap-3">
      {salaryType === "Fixed" ? (
        <InputElement
          type="number"
          value={salary}
          onChange={setSalary}
          clampMin={5000}
          placeholder={t("feeds.salaryMinPlaceholder")}
          prefix="$"
          className="flex-1"
        />
      ) : (
        <Slider
          value={salary}
          onChange={setSalary}
          min={10}
          max={350}
          step={5}
          formatValue={(v) => t("feeds.hourlyRateFormat", { value: v })}
          className="flex-1"
        />
      )}
      <div className="w-36">
        <Dropdown
          options={cc.codes().map((code) => ({
            value: code,
            label: code,
            description: cc.code(code)?.currency,
          }))}
          value={currency}
          onChange={setCurrency}
        />
      </div>
    </div>
  </div>
  );
};

// ─── Step 1 ───────────────────────────────────────────────────────
const StepOne = ({
  title,
  setTitle,
  jobRoleOptions,
  exp,
  setExp,
  platforms,
  setPlatformList,
  type,
  setType,
  location,
  setLocation,
  COUNTRIES,
}: {
  title: JobRole;
  setTitle: (v: JobRole) => void;
  jobRoleOptions: DropdownOption<JobRole>[];
  exp: string;
  setExp: (v: string) => void;
  platforms: Platform[];
  setPlatformList: (v: Platform) => void;
  type: JobType;
  setType: (v: JobType) => void;
  location: string;
  setLocation: (v: string) => void;
  COUNTRIES: string[];
}) => {
  const { t } = useTranslation();

  return (
  <>
    <DropdownWrapper>
      <Dropdown
        label={t("feeds.fieldRole")}
        options={jobRoleOptions}
        value={title}
        onChange={setTitle}
        required
      />
    </DropdownWrapper>

    <InputElement
      id="feed-exp"
      label={t("feeds.fieldExperience")}
      value={exp}
      onChange={setExp}
      type="number"
      min={0}
      step={1}
      required
    />

    <DropdownWrapper>
      <Dropdown
        multi
        label={t("feeds.fieldPlatforms")}
        placeholder={t("feeds.platformsPlaceholder")}
        options={[
          {
            value: "Upwork",
            label: "Upwork",
            icon: <img src="/upwork.png" className="w-4 h-4" />,
          },
          {
            value: "LinkedIn",
            label: "LinkedIn",
            icon: <img src="/linkedIn.png" className="w-4 h-4" />,
          },
          {
            value: "Fiverr",
            label: "Fiverr",
            icon: <img src="/fiverr.png" className="w-4 h-4" />,
          },
          {
            value: "CareerBuilder",
            label: "CareerBuilder",
            icon: <img src="/career-builder.png" className="w-4 h-4" />,
          },
          {
            value: "Glassdoor",
            label: "Glassdoor",
            icon: <img src="/glassdoor.png" className="w-4 h-4" />,
          },
          {
            value: "Indeed",
            label: "Indeed",
            icon: <img src="/indeed.png" className="w-4 h-4" />,
          },
          {
            value: "YC",
            label: "Y Combinator",
            icon: <img src="/YC.png" className="w-4 h-4" />,
          },
        ]}
        value={platforms}
        onChange={setPlatformList}
      />
    </DropdownWrapper>

    <DropdownWrapper>
      <Dropdown
        label={t("feeds.fieldType")}
        options={JOB_TYPE_VALUES.map((value) => ({
          value,
          label: t(JOB_TYPE_LABEL_KEYS[value]),
        }))}
        value={type}
        onChange={setType}
        required
      />
    </DropdownWrapper>

    <DropdownWrapper>
      <Dropdown
        label={t("feeds.fieldCountry")}
        value={location}
        onChange={setLocation}
        options={COUNTRIES.map((c) => ({ label: c, value: c }))}
        required
      />
    </DropdownWrapper>
  </>
  );
};

// ─── Step 2 ───────────────────────────────────────────────────────
const StepTwo = ({
  tags,
  toggleTag,
  salaryTypes,
  salaryType,
  setSalaryType,
  salary,
  setSalary,
  currency,
  setCurrency,
}: {
  tags: string[];
  toggleTag: (v: string) => void;
  salaryTypes: SalaryType[];
  salaryType: SalaryType;
  setSalaryType: (v: SalaryType) => void;
  salary: string;
  setSalary: (v: string) => void;
  currency: string;
  setCurrency: (v: string) => void;
}) => {
  const { t } = useTranslation();

  return (
  <>
    <div className="md:col-span-2">
      <Dropdown
        multi
        label={t("feeds.fieldSkills")}
        placeholder={t("feeds.skillsPlaceholder")}
        options={Object.values(TAGS).map((tag) => ({ value: tag, label: tag }))}
        value={tags as string[]}
        onChange={toggleTag}
      />
    </div>

    <SalaryTypeToggle
      salaryTypes={salaryTypes}
      salaryType={salaryType}
      onToggle={setSalaryType}
    />

    <SalaryField
      salary={salary}
      setSalary={setSalary}
      salaryType={salaryType}
      currency={currency}
      setCurrency={setCurrency}
    />
  </>
  );
};

// ─── Footer ───────────────────────────────────────────────────────
const DialogFooter = ({
  step,
  setStep,
  isLoading,
  feed,
  handleSubmit,
}: {
  step: number;
  setStep: (v: number) => void;
  isLoading: boolean;
  feed: FeedDialogProps["feed"];
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  const { t } = useTranslation();

  return (
  <div className="md:col-span-2 flex gap-3 pt-6">
    {step === 2 && (
      <button
        type="button"
        onClick={() => setStep(1)}
        className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-[#737373] bg-transparent border border-[#262626] hover:border-[#A1A1AA] hover:text-white transition-all duration-200"
      >
        {t("feeds.stepBack")}
      </button>
    )}

    {step === 1 ? (
      <button
        type="button"
        onClick={() => setStep(2)}
        className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/25 hover:bg-[#10B981]/20 hover:border-[#10B981]/50 transition-all duration-200"
      >
        {t("feeds.stepNext")}
      </button>
    ) : (
      <button
        type="submit"
        disabled={isLoading}
        onClick={handleSubmit}
        className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-[#0F0F0F] bg-[#10B981] hover:bg-[#34D399] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
      >
        {isLoading
          ? t("feeds.saving")
          : feed
            ? t("feeds.updateFeed")
            : t("feeds.createFeed")}
      </button>
    )}
  </div>
  );
};
