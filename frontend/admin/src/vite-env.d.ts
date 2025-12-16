/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USERNAME?: string;
  readonly VITE_PASSWORD?: string;
  // Add more env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
