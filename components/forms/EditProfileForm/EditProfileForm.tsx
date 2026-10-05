"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button/Button";
import Modal from "@/components/ui/Modal/Modal";
import { useAuthStore } from "@/lib/store/authStore";
import { updateProfile } from "@/lib/api/updateProfile";
import { User } from "@/types/user";
import css from "./EditProfileForm.module.css";
import Image from "next/image";

const DEFAULT_AVATAR_URL =
  "https://ac.goit.global/fullstack/react/default-avatar.jpg";
const MAX_FILE_SIZE = 2 * 1024 * 1024; //
const NAME_MIN = 2;
const NAME_MAX = 32;

interface FormContentProps {
  user: User;
  onClose: () => void;
}

const validateName = (value: string): string => {
  const trimmed = value.trim();

  if (trimmed.length < NAME_MIN) {
    return `Ім'я має містити щонайменше ${NAME_MIN} символи`;
  }

  if (trimmed.length > NAME_MAX) {
    return `Ім'я має містити не більше ${NAME_MAX} символи`;
  }

  return "";
};

const EditProfileFormContent = ({ user, onClose }: FormContentProps) => {
  const setUser = useAuthStore((state) => state.setUser);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(user.name);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(user.avatarUrl ?? DEFAULT_AVATAR_URL);
  const [nameError, setNameError] = useState("");
  const [fileError, setFileError] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (updatedUser) => {
      setUser({ ...user, ...updatedUser });
      toast.success("Профіль успішно оновлено");
      onClose();
    },
    onError: () => {
      toast.error("Під час операції сталася помилка, повторіть пізніше");
    },
  });

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setNameError("");
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];

    if (!selected) {
      return;
    }

    if (!selected.type.startsWith("image/")) {
      setFileError("Оберіть файл із зображенням");
      event.target.value = "";
      return;
    }

    if (selected.size > MAX_FILE_SIZE) {
      setFileError("Файл завеликий. Максимальний розмір — 2 МБ");
      event.target.value = "";
      return;
    }

    setFileError("");
    setFile(selected);

    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setPreview(reader.result);
      }
    };

    reader.readAsDataURL(selected);
  };

  const handleCancel = () => {
    setName(user.name);
    setFile(null);
    setPreview(user.avatarUrl ?? DEFAULT_AVATAR_URL);
    setNameError("");
    setFileError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    onClose();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const error = validateName(name);

    if (error) {
      setNameError(error);
      return;
    }

    const trimmedName = name.trim();
    const nameChanged = trimmedName !== user.name;

    if (!nameChanged && !file) {
      onClose();
      return;
    }

    mutate({
      name: nameChanged ? trimmedName : undefined,
      avatar: file ?? undefined,
    });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit} noValidate>
      <h2 className={css.title}>Редагувати профіль</h2>
      <p className={css.labelAvatar}>Аватар</p>
      <div className={css.avatarBlock}>
        <Image
          className={css.avatar}
          src={preview}
          alt="Ваше фото"
          width={120}
          height={120}
          unoptimized
        />

        <div className={css.avatarControls}>
          <label className={css.fileButton}>
            Завантажити фото
            <input
              ref={fileInputRef}
              className={css.fileInput}
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleFileChange}
              aria-describedby={fileError ? "avatar-error" : undefined}
            />
          </label>

          {fileError && (
            <p id="avatar-error" className={css.error} role="alert">
              {fileError}
            </p>
          )}
        </div>
      </div>

      <div className={css.field}>
        <label className={css.label} htmlFor="profile-name">
          Ім&apos;я
        </label>
        <input
          id="profile-name"
          className={`${css.input} ${nameError ? css.inputError : ""}`}
          type="text"
          name="name"
          placeholder="Введіть нове ім'я"
          value={name}
          onChange={handleNameChange}
          autoComplete="name"
          aria-invalid={Boolean(nameError)}
          aria-describedby={nameError ? "name-error" : undefined}
        />
        {nameError && (
          <p id="name-error" className={css.error} role="alert">
            {nameError}
          </p>
        )}
      </div>

      <div className={css.actions}>
        <Button
          variant="secondary"
          type="button"
          onClick={handleCancel}
          disabled={isPending}
          className={css.buttonUpdate}
        >
          Відмінити
        </Button>
        <Button variant="primary" type="submit" disabled={isPending} className={css.buttonUpdate}>
          {isPending ? "Збереження..." : "Зберегти"}
        </Button>
      </div>
    </form>
  );
};

interface EditProfileFormProps {
  onClose: () => void;
}

const EditProfileForm = ({ onClose }: EditProfileFormProps) => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return null;
  }

  return (
    <Modal onClose={onClose} className={css.modal}>
      <EditProfileFormContent user={user} onClose={onClose} />
    </Modal>
  );
};

export default EditProfileForm;
