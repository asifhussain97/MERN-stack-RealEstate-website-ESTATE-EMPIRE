import axios from "axios";

import { BASE_URL } from "../../../utils/constants/baseUrls";

export const api = axios.create({
  withCredentials: true,
  baseURL: `${BASE_URL}/`,
});



console.log("config");