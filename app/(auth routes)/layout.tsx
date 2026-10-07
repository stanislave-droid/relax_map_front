"use client";

import {useRouter} from "next/navigation";
import {useEffect} from "react";
import AuthNav from "@/components/auth/authNav/AuthNav";
import { usePathname } from "next/navigation";
import css from "./layout.module.css"

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = ({children}: AuthLayoutProps) => {
    const pathname = usePathname();
    const activeTab = pathname === "/sign-in" ? "login" : "register";
    const router = useRouter();

    useEffect(() => {
        router.refresh();
    }, [router])

    return (
        <div className={css.authLayout}>
            <AuthNav activeTab={activeTab}/>
            {children}
        </div>
    )
};

export default AuthLayout;
