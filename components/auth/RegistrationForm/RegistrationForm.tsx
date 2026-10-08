"use client"

import * as Yup from "yup";
import {EMAIL_REGEX} from "@/utils/emailRegex";
import Button from "@/components/ui/Button/Button";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useId} from "react";
import Input from "@/components/ui/Input/Input";
import clsx from "clsx";
import Spinner from "@/components/ui/Spinner/Spinner"
import css from "./RegistrationForm.module.css"

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

export interface RegistrationFormProps {
    onSubmit: (value: RegisterSchema) => Promise<void> | void,
    isLoading?: boolean,
    errorMessage?: string | null;
};

export default function RegistrationForm({onSubmit, isLoading, errorMessage}: RegistrationFormProps) {

    const fieldId = useId();

    const nameId = `${fieldId}-name`;
    const emailId = `${fieldId}-email`;
    const passwordId = `${fieldId}-password`;

    return (
        <div>
            <h1 className={clsx(css["title"])}>Реєстрація</h1>
            <Formik initialValues={initialValues}
                    onSubmit={onSubmit}
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

                        <Field
                            id={passwordId}
                            as={Input}
                            name="password"
                            type="password"
                            placeholder="********"
                            className={css.inputForm}
                        />
                        <ErrorMessage
                            name="password"
                            component="span"
                            className={css.error}
                        />
                    </div>
                    <div>
                        <Button
                            type={"submit"}
                            disabled={isLoading}
                            className={clsx(css["submitButton"])}
                        >
                            {isLoading
                                ? <Spinner color="white"/>
                                : "Зареєструватись"}

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