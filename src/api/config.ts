export const MAX_TIME_OUT = 120000;
export const SUCCESS_CODE = 200;
export const DEV: boolean = process.env.NODE_ENV !== "production";
export const HOST: string = DEV
  ? "https://ideal-space-carnival-444xxpx4vpp3q4r6-5000.app.github.dev"
  : "https://ideal-space-carnival-444xxpx4vpp3q4r6-5000.app.github.dev";
// export const HOST: string = DEV
//   ? "http://localhost:5000"
//   : "http://localhost:5000"; //

export const Domain: string = DEV
  ? "localhost:5000"
  : "http://68.183.238.32:8083";

export const rapidHost = "rapidapi.com";
