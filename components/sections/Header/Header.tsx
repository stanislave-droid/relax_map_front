"use client";

import { useState } from "react";
import Link from "@/components/ui/Link/Link";
import Icon from "@/components/ui/Icon/Icon";
import css from "./Header.module.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link
          href="/"
          className={css.logo}
          aria-label="На головну"
          onClick={closeMenu}
        >
          <Icon name="logo" width={129} height={36} />
        </Link>

        <nav className={css.nav} aria-label="Основна навігація">
          <Link href="/" className={css.navLink}>
            Головна
          </Link>
          <Link href="/locations" className={css.navLink}>
            Місця відпочинку
          </Link>
        </nav>

        <div className={css.actions}>
          <Link
            href="/login"
            variant="ghost"
            size="md"
            className={css.loginLink}
          >
            Вхід
          </Link>
          <Link
            href="/register"
            variant="primary"
            size="md"
            className={css.registerLink}
          >
            Реєстрація
          </Link>

          <button
            type="button"
            className={css.burger}
            aria-label={isMenuOpen ? "Закрити меню" : "Відкрити меню"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <Icon name={isMenuOpen ? "close" : "menu"} width={24} height={24} />
          </button>
        </div>

        {isMenuOpen && (
          <nav className={css.mobileNav} aria-label="Мобільна навігація">
            <Link href="/" className={css.navLink} onClick={closeMenu}>
              Головна
            </Link>
            <Link href="/locations" className={css.navLink} onClick={closeMenu}>
              Місця відпочинку
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
