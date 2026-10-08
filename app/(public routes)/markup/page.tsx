"use client";
import clsx from "clsx";
import css from "./page.module.css";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";
import Textarea from "@/components/ui/Textarea/Textarea";
import Icon from "@/components/ui/Icon/Icon";
import Link from "@/components/ui/Link/Link";
import RatingStars from "@/components/ui/RatingStars/RatingStars";
import Select from "@/components/ui/Select/Select";

import { useState } from "react";
import SignUp from "@/app/(auth routes)/sign-up/page";
import LoginForm, {
  type LoginSchema,
} from "@/components/auth/LoginForm/LoginForm";
import RegistrationForm, {
  type RegisterSchema,
} from "@/components/auth/RegistrationForm/RegistrationForm";
import { Location } from "@/types/location";
import LocationCard from "@/components/ui/LocationCard/LocationCard";
import Spinner from "@/components/ui/Spinner/Spinner";

import showToast, { showError } from "@/components/ui/Toast/Toast";

import AddReviewBlock from "@/components/addFeedback/AddReviewModal/AddReviewModal";
import AuthErrorModal from "@/components/addFeedback/AuthErrorModal/AuthErrorModal";
import { useAuthStore } from "@/lib/store/authStore";
import { string } from "yup";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const handleLeaveReview = () => {
    if (isAuthenticated) {
      setIsReviewOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleSubmit = async (values: LoginSchema) => {
    setErrorMessage(null);
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500)); // імітація запиту

    setIsLoading(false);
    setErrorMessage("Невірний email або пароль");
  };

  const location: Location = {
    _id: "dsadsadsa",
    image: "https://ftp.goit.study/img/relax-map/68d568270e6bcc357e9833e8.webp",
    name: "Сонячна Рів'єра",
    locationType: "Море",
    region: "chornomorske-uzberezhzhya",
    rate: 4.5,
    ownerId: "6881563901add19ee16fcff5",
    description:
      "Уявіть собі місце, де кожен ранок починається з ніжного дотику сонячних променів і тихого шепоту хвиль.",
    feedbacksId: [],
    coordinates: {
      lat: 0,
      lon: 0,
    },
  };

  return (
    <main className={css.main}>
      <div className={clsx("container")}>
        <h1 className={clsx("main-headding")}>Markup</h1>
        <ul style={{ display: "flex" }}>
          <li>
            <Icon name="logo" width={129} height={36} />
          </li>
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
          <li>
            <Button size="icon-sm">
              <Icon name="bookmark" />
            </Button>
          </li>
          <li>
            <Button size="icon-md">
              <Icon name="bookmark" />
            </Button>
          </li>
        </ul>
        <p></p>
        <ul>
          <li>
            <Link href="" size="sm">
              Small Button
            </Link>
          </li>
          <li>
            <Link href="" size="md">
              Medium Button
            </Link>
          </li>
          <li>
            <Link href="" size="icon-sm">
              <Icon name="bookmark" />
            </Link>
          </li>
          <li>
            <Link href="" size="icon-md">
              <Icon name="bookmark" />
            </Link>
          </li>
        </ul>
        <p></p>
        <ul>
          <li>
            <p className={css["rating-label"]}>0.1:</p>
            <RatingStars value={0.1} />
          </li>
          <li>
            <p className={css["rating-label"]}>1.4:</p>
            <RatingStars value={1.4} />
          </li>
          <li>
            <p className={css["rating-label"]}>2.6:</p>
            <RatingStars value={2.6} />
          </li>
          <li>
            <p className={css["rating-label"]}>3.8:</p>
            <RatingStars value={3.8} />
          </li>
          <li>
            <p className={css["rating-label"]}>4.9:</p>
            <RatingStars value={4.9} />
          </li>
        </ul>
        <p></p>
        <form action={() => {}}>
          <label>
            Email:
            <Input type="Email" placeholder="user@example.com" required />
          </label>
          <label>
            Comment:
            <Textarea
              placeholder="Comment here ..."
              minLength={2}
              maxLength={256}
            />
          </label>
          <Button type="submit">Submit</Button>
        </form>
        <p></p>
        <form action={(d) => console.log(d)} id="form-1">
          <Select name="answer">
            <option>A</option>
            <option>B</option>
            <option>C</option>
            <option>D</option>
          </Select>
          <Button type="submit">Submit</Button>
        </form>
        <div>
          <SignUp />
        </div>
        <div>
          <LoginForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            errorMessage={errorMessage}
          ></LoginForm>
        </div>
        <LocationCard location={location} locationLink="#" editLink="#" />
        <p> </p>
        <ul>
          <li>
            <Button
              onClick={() => showToast("You pressed the 'Info Toast' button")}
            >
              Info Toast
            </Button>
          </li>
          <li>
            <Button onClick={() => showError("Something went oops")}>
              Error Toast
            </Button>
          </li>
        </ul>
        <Spinner />
        {/* MODAL FOR CREATE NEW FEEDBACK */}
        <Button onClick={handleLeaveReview}>Залишити відгук</Button>
        <AddReviewBlock
          isOpen={isReviewOpen}
          locationId="68d568270e6bcc357e9833e9"
          onClose={() => setIsReviewOpen(false)}
        />
        {isAuthModalOpen && (
          <AuthErrorModal onClose={() => setIsAuthModalOpen(false)} />
        )}
        {/* -------------------------------------- */}
      </div>
    </main>
  );
}
