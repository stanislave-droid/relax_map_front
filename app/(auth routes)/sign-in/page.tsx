"use client";

import css from "./Sign-In.module.css";
import LoginForm from "@/components/auth/LoginForm/LoginForm";


export default function SignIn() {

  return (
    <div className={css.mainContent}>
      <LoginForm />
    </div>
  );
};

