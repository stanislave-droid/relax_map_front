import {axiosClient} from "./api";
import {User} from "@/types/user";
import {RegisterSchema} from "@/components/auth/RegistrationForm/RegistrationForm";


export interface ApiErrorResponse {
    message: string;
    error?: string;
}

export type ApiError = AxiosError<ApiErrorResponse>;


export const register = async (userData: RegisterSchema): Promise<User> => {
    const { data } = await axiosClient.post<User>("/auth/register", userData);
    return data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await axiosClient.get<User>("/users/current");
  return data;
};
