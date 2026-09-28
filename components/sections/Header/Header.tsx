// "use client";

// import { useState } from "react";
// import Link from "@/components/ui/Link/Link";
// import Icon from "@/components/ui/Icon/Icon";
// import css from "./Header.module.css";

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const closeMenu = () => setIsMenuOpen(false);

//   return (
//     <header className={css.header}>
//       <div className={css.container}>
//         <Link
//           href="/"
//           className={css.logo}
//           aria-label="На головну"
//           onClick={closeMenu}
//         >
//           <Icon name="logo" width={129} height={36} />
//         </Link>

//         <nav className={css.nav} aria-label="Основна навігація">
//           <Link href="/" className={css.navLink}>
//             Головна
//           </Link>
//           <Link href="/locations" className={css.navLink}>
//             Місця відпочинку
//           </Link>
//         </nav>

//         <div className={css.actions}>
//           <Link
//             href="/login"
//             variant="ghost"
//             size="md"
//             className={css.loginLink}
//           >
//             Вхід
//           </Link>
//           <Link
//             href="/register"
//             variant="primary"
//             size="md"
//             className={css.registerLink}
//           >
//             Реєстрація
//           </Link>

//           <button
//             type="button"
//             className={css.burger}
//             aria-label={isMenuOpen ? "Закрити меню" : "Відкрити меню"}
//             aria-expanded={isMenuOpen}
//             onClick={() => setIsMenuOpen((prev) => !prev)}
//           >
//             <Icon name={isMenuOpen ? "close" : "menu"} width={24} height={24} />
//           </button>
//         </div>

//         {isMenuOpen && (
//           <nav className={css.mobileNav} aria-label="Мобільна навігація">
//             <Link href="/" className={css.navLink} onClick={closeMenu}>
//               Головна
//             </Link>
//             <Link href="/locations" className={css.navLink} onClick={closeMenu}>
//               Місця відпочинку
//             </Link>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;

"use client";

import { useState } from "react";
import clsx from "clsx";
import Link from "@/components/ui/Link/Link";
import Icon from "@/components/ui/Icon/Icon";
import css from "./Header.module.css";
import Image from "next/image";

interface HeaderProps {
  user?: { id: string; name: string; avatarUrl: string | null } | null;
  isAuthenticated: boolean;
  onLogoutClick: () => void;
}

const Header = ({ user, isAuthenticated, onLogoutClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={css.header}>
      <div className={clsx("container", css.container)}>
        <Link
          href="/"
          className={css.logo}
          aria-label="На головну"
          onClick={closeMenu}
        >
          <Icon name="logo" width={129} height={36} />
        </Link>

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
              <Link href="/locations/add" variant="primary" size="md">
                Поділитись локацією
              </Link>

              <div className={css.userInfo}>
                <img
                  src={
                    user?.avatarUrl ??
                    "https://ac.goit.global/fullstack/react/default-avatar.jpg"
                  }
                  alt={user?.name ?? "Аватар користувача"}
                  width={32}
                  height={32}
                  className={css.avatar}
                />
                <span className={css.userName}>{user?.name}</span>
              </div>

              {/* TODO: замінити прямий виклик на відкриття модалки підтвердження виходу,
                  коли буде готовий компонент ui/Modal. Тоді onLogoutClick викликатиметься
                  з кнопки підтвердження всередині модалки, а не звідси напряму. */}
              <button
                type="button"
                className={css.logoutButton}
                aria-label="Вийти з акаунту"
                onClick={onLogoutClick}
              >
                <Icon name="logout" width={32} height={32} />
              </button>
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
      </div>
    </header>
  );
};

export default Header;
