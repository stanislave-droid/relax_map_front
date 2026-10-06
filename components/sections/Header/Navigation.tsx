"use client";

import Link from "@/components/ui/Link/Link";
import Icon from "@/components/ui/Icon/Icon";
import css from "./Header.module.css";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";
import { LOCATIONS_PATH, SortByArray } from "@/types/location";
import { usePathname } from "next/navigation";
import { SortBy } from "@/types/location";

const DEFAULT_AVATAR =
  "https://ac.goit.global/fullstack/react/default-avatar.jpg";

interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  onLogoutClick: () => void;
  onEditProfileClick: () => void;
}

const Navigation = ({
  isMenuOpen,
  setIsMenuOpen,
  onLogoutClick,
  onEditProfileClick,
}: NavigationProps) => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const pathname = usePathname();
  const pathnameArray = pathname.split("/");
  const lastPiece = pathnameArray.at(pathnameArray.length - 1);

  return (
    <>
      <nav className={css.nav} aria-label="Основна навігація">
        {!isAuthenticated && (
          <Link href="/" className={css.navLink}>
            Головна
          </Link>
        )}
        <Link
<<<<<<< HEAD
          href="/all-locations/all-types/all-regions/popular?search="
=======
          href={`${LOCATIONS_PATH}/${
            pathname.includes("all-locations")
              ? lastPiece &&
                !SortByArray.includes(lastPiece as SortBy | "popular")
                ? lastPiece
                : ""
              : ""
          }`}
>>>>>>> 2d40f6eb220ae7e370cda688be6d7e43ce1586f3
          className={css.navLink}
        >
          Місця відпочинку
        </Link>
        {isAuthenticated && (
          <Link href={`/profile/myProfile`} className={css.navLink}>
            Мій Профіль
          </Link>
        )}
      </nav>

      <div className={css.actions}>
        {isAuthenticated ? (
          <>
            <Link
              href="/private-locations/add"
              variant="primary"
              size="md"
              className={css.addLocationLink}
            >
              <span className={css.textTablet}>Опублікувати статтю</span>
              <span className={css.textDesktop}>Поділитись локацією</span>
            </Link>

            <div className={css.userInfo}>
              <button
                type="button"
                className={css.profileButton}
                aria-label="Редагувати профіль"
                onClick={onEditProfileClick}
              >
                <Image
                  src={user?.avatarUrl || DEFAULT_AVATAR}
                  alt=""
                  width={32}
                  height={32}
                  className={css.avatar}
                  unoptimized
                />
                <span className={css.userName}>{user?.name}</span>
              </button>

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
