import { User } from "@/types/user";
import { axiosClient as api } from "./api";

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>("/users/current");
  return data;
};
