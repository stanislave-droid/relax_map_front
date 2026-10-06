"use client";
import css from "./AddAndEditLocationForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useFormikContext } from "formik";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useId } from "react";
import * as Yup from "yup";
import { LocationFormValues } from "@/types/locationForm/locationFormValues";
import Button from "@/components/ui/Button/Button";
import { useQuery } from "@tanstack/react-query";
import { fetchLocationTypes, fetchRegions } from "@/lib/api/clientApi";
import clsx from "clsx";
import Spinner from "@/components/ui/Spinner/Spinner";
import SetMap from "@/components/Map/SetMap";

interface LocationFormProps {
  onSubmit: (values: LocationFormValues) => Promise<void>;
  validationSchema: Yup.ObjectSchema<LocationFormValues>;
  initialValues?: LocationFormValues;
  isEditing?: boolean;
  isLoading?: boolean;
}
const defaultValues: LocationFormValues = {
  image: null,
  name: "",
  locationType: "",
  region: "",
  description: "",
};
const ImageDropzone = () => {
  const { values, setFieldTouched, setFieldValue } =
    useFormikContext<LocationFormValues>();
  const [preview, setPreview] = useState<string | null>(null);
  const previewUrlRef = useRef<string | null>(null);
  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
    },
    maxFiles: 1,
    noClick: true,
    onDrop: (acceptedFiles) => {
      setFieldTouched("image", true);
      const file = acceptedFiles[0] ?? null;
      if (!file) return;
      setFieldValue("image", file);
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
      const url = URL.createObjectURL(file);
      previewUrlRef.current = url;
      setPreview(url);
    },
  });
  return (
    <div className={css.imageSection}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={css.imageWrapper}>
          {typeof values.image === "string" ? (
            <Image
              src={values.image}
              alt="Фото локації"
              fill
              className={css.image}
            />
          ) : preview ? (
            <Image
              src={preview}
              alt="фото локації"
              fill
              className={css.image}
            />
          ) : (
            <Image
              src="/placeholder-image-form-location.jpg"
              alt="фото локації"
              fill
              className={css.image}
            />
          )}
        </div>
        <button type="button" onClick={open} className={css.loadImgBtn}>
          Завантажити фото
        </button>
      </div>
      <ErrorMessage name="image" component="span" className={css.error} />
    </div>
  );
};
export default function AddAndEditLocationForm({
  onSubmit,
  validationSchema,
  initialValues,
  isEditing,
  isLoading,
}: LocationFormProps) {
  const fieldId = useId();
  const [imageKey, setImageKey] = useState(0);
  const { data: regions } = useQuery({
    queryKey: ["regions"],
    queryFn: fetchRegions,
  });
  const { data: locationTypes } = useQuery({
    queryKey: ["locationTypes"],
    queryFn: fetchLocationTypes,
  });

  return (
    <Formik
      initialValues={initialValues ?? defaultValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ resetForm, dirty }) => (
        <Form className={css.form}>
          <fieldset className={css.fieldset}>
            <label className={css.label}>Обкладинка</label>
            <ImageDropzone key={imageKey} />
            <div className={css.fieldContainer}>
              <label className={css.label} htmlFor={`${fieldId}-name`}>
                Назва місця
              </label>
              <Field
                className={css.field}
                type="text"
                name="name"
                id={`${fieldId}-name`}
                placeholder="Введіть назву місця"
              />
              <ErrorMessage
                name="name"
                component="span"
                className={css.error}
              />
            </div>
            <div className={clsx(css.fieldContainer, "selectWrapper")}>
              <label className={css.label} htmlFor={`${fieldId}-locationType`}>
                Тип місця
              </label>
              <Field
                className={css.select}
                as="select"
                name="locationType"
                id={`${fieldId}-locationType`}
              >
                <option className={css.optionSelect} value="">
                  Оберіть тип місця
                </option>
                {locationTypes?.map((type) => (
                  <option
                    className={css.optionSelect}
                    key={type.slug}
                    value={type.slug}
                  >
                    {type.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="locationType"
                component="span"
                className={css.error}
              />
            </div>
            <div className={css.fieldContainer}>
              <label className={css.label} htmlFor={`${fieldId}-region`}>
                Регіон
              </label>
              <Field
                className={css.select}
                as="select"
                name="region"
                id={`${fieldId}-region`}
              >
                <option className={css.optionSelect} value="">
                  Оберіть регіон
                </option>
                {regions?.map((region) => (
                  <option
                    className={css.optionSelect}
                    key={region.slug}
                    value={region.slug}
                  >
                    {region.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="region"
                component="span"
                className={css.error}
              />
            </div>
            <div className={css.fieldContainer}>
              <label className={css.label} htmlFor={`${fieldId}-description`}>
                Детальний опис
              </label>
              <Field
                as="textarea"
                name="description"
                id={`${fieldId}-description`}
                rows={5}
                className={css.textarea}
                placeholder="Детальний опис локації"
              />
              <ErrorMessage
                name="description"
                component="span"
                className={css.error}
              />
            </div>
          </fieldset>

          <SetMap getValue={(value) => {}} />

          <div className={css.buttonsWrapper}>
            <Button
              type="button"
              variant="secondary"
              className={clsx(css.button, "cancelBtn")}
              onClick={() => {
                resetForm();
                setImageKey((prev) => prev + 1);
              }}
            >
              {isEditing ? "Відмінити зміни" : "Відмінити"}
            </Button>
            <Button
              variant="primary"
              className={css.button}
              type="submit"
              disabled={!dirty || isLoading}
            >
              {isLoading && <Spinner />}
              {isEditing ? "Зберегти зміни" : "Опублікувати"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
