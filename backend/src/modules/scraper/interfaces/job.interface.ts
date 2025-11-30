export type ScrapedNode = {
  text: string; // ALWAYS present
  tag?: string;
  selector?: string;
  attributes?: Record<string, string>;
  [key: string]: any; // allow future optional props
};
