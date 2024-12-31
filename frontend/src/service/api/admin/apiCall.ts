import { ApiError } from "../../../utils/types";
import { adminApi } from "./api";

export const apiCall = async <T>(method: string, url: string, data: T) => {
  try {
    let response;

    if (method === "post") {
      response = await adminApi.post(url, data);
    } else if (method === "get") {
      response = await adminApi.get(url);
    } else if (method === "patch") {
      response = await adminApi.patch(url, data);
    }
    return Promise.resolve(response?.data);
  } catch (error: unknown) {
    const apiError = error as ApiError;
    return Promise.reject(apiError.response.data);
  }
};