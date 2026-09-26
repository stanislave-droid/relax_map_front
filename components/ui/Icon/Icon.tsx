interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: "youtube" | "twitter" | "star_empty" | "star_half" | "star_filled" | "select_check_box" | "menu" | "map_search" | "logout" | "keyboard_arrow_up" | "keyboard_arrow_down" | "instagram" | "filter_alt" | "facebook" | "edit" | "communication" | "close" | "chevron_right" | "chevron_left" | "bookmark" | "arrow_forward" | "arrow_back";
  size?: number;
}

export default function Icon({ name, size = 24, className, ...props }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...props}>
      <use href={`/icons/sprite.svg#${name}`}></use>
    </svg>
  );
}
