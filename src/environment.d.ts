/// <reference types="node" />
declare module NodeJS {
  export interface ProcessEnv {
    PORT: string;
    NODE_ENV: "production" | "staging" | "development" | "local";
    DB_HOST: string;
    DB_PORT: string;
    DB_DATABASE: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    JWT_SECRET_KEY: string;
  }
}
