import { User, UserResponse } from "@/models/user";
import store from "@/store";
import i18n from "@/services/i18n";
import { getCurrentUser } from "@/api/userApi";

export const setToken = (accessToken: string, refreshToken: string) => {
  store.dispatch("auth/setToken", accessToken);
  store.dispatch("auth/setRefreshToken", refreshToken);
};

export const getToken = () => {
  return store.getters["auth/token"];
};
export const getRefreshToken = () => {
  return store.getters["auth/refreshToken"];
};
export const getUser = async (): Promise<User | null> => {
  try {
    const userResponse: UserResponse = await getCurrentUser();
    const user = (userResponse.data as User) || null;
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const logout = () => {
  store.dispatch("auth/logout");
};

export const getRole = () => {
  const user: User = store.getters["auth/user"];
  switch (user?.role) {
    case "admin":
      return i18n.global.t("role.admin");
    case "user":
      return i18n.global.t("role.user");
    default:
      return "i18n.role.unknown";
  }
};
