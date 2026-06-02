import { Job } from "@/src/models/job-model";

// export interface Education {
//   school: string;
//   degree: string;
//   duration: string;
//   description?: string;
// }

export interface Experience {
  company: string;
  role: string;
  duration: string;
  description?: string;
}

// export interface ProfileForm {
//   name: string;
//   email: string;
//   website?: string;
//   otherLink?: string;
//   description?: string;
//   skills?: string[];
//   education?: Education[];
//   experience?: Experience[];
//   interests?: string[]
// }

export interface Education {
    institution: string;
    degree: string;
    grade: string; // 0-100
}

export interface SkillItem {
    name: string;
    expertise: number; // 0-5
}

export interface ProfileForm {
    name: string;
    email: string;
    website?: string;
    otherLink?: string;
    description?: string;
    skills?: SkillItem[];
    education?: Education[];
    interests?: string[];
    certificates?: string[];
    experience?: Experience[];
    languages?: string[];
}

export interface ExportPayload {
  profile: ProfileForm;
  job: Job;
}