"use client";

import { useState } from "react";
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";
import css from "./HeroBlock.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LOCATIONS_PATH } from "@/types/location";

const HeroBlock = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const search = query.trim();

    if (search) {
      router.push(`${LOCATIONS_PATH}?search=${decodeURIComponent(search)}`);
    }
  };

  return (
    <section className={css.hero}>
      <Image
        src="/opengraph-image.jpg"
        alt=""
        fill
        priority
        loading="eager"
        className={css.backgroundImage}
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
