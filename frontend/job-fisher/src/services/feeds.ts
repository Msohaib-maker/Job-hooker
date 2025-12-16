import { api } from "./api";
import type { Feed, CreateFeedDto } from "../types";

export const feedService = {
  getFeeds: async (): Promise<Feed[]> => {
    const response = await api.get("/feeds/me");
    return response.data;
  },
  createFeed: async (feed: CreateFeedDto): Promise<Feed> => {
    const response = await api.post("/feeds", feed);
    return response.data;
  },
  updateFeed: async (
    id: number,
    feed: Partial<CreateFeedDto>
  ): Promise<Feed> => {
    const response = await api.post(`/feeds/update/${id}`, feed);
    return response.data;
  },
  deleteFeed: async (id: number): Promise<void> => {
    await api.delete(`/feeds/${id}`);
  },
};
