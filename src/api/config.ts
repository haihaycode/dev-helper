export const MAX_TIME_OUT = 120000;
export const SUCCESS_CODE = 200;
export const DEV: boolean = process.env.NODE_ENV !== "production";
export const HOST: string = DEV
  ? "https://friendly-train-9vvppgpv5qrc795w-5000.app.github.dev"
  : "https://friendly-train-9vvppgpv5qrc795w-5000.app.github.dev";
//ideal-space-carnival-444xxpx4vpp3q4r6.github.dev/
// export const HOST: string = DEV
//   ? "http://localhost:5000"
//   : "http://localhost:5000"; //

export const Domain: string = DEV
  ? "localhost:5000"
  : "https://friendly-train-9vvppgpv5qrc795w-5000.app.github.dev";

export const rapidHost = "rapidapi.com";
