"use client";

import clsx from "clsx";
import Link from "@/components/ui/Link/Link";
import Icon from "@/components/ui/Icon/Icon";
import Image from "next/image";
import css from "./Header.module.css";
import { LOCATIONS_PATH } from "@/types/location";

const DEFAULT_AVATAR =
  "https://ac.goit.global/fullstack/react/default-avatar.jpg";

interface MobileMenuProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
  isAuthenticated: boolean;
  user: { _id: string; name: string; avatarUrl: string | null };
  onLogoutClick: () => void;
  onEditProfileClick: () => void;
}

const MobileMenu = ({
  isMenuOpen,
  closeMenu,
  isAuthenticated,
  user,
  onLogoutClick,
  onEditProfileClick,
}: MobileMenuProps) => {
  const handleLogoutClick = () => {
    closeMenu();
    onLogoutClick();
  };

  const handleEditProfileClick = () => {
    closeMenu();
    onEditProfileClick();
  };

  return (
    <nav
      className={clsx(css.mobileNav, isMenuOpen && css.isOpen)}
      aria-label="Мобільна навігація"
    >
      <div className={css.mobileNavInner}>
        <div className={css.mobileNavLinks}>
          <Link href="/" className={css.navLinkMenu} onClick={closeMenu}>
            Головна
          </Link>

          <Link
            href={LOCATIONS_PATH}
            className={css.navLinkMenu}
            onClick={closeMenu}
          >
            Місця відпочинку
          </Link>
          {isAuthenticated && (
            <Link
              href={`/profile/myProfile`}
              className={css.navLinkMenu}
              onClick={closeMenu}
            >
              Мій Профіль
            </Link>
          )}
        </div>

        <div className={css.mobileNavBottom}>
          {isAuthenticated ? (
            <>
              <div className={css.mobileDrawerExtra}>
                <Link
                  href="/locations/add"
                  variant="primary"
                  size="md"
                  className={css.addLocationLinkMenu}
                  onClick={closeMenu}
                >
                  <span className={css.textTablet}>Опублікувати статтю</span>
                  <span className={css.textDesktop}>Поділитись локацією</span>
                </Link>
              </div>

              <div className={css.userInfo}>
                <button
                  type="button"
                  className={css.profileButton}
                  aria-label="Редагувати профіль"
                  onClick={handleEditProfileClick}
                >
                  <Image
                    src={user?.avatarUrl || DEFAULT_AVATAR}
                    alt=""
                    width={32}
                    height={32}
                    className={css.avatar}
                    unoptimized
                  />
                  <span className={css.userNameMenu}>{user?.name}</span>
                </button>
                <span className={css.divider} aria-hidden="true" />
                <button
                  type="button"
                  className={css.logoutButton}
                  aria-label="Вийти з акаунту"
                  onClick={handleLogoutClick}
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
            <div className={clsx(css.mobileAuthButtons, css.mobileDrawerExtra)}>
              <Link
                href="/sign-in"
                variant="ghost"
                size="md"
                className={css.mobileLoginLink}
                onClick={closeMenu}
              >
                Вхід
              </Link>
              <Link
                href="/sign-up"
                variant="primary"
                size="md"
                className={css.mobileRegisterLink}
                onClick={closeMenu}
              >
                Реєстрація
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MobileMenu;
