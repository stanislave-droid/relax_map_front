"use client";

import {
  Formik,
  Form,
  Field,
  useFormikContext,
  type FormikHelpers,
  ErrorMessage,
} from "formik";
import "../../ui/common.module.css";
import css from "./LocationForm.module.css";
import { useEffect, useId, useState } from "react";
import * as Yup from "yup";
import { Location, CreateLocation, UpdateLocationData } from "@/types/location";
import Button from "@/components/ui/Button/Button";
import { useLocationDraftStore } from "@/lib/store/locationStore";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLocation, fetchLocationTypes } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Spinner from "@/components/ui/Spinner/Spinner";
import { LocationType } from "@/types/locationType";

interface LocationFormProps {
  location?: Location;
}

interface ImagePreviewWithFileInputProps {
  initialImage: string;
}

const initialValues: CreateLocation = {
  image: "",
  name: "",
  description: "",
  locationType: "",
  region: "",
};

const LocationFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name too short")
    .max(96, "Name too long")
    .matches(
      /^[^\s].*[^\s]$/,
      "Spaces at the beginning and end are not allowed",
    )
    .required("Name is required"),
  description: Yup.string()
    .min(20, "Description too short")
    .max(6000, "Description too long"),
  locationType: Yup.string().required("Select locationType"),
  region: Yup.string().required("Select region"),
});

const ImagePreviewWithFileInput = ({
  initialImage,
}: ImagePreviewWithFileInputProps) => {
  const { setFieldValue, values } = useFormikContext<CreateLocation>();
  const imageId = useId();
  const [locationTypes, setLocationTypes] = useState<LocationType[]>([]);

  let imageUrl = "/location_form_placeholder_image.jpg";
  if (initialImage !== "" && initialImage !== undefined) {
    imageUrl = initialImage;
  }

  const [previewSrc, setPreviewSrc] = useState(imageUrl);

  return (
    <div className={css.ImagePreviewWithFileInput}>
      <div className={css.imageWrapper}>
        <Image
          src={previewSrc}
          alt="Image"
          width={1091}
          height={726}
          className={css.image}
        />
      </div>
      <label htmlFor={imageId} className={css.customLoadImageButton}>
        Завантажити фото
      </label>
      <input
        type="file"
        name="image"
        id={imageId}
        accept="image/*"
        className={css.loadImageInput}
        onChange={(event) => {
          setFieldValue("image", event.currentTarget.files?.[0] ?? null);
          const file = event.currentTarget.files?.[0];
          if (file !== null && file !== undefined) {
            const localUrl = URL.createObjectURL(file);
            setPreviewSrc(localUrl);
          }
        }}
      />
    </div>
  );
};

export default function LocationForm({ location }: LocationFormProps) {
  const fieldId = useId();
  const { draft, setDraft, clearDraft } = useLocationDraftStore();
  const buttonSubmitName =
    location === undefined ? "Зберегти" : "Зберегти зміни";
  const buttonCancelName =
    location === undefined ? "Відмінити" : "Відмінити зміни";
  const [isFieldChanged, setIsFieldChanged] = useState<boolean>(false);
  const [isMutating, setIsMutating] = useState<boolean>(false);
  const router = useRouter();

  const queryClient = useQueryClient();

  const postLocationMutation = useMutation({});

  const updateLocationMutation = useMutation({
    mutationFn: ({
      locationId,
      location,
    }: {
      locationId: string;
      location: UpdateLocationData;
    }) => updateLocation(locationId, location),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["locations", "location"],
        refetchType: "all",
      });
      clearDraft();
      router.push(`/locations/${location?._id}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const initialLocationData = structuredClone(draft);
  const constantValues = structuredClone(initialValues);

  if (location !== undefined) {
    constantValues.image = location.image;
    constantValues.name = location.name;
    constantValues.description = location.description;
    constantValues.locationType = location.locationType;
    constantValues.region = location.region;
  }

  const checkChanges = () => {
    if (
      initialLocationData.image !== draft.image ||
      initialLocationData.name !== draft.name ||
      initialLocationData.description !== draft.description ||
      initialLocationData.locationType !== draft.locationType ||
      initialLocationData.region !== draft.region
    ) {
      setIsFieldChanged(true);
    } else {
      setIsFieldChanged(false);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (
    values: CreateLocation,
    actions: FormikHelpers<CreateLocation>,
  ) => {
    values.name = values.name.trim();
    values.description = values.description.trim();

    if (location !== undefined) {
      try {
        setIsMutating(true);
        await updateLocationMutation.mutateAsync({
          locationId: location._id,
          location: values as UpdateLocationData,
        });
      } finally {
        setIsMutating(false);
      }
    }
    actions.resetForm();
  };

  const handleCancel = () => {
    if (constantValues.image !== undefined && constantValues.image !== null) {
      const image: string = String(constantValues.image);
      setDraft({
        image: image,
        name: constantValues.name,
        description: constantValues.description,
        locationType: constantValues.locationType,
        region: constantValues.region,
      });
    }
  };

  useEffect(() => {
    if (location !== undefined) {
      setDraft({
        image: location.image,
        name: location.name,
        description: location.description,
        locationType: location.locationType,
        region: location.region,
      });
    } else {
      clearDraft();
    }
  }, [location]);

  useEffect((() => {
    // const response = 
  }), []);

  return (
    <Formik<CreateLocation>
      initialValues={draft}
      enableReinitialize
      validationSchema={LocationFormSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        {isMutating && <Spinner />}
        <fieldset className={css.fieldset}>
          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-image`} className={css.label}>
              Обкладинка статті
            </label>
            <ImagePreviewWithFileInput
              key={initialLocationData.image}
              initialImage={initialLocationData.image}
            />
            <ErrorMessage name="image" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-name`} className={css.label}>
              Назва місця
            </label>
            <Field
              type="text"
              name="name"
              id={`${fieldId}-name`}
              onChange={handleChange}
              className={css.field}
            />
            <ErrorMessage name="name" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-locationType`} className={css.label}>
              Тип місця
            </label>
            <Field
              as="select"
              name="locationType"
              id={`${fieldId}-locationType`}
              className={css.select}
            >
              <option value="">Оберіть тип місця</option>
              <option value="istorychne-mistse">Історичне місце</option>
              <option value="ozero">Озеро</option>
              <option value="natsionalnyi-park">Національний парк</option>
            </Field>
            <ErrorMessage
              name="locationType"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label
              htmlFor={`${fieldId}-region`}
              className={`${css.label} ${css.field}`}
            >
              Регіон
            </label>
            <Field
              as="select"
              name="region"
              id={`${fieldId}-region`}
              onChange={handleChange}
              className={css.select}
            >
              <option value="">Оберіть регіон</option>
              <option value="podillya">Поділля</option>
              <option value="halychyna">Галичина</option>
              <option value="poltavshchyna">Полтавщина</option>
            </Field>
            <ErrorMessage
              name="region"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-description`} className={css.label}>
              Детальний опис
            </label>
            <Field
              as="textarea"
              name="description"
              id={`${fieldId}-description`}
              onChange={handleChange}
              rows={5}
              className={css.textarea}
            />
            <ErrorMessage
              name="description"
              component="span"
              className={css.error}
            />
          </div>
        </fieldset>

        <div className={css.buttonsWrapper}>
          <Button type="submit" className={css.button}>
            {buttonSubmitName}
          </Button>
          <Button
            type="button"
            variant="secondary"
            className={css.button}
            onClick={handleCancel}
            disabled={false}
          >
            {buttonCancelName}
          </Button>
        </div>
      </Form>
    </Formik>
  );
}
