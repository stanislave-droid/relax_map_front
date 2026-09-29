"use client";

import {useRouter} from "next/navigation";
import {useEffect} from "react";
import AuthNav from "@/components/auth/authNav/AuthNav";
import { usePathname } from "next/navigation";

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
        <>
            <AuthNav activeTab={activeTab}/>
            {children}
        </>
    )
};

export default AuthLayout;
