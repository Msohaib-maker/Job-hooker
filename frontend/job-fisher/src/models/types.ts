export type JobType = "remote" | "on_site" | "hybrid" | "contract";

/** Ordered for the feed form; labels come from `feeds.type*` in the dictionary. */
export const JOB_TYPE_VALUES: JobType[] = [
    "remote",
    "on_site",
    "hybrid",
    "contract",
];
