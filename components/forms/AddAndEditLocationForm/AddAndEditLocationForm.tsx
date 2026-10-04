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

interface LocationFormProps {
  onSubmit: (values: LocationFormValues) => Promise<void>;
  onCancel: () => void;
  // locationTypes: LocationType[];
  // regions: Region[];
  validationSchema: Yup.ObjectSchema<LocationFormValues>;
  initialValues?: LocationFormValues;
  isEditinfg?: boolean;
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
              src="/p/placeholder-image-form-location-desktop.jpg"
              alt="фото локації"
              fill
              className={css.image}
            />
          )}
        </div>
        <button type="button" onClick={open} className={css.loadImfBtn}>
          Завантажити фото
        </button>
      </div>
      <ErrorMessage name="image" component="span" className="css.error" />
    </div>
  );
};
export default function AddAndEditLocationForm({
  onSubmit,
  onCancel,
  // locationTypes,
  // regions,
  validationSchema,
  initialValues,
  isEditinfg,
}: LocationFormProps) {
  const fieldId = useId();
  const [imageKey, setImageKey] = useState(0);

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
            <label className={css.label} htmlFor={`${fieldId}-name`}>
              Назва місця
            </label>
            <Field
              className={css.field}
              type="text"
              name="name"
              id={`${fieldId}-name`}
              // onChange={handleChange}
            />
            <ErrorMessage name="name" component="span" className="css.error" />
            <label className={css.label} htmlFor={`${fieldId}-locationType`}>
              Тип місця
            </label>
            <Field
              className={css.select}
              as="select"
              name="locationType"
              id={`${fieldId}-locationType`}
            >
              <option value="" defaultChecked>
                Оберіть тип місця
              </option>
              {/* {locationTypes &&
              locationTypes.map((type) => (
                <option key={type._id} value={type.type}>
                  {type.type}
                </option>
              ))} */}
            </Field>
            <ErrorMessage
              name="locationType"
              component="span"
              className="css.error"
            />
            <label className={css.label} htmlFor={`${fieldId}-region`}>
              Регіон
            </label>
            <Field
              className={css.select}
              as="select"
              name="region"
              id={`${fieldId}-region`}
              // onChange={handleChange}
            >
              <option value="" defaultChecked>
                Оберіть регіон
              </option>
              {/* {regions &&
              regions.map((region) => (
                <option key={region.slug} value={region.slug}>
                  {region.name}
                </option>
              ))}
             */}
            </Field>
            <ErrorMessage
              name="region"
              component="span"
              className="css.error"
            />
            <label className={css.label} htmlFor={`${fieldId}-description`}>
              Детальний опис
            </label>
            <Field
              as="textarea"
              name="description"
              id={`${fieldId}-description`}
              // onChange={handleChange}
              rows={5}
              className={css.textarea}
            />
            <ErrorMessage
              name="description"
              component="span"
              className="css.error"
            />
          </fieldset>
          <div className={css.buttonsWrapper}>
            <button
              type="button"
              onClick={() => {
                resetForm();
                setImageKey((prev) => prev + 1);
                onCancel();
              }}
            >
              {isEditinfg ? "Відмінити зміни" : "Відмінити"}
            </button>
            <button type="submit" className={css.button} disabled={!dirty}>
              {isEditinfg ? "Зберегти зміни" : "Опублікувати"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
