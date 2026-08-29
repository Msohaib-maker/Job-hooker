// useFeedForm.ts
import { useState, useEffect } from "react";
import { countries } from "countries-list";
import { CreateFeedDto } from "../types";
import { DropdownOption } from "../components/DropDown";
import { JobRole, ROLES } from "../models/enums";
import { JobType } from "../models/types";
import { SalaryType, Platform } from "../types/job.type";
import type { TranslationKey } from "../i18n";

interface UseFeedFormProps {
    feed?: (CreateFeedDto & { id?: number }) | null;
}

export const useFeedForm = ({ feed }: UseFeedFormProps) => {
    const [title, setTitle] = useState<JobRole>("AI/ML Researcher");
    const [exp, setExp] = useState("0");
    const [type, setType] = useState<JobType>("remote");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    const [currency, setCurrency] = useState("USD");
    const [tags, setTags] = useState<string[]>([]);
    const [salaryType, setSalaryType] = useState<SalaryType>("Fixed");
    const [platforms, setPlatforms] = useState<Platform[]>([]);
    const [step, setStep] = useState<number>(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Derived / static data
    const salaryTypes: SalaryType[] = ["Fixed", "Hourly"];
    const COUNTRIES = Object.values(countries).map((c) => c.name).sort();
    const jobRoleOptions: DropdownOption<JobRole>[] = ROLES.map((role) => ({
        value: role,
        label: role,
    }));

    useEffect(() => {
        if (feed) {
            setTitle((feed.title as JobRole) ?? "AI/ML Researcher");
            setExp(feed.exp || "");
            setType(feed.type || "remote");
            setLocation(feed.location || "");
            setSalary(feed.salary?.toString() || "");
            setTags(feed.tags.split(","));
            setCurrency(feed.salaryCurrency);
            setSalaryType(feed.salaryType);
            setPlatforms(feed.platforms.split(",") as Platform[]);
        } else {
            setTitle("AI/ML Researcher");
            setExp("0");
            setType("remote");
            setLocation("");
            setSalary("5000");
            setTags([]);
            setCurrency("USD");
            setPlatforms([]);
            setSalaryType("Fixed");
        }
        setStep(1);
        setError("");
    }, [feed]);

    useEffect(() => {
        if (feed && feed.salaryType === salaryType && feed.salary !== 0) {
            setSalary(feed.salary.toString())
            return
        }
        switch (salaryType) {
            case "Fixed":
                setSalary("5000")
                break
            case "Hourly":
                setSalary("10")
                break
        }


    }, [salaryType]);

    const toggleTag = (tag: string) => {
        setTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const setPlatformList = (value: Platform) => {
        setPlatforms((prev) =>
            prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value]
        );
    };

    /** Returns the translation key of the first failing rule, or null. */
    const validate = (): TranslationKey | null => {
        if (!title.trim()) return "feeds.errorTitle";
        if (!exp.trim()) return "feeds.errorExperience";
        if (!location.trim()) return "feeds.errorLocation";
        const salaryNum = parseFloat(salary);
        if (!salary.trim() || isNaN(salaryNum) || salaryNum < 0)
            return "feeds.errorSalary";
        return null;
    };

    const buildSubmitPayload = () => ({
        title: title.trim(),
        exp: exp.trim(),
        type,
        location: location.trim(),
        salary: parseFloat(salary),
        salaryCurrency: currency,
        tags: tags.join(","),
        salaryType,
        platforms: platforms.join(","),
    });

    return {
        // State
        title, setTitle,
        exp, setExp,
        type, setType,
        location, setLocation,
        salary, setSalary,
        currency, setCurrency,
        tags,
        salaryType, setSalaryType,
        platforms,
        step, setStep,
        isLoading, setIsLoading,
        error, setError,
        // Derived
        salaryTypes,
        COUNTRIES,
        jobRoleOptions,
        // Actions
        toggleTag,
        setPlatformList,
        validate,
        buildSubmitPayload,
    };
};