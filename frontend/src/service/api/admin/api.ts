import axios from "axios";
import { store } from "../../../utils/redux/app/store";
import { BASE_URL } from "../../../utils/constants/baseUrls";
import {
  loginSuccess,
  logout,
} from "../../../utils/redux/slice/Auth/AdminAuthSlice";
import { refreshAccessToken } from "./apiMethod";
import { toast } from "react-toastify";

export const adminApi = axios.create({
  withCredentials: true,
  baseURL: `${BASE_URL}/`,
});

adminApi.interceptors.request.use(
  async (config) => {
    const state = store.getState();
    const authToken = state.admin?.adminToken;

    if (authToken) {
      config.headers["Authorization"] = `Bearer ${authToken}`;
    }

    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

adminApi.interceptors.response.use(
  (response) => response,
  
  async (error) => {
    const originalRequest = error.config;
console.log(originalRequest._retry,"hdfjdhdjfghj");

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log(originalRequest._retry,'123');

      try {
        const state = store.getState();
        const authRefreshToken = state.admin.adminrefreshToken;

        if (!authRefreshToken) {
          throw new Error("No refresh token available");
        }

        const response = await refreshAccessToken(authRefreshToken);
        console.log(response, 'Token refreshed successfully');

        if (response.token) {
          store.dispatch(loginSuccess({ user: response }));

          const updatedState = store.getState();
          originalRequest.headers["Authorization"] = `Bearer ${updatedState.admin?.adminToken}`;
          
          return adminApi(originalRequest);
        } else {
          throw new Error("Failed to refresh token");
        }
      } catch (refreshError) {
        console.error('Token refresh error:', refreshError);
        toast.error('Session expired. Please log in again.');
        store.dispatch(logout());

        return Promise.reject(refreshError);
      }
    }

    if (error.response && error.response.status === 401) {
      toast.error('Session expired. Please log in again.');
      store.dispatch(logout());
    }

    return Promise.reject(error);
  }
);