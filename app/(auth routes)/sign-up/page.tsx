"use client";

import css from "./Sign-up.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { register } from "@/lib/api/clientApi";
import RegistrationForm from "@/components/auth/RegistrationForm/RegistrationForm";
import type { RegisterSchema } from "@/components/auth/RegistrationForm/RegistrationForm";
import toast from "react-hot-toast";
import { getRegisterErrorMessage } from "@/utils/registerErrorMessage";

export const SignUp = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (values: RegisterSchema) => {
    setIsLoading(true);

    try {
      const user = await register(values);
      setUser(user);
      toast.success("Ви успішно зареєструвались!");
      router.push(`/profile/myProfile`);
    } catch (error) {
      toast.error(getRegisterErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={css.mainContent}>
      <RegistrationForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
};

export default SignUp;
