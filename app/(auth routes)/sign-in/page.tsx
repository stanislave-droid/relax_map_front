"use client";

import css from "./Sign-In.module.css";
import { useRouter } from "next/navigation"

export const SignIn = () => {

  const router = useRouter();
  const [error, setError] = useState("");




  return <h1>Sign In</h1>;
};

export default SignIn;
