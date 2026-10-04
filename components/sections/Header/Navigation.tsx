"use client";

import Link from "@/components/ui/Link/Link";
import Icon from "@/components/ui/Icon/Icon";
import css from "./Header.module.css";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";

const DEFAULT_AVATAR =
  "https://ac.goit.global/fullstack/react/default-avatar.jpg";

interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  onLogoutClick: () => void;
}

const Navigation = ({
  isMenuOpen,
  setIsMenuOpen,
  onLogoutClick,
}: NavigationProps) => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <>
      <nav className={css.nav} aria-label="Основна навігація">
        {!isAuthenticated && (
          <Link href="/" className={css.navLink}>
            Головна
          </Link>
        )}
        <Link
          href="/all-locations/all-types/all-regions/popular?search="
          className={css.navLink}
        >
          Місця відпочинку
        </Link>
        {isAuthenticated && (
          <Link href={`/profile/${user._id}`} className={css.navLink}>
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
                src={user?.avatarUrl || DEFAULT_AVATAR}
                alt={user?.name ?? "Аватар користувача"}
                width={32}
                height={32}
                className={css.avatar}
                unoptimized
              />
              <span className={css.userName}>{user?.name}</span>
              <span className={css.divider} aria-hidden="true" />
              <button
                type="button"
                className={css.logoutButton}
                aria-label="Вийти з акаунту"
                onClick={onLogoutClick}
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
              href="/sign-in"
              variant="ghost"
              size="md"
              className={css.loginLink}
            >
              Вхід
            </Link>
            <Link
              href="/sign-up"
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
    </>
  );
};

export default Navigation;
