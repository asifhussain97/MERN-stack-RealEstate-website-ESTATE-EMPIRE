import { ApiError } from "../../../utils/types";
import { api } from "./api";

export const apiCall = async <T>(method: string, url: string, data: T) => {
  try {
    let response;

    if (method === "post") {
      response = await api.post(url, data);
    } else if (method === "get") {
      response = await api.get(url);
    } else if (method === "patch") {
      response = await api.patch(url, data);
    }
    return Promise.resolve(response?.data);
  } catch (error: unknown) {
    const apiError = error as ApiError;
    return Promise.reject(apiError.response.data);
  }
};