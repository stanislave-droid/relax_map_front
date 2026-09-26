"use client";
import clsx from "clsx";
import css from "./page.module.css";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";
import Textarea from "@/components/ui/Textarea/Textarea";

export default function Home() {
  return (
    <main className={css.main}>
      <div className={clsx("container")}>
        <h1 className={clsx("main-headding")}>Markup</h1>
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
