"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import Link from "@/components/ui/Link/Link";
import Icon from "@/components/ui/Icon/Icon";
import Navigation from "@/components/sections/Header/Navigation";
import MobileMenu from "@/components/sections/Header/MobileMenu";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./Header.module.css";
import LogoutModal from "@/components/auth/LogoutModal/LogoutModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const closeMenu = () => setIsMenuOpen(false);
  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className={clsx(css.header, isMenuOpen && css.menuOpen)}>
        <div className={clsx("container", css.container)}>
          <Link href="/" className={css.logo} aria-label="На головну">
            <Icon name="logo" width={129} height={36} />
          </Link>

          <Navigation
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            onLogoutClick={openLogoutModal}
          />
        </div>
      </header>

      <MobileMenu
        isMenuOpen={isMenuOpen}
        closeMenu={closeMenu}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogoutClick={openLogoutModal}
      />

      {isLogoutModalOpen && <LogoutModal onClose={closeLogoutModal} />}
    </>
  );
};

export default Header;
