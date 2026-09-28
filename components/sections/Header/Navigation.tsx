"use client";

import { useState } from "react";
import clsx from "clsx";
import Link from "@/components/ui/Link/Link";
import Icon from "@/components/ui/Icon/Icon";
import css from "./Header.module.css";
import Image from "next/image";

// тут буде хук з AuthProvider, коли він буде готовий

// const useAuth = () => ({
//   user: null as { id: string; name: string; avatarUrl: string | null } | null,
//   isAuthenticated: false,
//   logout: () => console.log("logout"),
// });

const MOCK_AUTHENTICATED = true;

const useAuth = () => ({
  user: MOCK_AUTHENTICATED
    ? { id: "1", name: "Олена Коваленко", avatarUrl: null }
    : null,
  isAuthenticated: MOCK_AUTHENTICATED,
  logout: () => console.log("logout"),
});

const Navigation = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav className={css.nav} aria-label="Основна навігація">
        {!isAuthenticated && (
          <Link href="/" className={css.navLink}>
            Головна
          </Link>
        )}
        <Link href="/locations" className={css.navLink}>
          Місця відпочинку
        </Link>
        {isAuthenticated && (
          <Link href={`/profile/${user?.id}`} className={css.navLink}>
            Мій Профіль
          </Link>
        )}
      </nav>

      <div className={css.actions}>
        {isAuthenticated ? (
          <>
            <Link
              href="/locations/add"
              variant="primary"
              size="md"
              className={css.addLocationLink}
            >
              <span className={css.textTablet}>Опублікувати статтю</span>
              <span className={css.textDesktop}>Поділитись локацією</span>
            </Link>

            <div className={css.userInfo}>
              <Image
                src={
                  user?.avatarUrl ??
                  "https://ac.goit.global/fullstack/react/default-avatar.jpg"
                }
                alt={user?.name ?? "Аватар користувача"}
                width={32}
                height={32}
                className={css.avatar}
                unoptimized
              />
              <span className={css.userName}>{user?.name}</span>
              <span className={css.divider} aria-hidden="true" />
              {/* TODO: відкривати модалку підтвердження, коли буде Modal */}
              <button
                type="button"
                className={css.logoutButton}
                aria-label="Вийти з акаунту"
                onClick={logout}
              >
                <Icon
                  name="logout"
                  width={32}
                  height={32}
                  className={css.logoutIcon}
                />
              </button>
            </div>
          </>
        ) : (
          <>
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
          </>
        )}

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

      {/* TODO: додати в мобільне меню для авторизованого: аватар, ім'я, вихід */}
      <nav
        className={clsx(css.mobileNav, isMenuOpen && css.isOpen)}
        aria-label="Мобільна навігація"
      >
        {!isAuthenticated && (
          <Link href="/" className={css.navLink} onClick={closeMenu}>
            Головна
          </Link>
        )}
        <Link href="/locations" className={css.navLink} onClick={closeMenu}>
          Місця відпочинку
        </Link>
        {isAuthenticated && (
          <Link
            href={`/profile/${user?.id}`}
            className={css.navLink}
            onClick={closeMenu}
          >
            Мій Профіль
          </Link>
        )}
      </nav>
    </>
  );
};

export default Navigation;
