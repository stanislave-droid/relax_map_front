"use client";

import Button from "@/components/ui/Button/Button";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useId, useState} from "react";
import {EMAIL_REGEX} from "@/utils/emailRegex";
import Input from "@/components/ui/Input/Input";
import clsx from "clsx";
import css from "./LoginForm.module.css"
import Icon from "@/components/ui/Icon/Icon"
import {useAuthStore} from "@/lib/store/authStore";
import {login} from "@/lib/api/clientApi";
import toast from "react-hot-toast";
import {getLoginErrorMessage} from "@/utils/loginErrorMessage";
import {useRouter} from "next/navigation";


type LoginFormValues = {
    email: string,
    password: string,
};

const initialValues: LoginFormValues = {
    email: "",
    password: "",
};

const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .trim()
        .lowercase()
        .max(64, "Email має містити не більше 64 символів")
        .matches(EMAIL_REGEX, {
            message: "Введіть коректну email адресу",
            excludeEmptyString: true,
        })
        .required("Email обов'язковий"),
    password: Yup.string()
        .min(8, "Пароль має містити щонайменше 8 символів")
        .max(128, "Пароль має містити не більше 128 символів")
        .required("Пароль обов'язковий"),
});

export type LoginSchema = Yup.InferType<typeof loginValidationSchema>;

export default function LoginForm() {

    const fieldId = useId();

    const emailId = `${fieldId}-email`;
    const passwordId = `${fieldId}-password`;

    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const setUser = useAuthStore((state) => state.setUser);

    const handleSubmit = async (values: LoginSchema) => {
        setErrorMessage(null);

        try {
            const user = await login(values);
            setUser(user);
            toast.success("Ви успішно увійшли!");
            router.push(`/profile/myProfile`);
        } catch (error) {
            toast.error(getLoginErrorMessage(error));
        }
    };

    return (
        <div>
            <h1 className={clsx(css["title"])}>Вхід</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={loginValidationSchema}
            >
                <Form className={css.form}>
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
                            className={clsx(css["submitButton"])}
                        > Увійти
                        </Button>
                    </div>
                    {errorMessage && (
                        <div className={css.serverError} role="alert">
                            <Icon className={css.serverErrorIcon} name="error" aria-hidden="true"/>
                            <span>{errorMessage}</span>
                        </div>
                    )}
                </Form>
            </Formik>
        </div>
    );
};