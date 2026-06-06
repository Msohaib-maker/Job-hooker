import { ProfileForm } from "../components/ProfileDialog";
import { Job } from "../types";
import { api } from "./api";

export type ExportPayload = {
    profile: ProfileForm;
    job: Job
}
export const filesService = {
    getCoverLetter: async (payload: ExportPayload): Promise<Blob> => {
        const response = await api.post("/generate/coverletter", payload, {
            responseType: 'blob'
        });
        return response.data;
    },
    getCV: async (payload: ExportPayload): Promise<Blob> => {
        const response = await api.post("/generate/cv", payload, {
            responseType: 'blob'
        });
        return response.data;
    },
    getUpworkProposal: async (payload: ExportPayload): Promise<string> => {
        const response = await api.post("/generate/proposalLetter", payload);
        return response.data;
    }
}