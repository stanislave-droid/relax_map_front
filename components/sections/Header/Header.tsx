"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import clsx from "clsx";
import Link from "@/components/ui/Link/Link";
import Icon from "@/components/ui/Icon/Icon";
import Navigation from "@/components/sections/Header/Navigation";
import MobileMenu from "@/components/sections/Header/MobileMenu";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./Header.module.css";
import LogoutModal from "@/components/auth/LogoutModal/LogoutModal";
import { createPortal } from "react-dom";
import EditProfileForm from "@/components/forms/EditProfileForm/EditProfileForm";

const emptySubscribe = () => () => {};
const Header = () => {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true, // значення на клієнті
    () => false, // значення на сервері та під час гідрації
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const closeMenu = () => setIsMenuOpen(false);
  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  useEffect(() => {
    async function setIsLoadingTrue() {
      setIsLoading(true);
    }
    setIsLoadingTrue();
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className={clsx(css.header, isMenuOpen && css.menuOpen)}>
        <div className={clsx("container", css.container)}>
          <Link href="/" className={css.logo} aria-label="На головну">
            <Icon name="logo" width={129} height={36} />
          </Link>

          {isLoading && (
            <Navigation
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              onLogoutClick={openLogoutModal}
              onEditProfileClick={() => setIsEditProfileOpen(true)}
            />
          )}
        </div>
      </header>

      {isMounted &&
        createPortal(
          <MobileMenu
            isMenuOpen={isMenuOpen}
            closeMenu={closeMenu}
            isAuthenticated={isAuthenticated}
            user={user}
            onLogoutClick={openLogoutModal}
            onEditProfileClick={() => setIsEditProfileOpen(true)}
          />,
          document.body,
        )}
      {isEditProfileOpen && (
        <EditProfileForm onClose={() => setIsEditProfileOpen(false)} />
      )}
      {isLogoutModalOpen && <LogoutModal onClose={closeLogoutModal} />}
    </>
  );
};

export default Header;
