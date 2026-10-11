"use client"

import * as Yup from "yup";
import {EMAIL_REGEX} from "@/utils/emailRegex";
import Button from "@/components/ui/Button/Button";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useId, useState} from "react";
import Input from "@/components/ui/Input/Input";
import clsx from "clsx";
import css from "./RegistrationForm.module.css"
import {useRouter} from "next/navigation";
import {useAuthStore} from "@/lib/store/authStore";
import {register} from "@/lib/api/clientApi";
import toast from "react-hot-toast";
import {getRegisterErrorMessage} from "@/utils/registerErrorMessage";
import Icon from "@/components/ui/Icon/Icon";

type RegisterFormValues = {
    name: string,
    email: string,
    password: string,
};

const initialValues: RegisterFormValues = {
    name: "",
    email: "",
    password: "",
};

const registerValidationSchema = Yup.object().shape({
    name: Yup.string()
        .trim()
        .min(2, "Ім'я має містити щонайменше 2 символи")
        .max(32, "Ім'я має містити не більше 32 символів")
        .required("Ім'я обов'язкове"),
    email: Yup.string()
        .trim()
        .lowercase()
        .max(64, "Email має містити не більше 64 символів")
        .matches(EMAIL_REGEX, {
            message: "Введіть коректну email адресу",
            excludeEmptyString: true, //якщо значення порожній рядок => не перевіряє EMAIL_REGEX,
        })
        .required("Email обов'язковий"),
    password: Yup.string()
        .min(8, "Пароль має містити щонайменше 8 символів")
        .max(128, "Пароль має містити не більше 128 символів")
        .required("Пароль обов'язковий"),
});

export type RegisterSchema = Yup.InferType<typeof registerValidationSchema>;

export default function RegistrationForm() {

    const fieldId = useId();

    const nameId = `${fieldId}-name`;
    const emailId = `${fieldId}-email`;
    const passwordId = `${fieldId}-password`;

    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const setUser = useAuthStore((state) => state.setUser);

    const handleSubmit = async (values: RegisterSchema) => {
        setErrorMessage(null);

        try {
            const user = await register(values);
            setUser(user);
            toast.success("Ви успішно зареєструвались!");
            router.push(`/profile/myProfile`);
        } catch (error) {
            toast.error(getRegisterErrorMessage(error));
        }
    };

    const handleClick = () => {
        setShowPassword((prevState) => !prevState)
    };

    return (
        <div>
            <h1 className={clsx(css["title"])}>Реєстрація</h1>
            <Formik initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={registerValidationSchema}
            >
                <Form className={css.form}>
                    <div className={css.field}>
                        <label className={css.label} htmlFor={nameId}>Ім’я*</label>
                        <Field
                            id={nameId}
                            as={Input}
                            name="name"
                            type="text"
                            placeholder="Ваше ім’я"
                            className={css.inputForm}
                        />
                        <ErrorMessage
                            name="name"
                            component="span"
                            className={css.error}
                        />
                    </div>
                    <div className={css.field}>
                        <label className={css.label} htmlFor={emailId}>Пошта*</label>
                        <Field
                            id={emailId}
                            as={Input}
                            name="email"
                            type="email"
                            placeholder="hello@relaxmap.ua"
                            className={css.inputForm}
                        />

                        <ErrorMessage
                            name="email"
                            component="span"
                            className={css.error}
                        />
                    </div>
                    <div className={css.field}>
                        <label className={css.label} htmlFor={passwordId}>Пароль*</label>
                        <div className={css.passwordWrapper}>
                            <Field
                                id={passwordId}
                                as={Input}
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="********"
                                className={css.inputForm}
                            />
                            <button
                                type="button"
                                onClick={handleClick}
                                aria-label={showPassword ? "Приховати пароль" : "Показати пароль"}
                                className={css.buttonEye}
                            >
                                <Icon name={showPassword ? "eye-closed" : "eye-open"}
                                      aria-hidden="true"
                                />
                            </button>
                        </div>
                        <ErrorMessage
                            name="password"
                            component="span"
                            className={css.error}
                        />
                    </div>
                    <div>
                        <Button
                            type={"submit"}
                            className={clsx(css["submitButton"])}
                        > Зареєструватись
                        </Button>
                    </div>
                    {errorMessage && (
                        <p role="alert">
                            {errorMessage}</p>
                    )}
                </Form>
            </Formik>
        </div>
    );
};