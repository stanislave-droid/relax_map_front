import { getMe } from "@/lib/api/serverApi";
import css from "./CreateLocationsPage.module.css";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import clsx from "clsx";
import { isAxiosError } from "axios";
export const metadata: Metadata = {
  title: "Додати нову локацію — RelaxMap",
  openGraph: {
    title: "Додати нову локацію — RelaxMap",
  },
};

export default async function AddLocationPage() {
  try {
    await getMe();
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      redirect("/sign-in?redirectTo=/locations/add");
    }
    throw error;
  }
  return (
    <main className={css.createLocationsSect}>
      <div className="container">
        <h1 className={clsx("main-headding", css.title)}>
          Додавання нового місця
        </h1>
        <div className={css.formWrapper}>{/* компонент форми */}</div>
      </div>
    </main>
  );
}
