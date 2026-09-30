import axios from "axios";

export const axiosClientWithCredentials = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: true,
});

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
});
