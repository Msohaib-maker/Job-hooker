import { api } from "./api";

export type SubscribeResponse = {
  success: boolean;
  subsciption: boolean;
  message: string;
};

export const subscribeApi = {
  subscribe: async (): Promise<SubscribeResponse> => {
    const res = await api.post("/email/subscription");
    return res.data;
  },
};
