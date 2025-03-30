export const DEV: boolean = process.env.NODE_ENV !== "production";
// export const HOST: string = DEV
//   ? "http://localhost:5000"
//   : "https://dev-helper-backend.vercel.app";
export const HOST = "https://dev-helper-backend.vercel.app";

export const Domain: string = DEV
  ? "localhost:5000"
  : "https://dev-helper-backend.vercel.app";
export const rapidHost = "rapidapi.com";

export const MAX_TIME_OUT = 70000;
export const SUCCESS_CODE = {
  "200": 200, // OK
  "201": 201, // Created
  "204": 204, // No Content
  "206": 206, // Partial Content
  "207": 207, // Multi-Status
  "226": 226, // IM Used
};
export const ERROR_CODE = {
  "400": 400, // Bad Request
  "401": 401, // Unauthorized
  "402": 402, // Payment Required
  "403": 403, // Forbidden
  "404": 404, // Not Found
  "405": 405, // Method Not Allowed
  "406": 406, // Not Acceptable
  "407": 407, // Proxy Authentication Required
  "408": 408, // Request Timeout
  "409": 409, // Conflict
  "410": 410, // Gone
  "411": 411, // Length Required
  "412": 412, // Precondition Failed
  "413": 413, // Payload Too Large
  "414": 414, // URI Too Long
  "415": 415, // Unsupported Media Type
  "416": 416, // Range Not Satisfiable
  "417": 417, // Expectation Failed
  "418": 418, // I'm a teapot (RFC 2324)
  "422": 422, // Unprocessable Entity (WebDAV)
  "423": 423, // Locked (WebDAV)
  "424": 424, // Failed Dependency (WebDAV)
  "425": 425, // Too Early
  "426": 426, // Upgrade Required
  "428": 428, // Precondition Required
  "429": 429, // Too Many Requests
  "431": 431, // Request Header Fields Too Large
  "451": 451, // Unavailable For Legal Reasons
  "500": 500, // Internal Server Error
  "501": 501, // Not Implemented
  "502": 502, // Bad Gateway
  "503": 503, // Service Unavailable
  "504": 504, // Gateway Timeout
  "505": 505, // HTTP Version Not Supported
  "507": 507, // Insufficient Storage (WebDAV)
  "508": 508, // Loop Detected (WebDAV)
  "510": 510, // Not Extended
  "511": 511, // Network Authentication Required
};

export const MAX_REQUESTS = 7; // Số lần request tối đa trong 5 giây
export const THROTTLE_DELAY = 3000;
export const BLOCK_TIME = DEV ? 15000 : 120000; //dev 30s , production 2p

// API paths
export const api = {
  api: "/api",
  auth: {
    user: {
      getAll: "/auth/users",
      getOne: "/auth/users",
      create: "/auth/register",
      update: "/auth/users",
      delete: "/auth/users",
      login: "/auth/login",
      register: "/auth/register",
      refreshToken: "/auth/refresh-token",
      sendOtp: "/auth/send-otp",
      getCurrentUser: "/auth/current-user",
      updateAvatar: "/auth/update-avatar",
    },
  },
  vocabulary: {
    getAll: "/vocabularies",
    getOne: "/vocabulary",
    create: "/vocabulary",
    update: "/vocabulary",
    delete: "/vocabulary",
    special: "/vocabulary/special",
  },
};

export const getApiUrl = (path: string): string => {
  return `${HOST}${api.api}${path}`;
};
export const getPath = (path: string): string => {
  return `${api.api}${path}`;
};

export const urls = {
  getAllUsers: getApiUrl(api.auth.user.getAll),
  getOneUser: getApiUrl(api.auth.user.getOne),
  createUser: getApiUrl(api.auth.user.create),
  updateUser: getApiUrl(api.auth.user.update),
  deleteUser: getApiUrl(api.auth.user.delete),
  loginUser: getApiUrl(api.auth.user.login),
  registerUser: getApiUrl(api.auth.user.register),
  refreshToken: getApiUrl(api.auth.user.refreshToken),
  sendOtp: getApiUrl(api.auth.user.sendOtp),
  getCurrentUser: getApiUrl(api.auth.user.getCurrentUser),
  updateAvatar: getApiUrl(api.auth.user.updateAvatar),
  getAllVocabularies: getApiUrl(api.vocabulary.getAll),
  getOneVocabulary: getApiUrl(api.vocabulary.getOne),
  createVocabulary: getApiUrl(api.vocabulary.create),
  updateVocabulary: getApiUrl(api.vocabulary.update),
  deleteVocabulary: getApiUrl(api.vocabulary.delete),
};
