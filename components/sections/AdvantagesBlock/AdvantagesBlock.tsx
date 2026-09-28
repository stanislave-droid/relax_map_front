import Icon from "@/components/ui/Icon/Icon";
import css from "./AdvantagesBlock.module.css";

const advantages = [
  {
    icon: "select_check_box" as const,
    title: "Реальні відгуки",
    description:
      "Користувачі діляться чесними враженнями, щоб ви робили правильний вибір.",
  },
  {
    icon: "filter_alt" as const,
    title: "Зручні фільтри",
    description:
      "Шукайте за типом локації, регіоном, наявністю зручностей та іншими критеріями.",
  },
  {
    icon: "communication" as const,
    title: "Спільнота мандрівників",
    description:
      "Додавайте власні улюблені місця та діліться своїми неймовірними знахідками.",
  },
];

const AdvantagesBlock = () => {
  return (
    <section className={css.advantages}>
      <div className="container">
        <h2 className={css.title}>Ключові переваги</h2>

        <ul className={css.list}>
          {advantages.map(({ icon, title, description }) => (
            <li className={css.card} key={title}>
              <Icon
                name={icon}
                width={64}
                height={64}
                className={css.icon}
                aria-hidden="true"
              />

              <h3 className={css.cardTitle}>{title}</h3>

              <p className={css.description}>{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AdvantagesBlock;
