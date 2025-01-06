export const MAX_TIME_OUT = 120000;
export const SUCCESS_CODE = 200;
export const DEV: boolean = process.env.NODE_ENV !== "production";
export const HOST: string = DEV
  ? "http://68.183.238.32:8081"
  : "http://68.183.238.32:8081";
// export const HOST: string = DEV ? 'http://localhost:8081' : 'http://localhost:8081'; //

export const Domain: string = DEV
  ? "localhost:8083"
  : "http://68.183.238.32:8083";

export const rapidHost = "rapidapi.com";
