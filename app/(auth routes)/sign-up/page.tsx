"use client";

import css from "./Sign-up.module.css";
import RegistrationForm from "@/components/auth/RegistrationForm/RegistrationForm";


export default function SignUp () {
  return (
    <div className={css.mainContent}>
      <RegistrationForm />
    </div>
  );
};
