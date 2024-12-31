import { ApiError } from "../../../utils/types";
import { agentApi } from "./api";

export const apiCall = async <T>(method: string, url: string, data: T) => {
  try {
    let response;

    if (method === "post") {
      response = await agentApi.post(url, data);
    } else if (method === "get") {
      response = await agentApi.get(url);
    } else if (method === "patch") {
      response = await agentApi.patch(url, data);
    }
    else if (method === "put") {
      response = await agentApi.put(url, data);
    }
    return Promise.resolve(response?.data);
  } catch (error: unknown) {
    const apiError = error as ApiError;
    return Promise.reject(apiError.response.data);
  }
};