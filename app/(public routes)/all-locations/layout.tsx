import clsx from "clsx";
import css from "./layout.module.css";

interface LocationsLayoutProps {
  children: React.ReactNode;
  searchBar: React.ReactNode;
}

export default function LocationsLayout({
  children,
  searchBar,
}: LocationsLayoutProps) {
  return (
    <div className={clsx("container", css.container)}>
      <h1 className={css.title}>Усі місця відпочинку</h1>
      <div className={css.searchBar} aria-label="search/filter bar">
        {searchBar}
      </div>
      <div className={css.locationsGrid} aria-label="locations">
        {children}
      </div>
    </div>
  );
}
