"use client";

import { useState } from "react";
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";
import css from "./HeroBlock.module.css";
import Image from "next/image";

interface HeroBlockProps {
  onSearch: (searchQuery: string) => void;
}

const HeroBlock = ({ onSearch }: HeroBlockProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <section className={css.hero}>
      <Image
        src="/opengraph-image-mob.jpg"
        alt=""
        fill
        priority
        className={`${css.backgroundImage} ${css.mobileImage}`}
      />

      <Image
        src="/opengraph-image-tab.jpg"
        alt=""
        fill
        priority
        className={`${css.backgroundImage} ${css.tabletImage}`}
      />

      <Image
        src="/opengraph-image.jpg"
        alt=""
        fill
        priority
        className={`${css.backgroundImage} ${css.desktopImage}`}
      />
      <div className="container">
        <div className={css.content}>
          <h1 className={`main-heading ${css.title}`}>
            Відкрий для себе Україну. Знайди ідеальне місце для відпочинку
          </h1>

          <p className={css.description}>
            Тисячі перевірених локацій з реальними фото та відгуками від
            мандрівників.
          </p>

          <form className={css.searchForm} onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Введіть назву, тип або регіон..."
              className={css.searchInput}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onSearch(query);
                }
              }}
            />

            <Button
              type="submit"
              variant="primary"
              size="md"
              className={css.searchButton}
            >
              Знайти місце
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroBlock;
