export const MAX_TIME_OUT = 70000;
export const SUCCESS_CODE = 200;
export const DEV: boolean = process.env.NODE_ENV !== "production";
// export const HOST: string = DEV
//   ? "http://localhost:5000"
//   : "https://dev-helper-backend.vercel.app";
export const HOST = "https://dev-helper-backend.vercel.app";

export const Domain: string = DEV
  ? "localhost:5000"
  : "https://dev-helper-backend.vercel.app";
export const rapidHost = "rapidapi.com";

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
