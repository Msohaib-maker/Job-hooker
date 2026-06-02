


export type JobType = "remote" | "on_site" | "hybrid" | "contract";

export const JOB_TYPES: { label: string; value: JobType }[] = [
    { label: "Remote", value: "remote" },
    { label: "On Site", value: "on_site" },
    { label: "Hybrid", value: "hybrid" },
    { label: "Contract", value: "contract" },
];