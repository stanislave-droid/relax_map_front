import clsx from "clsx";
import css from "./page.module.css";
import Icon from "@/components/ui/Icon/Icon";
import AdvantagesBlock from "@/components/sections/AdvantagesBlock/AdvantagesBlock";

export default function Home() {
  return (
    <main className={css.main}>
      <div className={clsx("container")}>
        <h1 className={clsx("main-headding")}>
          <Icon name="logo" width={129} height={36} />
          Hello world
        </h1>
      </div>
      <AdvantagesBlock />
    </main>
  );
}
