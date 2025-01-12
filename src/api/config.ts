export const MAX_TIME_OUT = 120000;
export const SUCCESS_CODE = 200;
export const DEV: boolean = process.env.NODE_ENV !== "production";
export const HOST: string = DEV
  ? "http://localhost:5000"
  : "https://dev-helper-backend.vercel.app";
// export const HOST = "https://dev-helper-backend.vercel.app";

export const Domain: string = DEV
  ? "localhost:5000"
  : "https://dev-helper-backend.vercel.app";

export const rapidHost = "rapidapi.com";
