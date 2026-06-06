import { useState, useRef, useEffect } from "react";
import {
  User,
  Mail,
  Globe,
  Link2,
  FileText,
  GraduationCap,
  Briefcase,
  ChevronDown,
  X,
  Plus,
  Trash2,
  Loader2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Award,
  Heart,
  Languages,
  Clock,
} from "lucide-react";
import { Job } from "../types";

export const SKILL_OPTIONS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Django",
  "FastAPI",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Docker",
  "Kubernetes",
  "AWS",
  "GCP",
  "Azure",
  "GraphQL",
  "REST APIs",
  "Git",
  "CI/CD",
  "Figma",
  "UI/UX Design",
  "Product Management",
  "Data Analysis",
  "Machine Learning",
  "SQL",
  "TailwindCSS",
  "Vue.js",
];

export interface Duration {
  start: Date;
  end: Date | "Present";
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
interface DurationPickerProps {
  value: Duration;
  onChange: (duration: Duration) => void;
}

export interface Experience {
  company: string;
  role: string;
  duration: Duration;
  description?: string;
}

export interface Education {
  institution: string;
  degree: string;
  duration: Duration;
  grade: string; // 0-100
}

export interface SkillItem {
  name: string;
  expertise: number; // 0-5
}

export interface ProfileForm {
  name: string;
  email: string;
  website: string;
  otherLink: string;
  description: string;
  skills: SkillItem[];
  education: Education[];
  interests: string[];
  certificates: string[];
  languages: string[];
  experience: Experience[];
}

const inputClass = `
  w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#262626]
  text-[#EDEDED] placeholder:text-[#525252] text-sm
  focus:outline-none focus:border-[#C4F029]/50 focus:ring-1 focus:ring-[#C4F029]/30
  transition-all
`;

const labelClass =
  "block text-xs font-medium text-[#737373] mb-1.5 uppercase tracking-wide";

import { LucideIcon } from "lucide-react";
import { Checkbox } from "./Checkbox";

const SectionHeader = ({
  icon: Icon,
  title,
}: {
  icon: LucideIcon;
  title: string;
}) => (
  <div className="flex items-center gap-2 mb-4">
    <Icon className="w-4 h-4 text-[#C4F029]" />
    <span className="text-sm font-semibold text-[#EDEDED]">{title}</span>
    <div className="flex-1 h-px bg-[#262626]" />
  </div>
);

interface ProfileDialogProps {
  job: Job;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ProfileForm) => Promise<void>;
}

const ProfileDialog = ({ open, onClose, onSubmit }: ProfileDialogProps) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<ProfileForm>({
    name: "",
    email: "",
    website: "",
    otherLink: "",
    description: "",
    skills: [],
    education: [],
    interests: [],
    certificates: [],
    languages: [],
    experience: [],
  });

  // Step 1 Temporary states
  const [skillSearch, setSkillSearch] = useState("");
  const [skillOpen, setSkillOpen] = useState(false);
  const skillRef = useRef<HTMLDivElement>(null);

  // Step 2 Tags Temporary items states
  const [interestInput, setInterestInput] = useState("");
  const [certInput, setCertInput] = useState("");
  const [langInput, setLangInput] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredSkills = SKILL_OPTIONS.filter(
    (s) =>
      s.toLowerCase().includes(skillSearch.toLowerCase()) &&
      !form.skills.some((sk) => sk.name === s)
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (skillRef.current && !skillRef.current.contains(e.target as Node))
        setSkillOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const set = (
    field: keyof ProfileForm,
    value: string | string[] | Experience[] | Education[] | SkillItem[]
  ) => setForm((f) => ({ ...f, [field]: value }));

  /* SKILL CONTROLS */
  const addSkill = (skillName: string) => {
    set("skills", [...form.skills, { name: skillName, expertise: 3 }]); // Defaults to 3 stars
    setSkillSearch("");
  };

  const removeSkill = (skillName: string) =>
    set(
      "skills",
      form.skills.filter((s) => s.name !== skillName)
    );

  const updateSkillExpertise = (index: number, level: number) => {
    const updated = [...form.skills];
    updated[index].expertise = level;
    set("skills", updated);
  };

  /* EDUCATION CONTROLS */
  const addEducation = () =>
    set("education", [
      ...form.education,
      {
        institution: "",
        degree: "",
        grade: "",
        duration: { start: new Date(), end: new Date() },
      },
    ]);

  const updateEducation = (
    i: number,
    field: keyof Education,
    value: string | Duration
  ) => {
    const updated = [...form.education];

    if (field === "grade" && typeof value === "string") {
      const val = value.replace(/\D/g, "");
      if (val !== "" && (parseInt(val) < 0 || parseInt(val) > 100)) return;
      updated[i] = { ...updated[i], grade: val };
    } else if (field === "duration" && typeof value !== "string") {
      updated[i] = { ...updated[i], duration: value };
    } else if (typeof value === "string") {
      updated[i] = { ...updated[i], [field]: value };
    }

    set("education", updated);
  };

  const removeEducation = (i: number) =>
    set(
      "education",
      form.education.filter((_, idx) => idx !== i)
    );

  const addExperience = () =>
    setForm((f) => ({
      ...f,
      experience: [
        ...(f.experience ?? []),
        {
          company: "",
          role: "",
          duration: { start: new Date(), end: new Date() },
          description: "",
        },
      ],
    }));

  const removeExperience = (i: number) =>
    setForm((f) => ({
      ...f,
      experience: f.experience.filter((_, idx) => idx !== i),
    }));

  const updateExperience = (
    i: number,
    field: keyof Experience,
    value: string | Duration
  ) =>
    setForm((f) => ({
      ...f,
      experience: f.experience.map((exp, idx) =>
        idx === i ? { ...exp, [field]: value } : exp
      ),
    }));

  /* ARRAY TAG CONSTRUCTORS (Interests, Certificates, Languages) */
  const addTagItem = (
    field: "interests" | "certificates" | "languages",
    value: string,
    clearInput: () => void
  ) => {
    if (!value.trim()) return;
    set(field, [...form[field], value.trim()]);
    clearInput();
  };

  const removeTagItem = (
    field: "interests" | "certificates" | "languages",
    index: number
  ) => {
    set(
      field,
      form[field].filter((_, idx) => idx !== index)
    );
  };

  /* STEP VALIDATIONS */
  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.description.trim()) e.description = "Description is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (form.skills.length === 0)
      e.skills = "Select at least one skill & level";

    // Basic range check validation for education grades if written
    form.education.forEach((edu, idx) => {
      if (edu.grade && (parseInt(edu.grade) < 0 || parseInt(edu.grade) > 100)) {
        e[`edu_${idx}`] = "Grade must be between 0 and 100";
      }
    });

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;
    setIsLoading(true);
    try {
      await onSubmit(form);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-[#111111] border border-[#262626] rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#262626]">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-[#EDEDED]">Your Profile</h2>
              <span className="text-xs bg-[#262626] text-[#A1A1AA] px-2 py-0.5 rounded-full font-medium">
                Step {step} of 2
              </span>
            </div>
            <p className="text-xs text-[#525252] mt-0.5">
              Used by AI to generate customized artifacts
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#262626] text-[#737373] hover:text-[#EDEDED] hover:border-[#525252] transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Content Window */}
        <div className="overflow-y-auto px-8 py-6 flex flex-col gap-8">
          {step === 1 ? (
            <>
              {/* BASIC INFO */}
              <section>
                <SectionHeader icon={User} title="Basic Info" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>
                      Name <span className="text-[#C4F029]">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#525252]" />
                      <input
                        className={`${inputClass} pl-10 ${errors.name ? "border-red-500/50" : ""}`}
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelClass}>Contact Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#525252]" />
                      <input
                        type="email"
                        className={`${inputClass} pl-10`}
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Website</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#525252]" />
                      <input
                        className={`${inputClass} pl-10`}
                        placeholder="https://yoursite.com"
                        value={form.website}
                        onChange={(e) => set("website", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Other Link</label>
                    <div className="relative">
                      <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#525252]" />
                      <input
                        className={`${inputClass} pl-10`}
                        placeholder="GitHub, LinkedIn, etc."
                        value={form.otherLink}
                        onChange={(e) => set("otherLink", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* DESCRIPTION */}
              <section>
                <SectionHeader icon={FileText} title="Description" />
                <label className={labelClass}>
                  About you <span className="text-[#C4F029]">*</span>
                </label>
                <textarea
                  rows={5}
                  className={`${inputClass} resize-none ${errors.description ? "border-red-500/50" : ""}`}
                  placeholder="Briefly describe yourself, your architectural specialties, background, and career ambitions..."
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                />
                {errors.description && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.description}
                  </p>
                )}
              </section>
            </>
          ) : (
            <>
              {/* WORK EXPERIENCE */}
              <section>
                <SectionHeader icon={Briefcase} title="Work Experience" />
                <div className="flex flex-col gap-3">
                  {form.experience.map((exp, i) => (
                    <div
                      key={i}
                      className="bg-[#1A1A1A] border border-[#262626] rounded-xl p-4 flex flex-col gap-3"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          className={inputClass}
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) =>
                            updateExperience(i, "company", e.target.value)
                          }
                        />
                        <input
                          className={inputClass}
                          placeholder="Role / Title"
                          value={exp.role}
                          onChange={(e) =>
                            updateExperience(i, "role", e.target.value)
                          }
                        />
                      </div>
                      <DurationPicker
                        value={exp.duration}
                        onChange={(duration) =>
                          updateExperience(i, "duration", duration)
                        }
                      />
                      <textarea
                        className={`${inputClass} resize-y min-h-[68px]`}
                        placeholder="Description (optional)"
                        value={exp.description ?? ""}
                        onChange={(e) =>
                          updateExperience(i, "description", e.target.value)
                        }
                      />
                      <button
                        onClick={() => removeExperience(i)}
                        className="self-end flex items-center gap-1 text-xs text-red-400/70 hover:text-red-400 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addExperience}
                    className="flex items-center gap-2 text-sm text-[#737373] hover:text-[#C4F029] transition w-max"
                  >
                    <Plus className="w-4 h-4" /> Add Experience
                  </button>
                </div>
              </section>

              {/* EDUCATION */}
              <section>
                <SectionHeader icon={GraduationCap} title="Education" />
                <div className="flex flex-col gap-3">
                  {form.education.map((edu, i) => (
                    <div
                      key={i}
                      className="bg-[#1A1A1A] border border-[#262626] rounded-xl p-5 flex flex-col gap-4"
                    >
                      {/* Top Row: Core Data Fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <input
                            className={inputClass}
                            placeholder="Institution"
                            value={edu.institution}
                            onChange={(e) =>
                              updateEducation(i, "institution", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <input
                            className={inputClass}
                            placeholder="Degree"
                            value={edu.degree}
                            onChange={(e) =>
                              updateEducation(i, "degree", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <input
                            className={inputClass}
                            placeholder="Grade (0-100)"
                            value={edu.grade}
                            type="text"
                            maxLength={3}
                            onChange={(e) =>
                              updateEducation(i, "grade", e.target.value)
                            }
                          />
                          {errors[`edu_${i}`] && (
                            <p className="text-red-400 text-[10px] mt-1">
                              {errors[`edu_${i}`]}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Bottom Row: Explicitly spanned Picker & Action Controls */}
                      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-1 border-t border-[#262626]/40">
                        <div className="w-full">
                          <DurationPicker
                            value={edu.duration}
                            onChange={(duration) =>
                              updateEducation(i, "duration", duration)
                            }
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => removeEducation(i)}
                        className="flex items-center gap-1.5 text-xs text-red-400/60 hover:text-red-400 transition h-max self-end sm:self-auto pb-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={addEducation}
                    className="flex items-center gap-2 text-sm text-[#737373] hover:text-[#C4F029] transition w-max mt-1"
                  >
                    <Plus className="w-4 h-4" /> Add Education
                  </button>
                </div>
              </section>

              {/* SKILLS SET WITH EXPERTISE RATINGS */}
              <section>
                <SectionHeader icon={Briefcase} title="Skills & Expertise" />
                <label className={labelClass}>
                  Add Professional Skills{" "}
                  <span className="text-[#C4F029]">*</span>
                </label>
                <div ref={skillRef} className="relative mb-4">
                  <div
                    className={`min-h-[48px] w-full px-4 py-2 rounded-xl bg-[#1A1A1A] border cursor-text flex flex-wrap gap-1.5 items-center transition-all
                                        ${skillOpen ? "border-[#C4F029]/50 ring-1 ring-[#C4F029]/30" : errors.skills ? "border-red-500/50" : "border-[#262626]"}`}
                    onClick={() => setSkillOpen(true)}
                  >
                    <input
                      className="flex-1 min-w-[150px] bg-transparent text-sm text-[#EDEDED] placeholder:text-[#525252] outline-none"
                      placeholder="Type or select skills..."
                      value={skillSearch}
                      onChange={(e) => {
                        setSkillSearch(e.target.value);
                        setSkillOpen(true);
                      }}
                      onFocus={() => setSkillOpen(true)}
                    />
                    <ChevronDown
                      className={`w-4 h-4 text-[#525252] transition-transform ${skillOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                  {skillOpen && filteredSkills.length > 0 && (
                    <div className="absolute z-20 mt-1 w-full bg-[#1A1A1A] border border-[#262626] rounded-xl shadow-xl overflow-hidden">
                      <div className="max-h-40 overflow-y-auto">
                        {filteredSkills.map((skill) => (
                          <button
                            key={skill}
                            className="w-full text-left px-4 py-2 text-sm text-[#A1A1AA] hover:bg-[#262626] hover:text-[#EDEDED] transition"
                            onClick={() => addSkill(skill)}
                          >
                            {skill}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {errors.skills && (
                  <p className="text-red-400 text-xs mb-3">{errors.skills}</p>
                )}

                {/* Render Selected Skills Matrix (0-5 Level sliders) */}
                {form.skills.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#161616] p-4 rounded-xl border border-[#262626]">
                    {form.skills.map((item, idx) => (
                      <div
                        key={item.name}
                        className="flex flex-col gap-1.5 p-2 bg-[#1A1A1A] rounded-lg border border-[#262626]"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-semibold text-[#EDEDED]">
                            {item.name}
                          </span>
                          <button
                            onClick={() => removeSkill(item.name)}
                            className="text-[#525252] hover:text-red-400 transition"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min="0"
                            max="5"
                            step="1"
                            value={item.expertise}
                            onChange={(e) =>
                              updateSkillExpertise(
                                idx,
                                parseInt(e.target.value)
                              )
                            }
                            className="w-full h-1 bg-[#262626] rounded-lg appearance-none cursor-pointer accent-[#C4F029]"
                          />
                          <span className="text-[11px] font-mono font-bold text-[#C4F029] bg-[#C4F029]/10 px-1.5 py-0.5 rounded">
                            {item.expertise}/5
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* INTERESTS */}
              <section>
                <SectionHeader icon={Heart} title="Interests" />
                <div className="flex gap-2 mb-3">
                  <input
                    className={inputClass}
                    placeholder="e.g. Open Source, Cloud Architecture, Quantum Computing"
                    value={interestInput}
                    onChange={(e) => setInterestInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      addTagItem("interests", interestInput, () =>
                        setInterestInput("")
                      )
                    }
                  />
                  <button
                    onClick={() =>
                      addTagItem("interests", interestInput, () =>
                        setInterestInput("")
                      )
                    }
                    className="px-4 rounded-xl bg-[#262626] hover:bg-[#323232] text-sm text-[#EDEDED] border border-[#383838]"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.interests.map((interest, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1.5 bg-[#262626] text-xs text-[#EDEDED] px-3 py-1 rounded-full border border-[#383838]"
                    >
                      {interest}
                      <button
                        onClick={() => removeTagItem("interests", i)}
                        className="text-[#737373] hover:text-red-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </section>

              {/* CERTIFICATES */}
              <section>
                <SectionHeader icon={Award} title="Certificates" />
                <div className="flex gap-2 mb-3">
                  <input
                    className={inputClass}
                    placeholder="e.g. AWS Certified Solutions Architect, PMP"
                    value={certInput}
                    onChange={(e) => setCertInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      addTagItem("certificates", certInput, () =>
                        setCertInput("")
                      )
                    }
                  />
                  <button
                    onClick={() =>
                      addTagItem("certificates", certInput, () =>
                        setCertInput("")
                      )
                    }
                    className="px-4 rounded-xl bg-[#262626] hover:bg-[#323232] text-sm text-[#EDEDED] border border-[#383838]"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.certificates.map((cert, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1.5 bg-[#262626] text-xs text-[#EDEDED] px-3 py-1 rounded-full border border-[#383838]"
                    >
                      {cert}
                      <button
                        onClick={() => removeTagItem("certificates", i)}
                        className="text-[#737373] hover:text-red-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </section>

              {/* LANGUAGES */}
              <section>
                <SectionHeader icon={Languages} title="Languages" />
                <div className="flex gap-2 mb-3">
                  <input
                    className={inputClass}
                    placeholder="e.g. English (Fluent), Spanish (Native)"
                    value={langInput}
                    onChange={(e) => setLangInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      addTagItem("languages", langInput, () => setLangInput(""))
                    }
                  />
                  <button
                    onClick={() =>
                      addTagItem("languages", langInput, () => setLangInput(""))
                    }
                    className="px-4 rounded-xl bg-[#262626] hover:bg-[#323232] text-sm text-[#EDEDED] border border-[#383838]"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.languages.map((lang, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1.5 bg-[#262626] text-xs text-[#EDEDED] px-3 py-1 rounded-full border border-[#383838]"
                    >
                      {lang}
                      <button
                        onClick={() => removeTagItem("languages", i)}
                        className="text-[#737373] hover:text-red-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>

        {/* Footer Controls */}
        <div className="flex items-center justify-between px-8 py-5 border-t border-[#262626]">
          <div>
            {step === 2 && (
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-[#737373] hover:text-[#EDEDED] transition"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm text-[#737373] hover:text-[#EDEDED] border border-[#262626] hover:border-[#525252] transition"
            >
              Cancel
            </button>

            {step === 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-[#262626] text-[#EDEDED] hover:bg-[#323232] transition"
              >
                Next Step <ArrowRight className="w-4 h-4 text-[#C4F029]" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-[#C4F029] text-[#0F0F0F] hover:bg-[#D4FF39] active:scale-[0.98] transition disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <></>
                    <Loader2 className="w-4 h-4 animate-spin" /> Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Generate
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDialog;

export function DurationPicker({ value, onChange }: DurationPickerProps) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const years = Array.from(
    { length: currentYear - 1969 },
    (_, i) => currentYear + 1 - i
  );

  const isPresent = value.end === "Present";

  const startDate = value.start instanceof Date ? value.start : new Date();
  const endDate =
    !isPresent && value.end instanceof Date ? value.end : new Date();

  const update = (
    patch: Partial<{
      startM: number;
      startY: number;
      endM: number;
      endY: number;
      present: boolean;
    }>
  ) => {
    const startM = "startM" in patch ? patch.startM! : startDate.getMonth();
    const startY = "startY" in patch ? patch.startY! : startDate.getFullYear();
    const present = "present" in patch ? patch.present! : isPresent;
    const endM = "endM" in patch ? patch.endM! : endDate.getMonth();
    const endY = "endY" in patch ? patch.endY! : endDate.getFullYear();

    onChange({
      start: new Date(startY, startM, 1),
      end: present ? "Present" : new Date(endY, endM, 1),
    });
  };

  return (
    <div className="flex gap-3 items-start">
      {/* Start */}
      <div className="flex flex-col gap-1 flex-1">
        <span className="text-xs text-gray-500 font-medium">Start</span>
        <div className="flex gap-1">
          <select
            className={inputClass}
            value={startDate.getMonth()}
            onChange={(e) => update({ startM: +e.target.value })}
          >
            {MONTHS.map((m, i) => (
              <option key={m} value={i}>
                {m}
              </option>
            ))}
          </select>
          <select
            className={inputClass}
            value={startDate.getFullYear()}
            onChange={(e) => update({ startY: +e.target.value })}
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      <span className="pt-7 text-gray-400">→</span>

      {/* End */}
      <div className="flex flex-col gap-1 flex-1">
        <span className="text-xs text-gray-500 font-medium">End</span>
        <div className="flex gap-1">
          <select
            className={inputClass}
            value={endDate.getMonth()}
            disabled={isPresent}
            onChange={(e) => update({ endM: +e.target.value })}
          >
            {MONTHS.map((m, i) => (
              <option key={m} value={i}>
                {m}
              </option>
            ))}
          </select>
          <select
            className={inputClass}
            value={endDate.getFullYear()}
            disabled={isPresent}
            onChange={(e) => update({ endY: +e.target.value })}
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <Checkbox
          label="Present"
          checked={isPresent}
          onChange={(val) => update({ present: val })}
          icon={<Clock className="w-3.5 h-3.5 text-[#C4F029]" />}
        />
        {/* <label className="flex items-center gap-1.5 text-sm text-gray-500 cursor-pointer">
          <input
            type="checkbox"
            checked={isPresent}
            onChange={(e) => update({ present: e.target.checked })}
          />
          Present
        </label> */}
      </div>
    </div>
  );
}
