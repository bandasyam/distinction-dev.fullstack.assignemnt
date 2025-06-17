import axios, { AxiosRequestConfig } from "axios";

export const ip = "http://127.0.0.1:3001";
export const callApi = async (url: string, method: string, data: any = null, params: any = null, headers: any = null) => {
  try {
    const config: AxiosRequestConfig = {
      method,
      url,
      headers,
      data,
      params,
    };

    const response = await axios(config);
    return response;
  } catch (e) {
    throw e;
  }
};
