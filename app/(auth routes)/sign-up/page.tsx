"use client";

import css from "./Sign-up.module.css";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {useAuthStore} from "@/lib/store/authStore";
import {register, ApiError} from "@/lib/api/clientApi";
import RegistrationForm from "@/components/auth/RegistrationForm/RegistrationForm";
import type {RegisterSchema} from "@/components/auth/RegistrationForm/RegistrationForm";
import toast from "react-hot-toast";


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
            const message = apiError.response?.data?.message ?? apiError.message ?? "Не вдалося зареєструватися";
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className={css.mainContent}>
            <RegistrationForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
            />
        </div>
    )
};

export default SignUp;
