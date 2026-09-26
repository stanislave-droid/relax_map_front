import Link from "next/link";
import css from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className="container">
        <div className={css.content}>
          <Link href="/" className={css.logo} aria-label="Relax Map home">
            <svg className={css.logoIcon} aria-hidden="true">
              <use href="/icons/sprite.svg#icon-logo" />
            </svg>
            <span>Relax Map</span>
          </Link>
          <div className={css.socialLinks}>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg className={css.socialIcon} aria-hidden="true">
                <use href="/icons/sprite.svg#icon-facebook" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg className={css.socialIcon} aria-hidden="true">
                <use href="/icons/sprite.svg#icon-instagram" />
              </svg>
            </a>
            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
            >
              <svg className={css.socialIcon} aria-hidden="true">
                <use href="/icons/sprite.svg#icon-x" />
              </svg>
            </a>

            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <svg className={css.socialIcon} aria-hidden="true">
                <use href="/icons/sprite.svg#icon-youtube" />
              </svg>
            </a>
          </div>
          <nav aria-label="Footer navigation">
            <ul className={css.navList}>
              <li>
                <Link href="/">Головна</Link>
              </li>
              <li>
                <Link href="/locations">Місця відпочинку</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className={css.copyright}>
          <p className={css.copyrightText}>
            © {new Date().getFullYear()} Природні Мандри. Усі права захищені.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
