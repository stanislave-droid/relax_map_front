"use client"

import clsx from "clsx";
import css from "./page.module.css";
import Icon from "@/components/ui/Icon/Icon";
import RegistrationForm, {RegisterSchema} from "@/components/auth/RegistrationForm/RegistrationForm";

export default function Home() {

    const handleSubmit = async (values: RegisterSchema) => {
        console.log("submit values:", values);
    };

  return (
    <main className={css.main}>
      <div className={clsx("container")}>
        <h1 className={clsx("main-headding")}>
          <Icon name="icon-logo" size={240} />
          Hello world
        </h1>
          <RegistrationForm onSubmit={handleSubmit}></RegistrationForm>
      </div>
    </main>
  );
}
