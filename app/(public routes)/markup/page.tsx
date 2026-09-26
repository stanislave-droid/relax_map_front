"use client";
import clsx from "clsx";
import css from "./page.module.css";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";
import Textarea from "@/components/ui/Textarea/Textarea";
import Icon from "@/components/ui/Icon/Icon";

export default function Home() {
  return (
    <main className={css.main}>
      <div className={clsx("container")}>
        <h1 className={clsx("main-headding")}>Markup</h1>
        <ul style={{display: "flex"}}>
          <li>
            <Icon name="youtube" />
          </li>
          <li>
            <Icon name="twitter" />
          </li>
          <li>
            <Icon name="star_empty" />
          </li>
          <li>
            <Icon name="star_half" />
          </li>
          <li>
            <Icon name="star_filled" />
          </li>
          <li>
            <Icon name="select_check_box" />
          </li>
          <li>
            <Icon name="menu" />
          </li>
          <li>
            <Icon name="map_search" />
          </li>
          <li>
            <Icon name="logout" />
          </li>
          <li>
            <Icon name="keyboard_arrow_up" />
          </li>
          <li>
            <Icon name="keyboard_arrow_down" />
          </li>
          <li>
            <Icon name="instagram" />
          </li>
          <li>
            <Icon name="filter_alt" />
          </li>
          <li>
            <Icon name="facebook" />
          </li>
          <li>
            <Icon name="edit" />
          </li>
          <li>
            <Icon name="communication" />
          </li>
          <li>
            <Icon name="close" />
          </li>
          <li>
            <Icon name="chevron_right" />
          </li>
          <li>
            <Icon name="chevron_left" />
          </li>
          <li>
            <Icon name="bookmark" />
          </li>
          <li>
            <Icon name="arrow_forward" />
          </li>
          <li>
            <Icon name="arrow_back" />
          </li>
        </ul>
        <p></p>
        <ul>
          <li>
            <Button variant="primary">Primary Button</Button>
          </li>
          <li>
            <Button variant="secondary">Secondary Button</Button>
          </li>
          {/* <li>
            <Button variant="outline">Outline Button</Button>
          </li> */}
          <li>
            <Button variant="ghost">Ghost Button</Button>
          </li>
        </ul>
        <p></p>
        <ul>
          <li>
            <Button variant="primary" disabled>
              Primary Button (Disabled)
            </Button>
          </li>
          <li>
            <Button variant="secondary" disabled>
              Secondary Button (Disabled)
            </Button>
          </li>
          {/* <li>
            <Button variant="outline" disabled>
              Outline Button
            </Button>
          </li> */}
          <li>
            <Button variant="ghost" disabled>
              Ghost Button (Disabled)
            </Button>
          </li>
        </ul>
        <p></p>
        <ul>
          <li>
            <Button size="sm">Small Button</Button>
          </li>
          <li>
            <Button size="md">Medium Button</Button>
          </li>
          {/* <li>
            <Button size="lg">Large Button</Button>
          </li> */}
        </ul>
        <p></p>
        <ul>
          <li>
            <form action={() => {}}>
              <label>
                Email:
                <Input type="Email" placeholder="user@example.com" required />
              </label>
              <label>
                Comment:
                <Textarea placeholder="Comment here ..." minLength={2} maxLength={256} />
              </label>
              <Button type="submit">Submit</Button>
            </form>
          </li>
        </ul>
      </div>
    </main>
  );
}
