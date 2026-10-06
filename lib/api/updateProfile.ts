import { axiosClient } from "./api";
import { User } from "@/types/user";

export interface UpdateProfilePayload {
  name?: string;
  avatar?: File;
}

export const updateProfile = async ({
  name,
  avatar,
}: UpdateProfilePayload): Promise<User> => {
  const formData = new FormData();

  if (name) {
    formData.append("name", name);
  }

  if (avatar) {
    formData.append("avatar", avatar);
  }

  const { data } = await axiosClient.patch<User>(
    "/users/current/update",
    formData,
  );

  return data;
};
