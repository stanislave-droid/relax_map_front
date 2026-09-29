"use client";

import css from "./Sign-In.module.css";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {useAuthStore} from "@/lib/store/authStore";
import type {LoginSchema} from "@/components/auth/LoginForm/LoginForm";
import {login, ApiError} from "@/lib/api/clientApi"
import LoginForm from "@/components/auth/LoginForm/LoginForm";
import toast from "react-hot-toast";


export const SignIn = () => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const setUser = useAuthStore((state) => state.setUser);

    const handleSubmit = async (values: LoginSchema) => {
        setIsLoading(true);

        try {
            const user = await login(values);
            setUser(user);
            router.push(`/profile/${user._id}`);
        } catch (error) {
            const apiError = error as ApiError;
            const message = apiError.response?.status === 401
                ? "Невірний email або пароль"
                : apiError.response?.data?.message ?? apiError.message ?? "Не вдалось увійти";
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className={css.mainContent}>
            <LoginForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
            />
        </div>
    )
};

export default SignIn;
