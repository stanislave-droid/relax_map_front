"use client";

import css from "./Sign-In.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import type { LoginSchema } from "@/components/auth/LoginForm/LoginForm";
import { login } from "@/lib/api/clientApi";
import LoginForm from "@/components/auth/LoginForm/LoginForm";
import toast from "react-hot-toast";
import { getLoginErrorMessage } from "@/utils/loginErrorMessage";

export const SignIn = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (values: LoginSchema) => {
    setIsLoading(true);

    try {
      const user = await login(values);
      setUser(user);
      toast.success("Ви успішно увійшли!");
      router.push(`/profile/myProfile`);
    } catch (error) {
      toast.error(getLoginErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={css.mainContent}>
      <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
};

export default SignIn;
