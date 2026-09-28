"use client";

import css from "./Sign-up.module.css";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {useAuthStore} from "@/lib/store/authStore";
import {AuthResponce, register, ApiError} from "@/lib/api/clientApi";
import RegistrationForm from "@/components/auth/RegistrationForm/RegistrationForm";
import type RegisterSchema from "@/components/auth/RegistrationForm/RegistrationForm";


export const SignUp = () => {
    const router = useRouter();
    const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

    const setUser = useAuthStore((state) => state.setUser);

    const handleSubmit = async (values: RegisterSchema) => {
      setIsLoading(true);

        try {
            const user = await register(values);
          setUser(user);
          router.push(`/profile/${user._id}`);
        } catch (error) {
            const apiError = error as ApiError;
            toast.error(
                apiError.response?.data?.message ?? apiError.message ?? "Не вдалося зареєструватися"
            );
        } finally {
          setIsLoading(false);
        }
    }
    return (
        <>
          <RegistrationForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
          />
        </>
    )
};

export default SignUp;
