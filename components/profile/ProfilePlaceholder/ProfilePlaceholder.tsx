import Button from "@/components/ui/Button/Button";
import css from "./ProfilePlaceholder.module.css";

interface ProfilePlaceholderProps {
  isOwnProfile: boolean;
  onActionClick: () => void;
}

export default function ProfilePlaceholder({
  isOwnProfile,
  onActionClick,
}: ProfilePlaceholderProps) {
  const text = isOwnProfile
    ? "Ви ще нічого не публікували, поділіться своєю першою локацією!"
    : "Цей користувач ще не ділився локаціями";

  const buttonText = isOwnProfile ? "Поділитися локацією" : "Назад до локацій";

  return (
    <div className={css.placeholder}>
      <p className={css.text}>{text}</p>

      <Button type="button" onClick={onActionClick}>
        {buttonText}
      </Button>
    </div>
  );
}
