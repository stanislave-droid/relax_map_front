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
import { useEffect, useId, useState, useMemo } from "react";
import * as Yup from "yup";
import { Location, UpdateLocationData } from "@/types/location";
import Button from "@/components/ui/Button/Button";
import { useLocationDraftStore } from "@/lib/store/locationStore";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateLocation,
  fetchLocationTypes,
  fetchRegions,
} from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Spinner from "@/components/ui/Spinner/Spinner";
import { LocationType } from "@/types/locationType";
import { Region } from "@/types/region";
import SetMap from "@/components/Map/SetMap";

interface LocationFormProps {
  location?: Location;
}

interface CreateLocation {
  image: string | File | null;
  name: string;
  description: string;
  locationType: string;
  region: string;
}

interface FormButtonsParameters {
  submitButtonName: string;
  cancelButtonName: string;
  onCancel: () => void;
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

const ImagePreviewWithFileInput = () => {
  const { setFieldValue, values } = useFormikContext<CreateLocation>();
  const imageId = useId();

  const previewSrc = useMemo(() => {
    if (values.image instanceof File) {
      return URL.createObjectURL(values.image);
    }
    if (values.image !== "" && values.image !== null && values.image !== undefined) {
      return values.image;
    }
    return "/location_form_placeholder_image.jpg";
  }, [values.image]);

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
          const file = event.currentTarget.files?.[0] ?? null;
          setFieldValue("image", file);
        }}
      />
    </div>
  );
};

function FormButtons({
  submitButtonName,
  cancelButtonName,
  onCancel,
  initialImage,
}: FormButtonsParameters) {
  const { values, isSubmitting, setFieldValue } = useFormikContext<CreateLocation>();

  let submitName = submitButtonName;

  const isAllFieldsFilled =
    values.name.trim() !== "" &&
    values.description.trim() !== "" &&
    values.locationType.trim() !== "" &&
    values.region.trim() !== "" &&
    values.image !== null &&
    values.image !== "";

  if (!isAllFieldsFilled) {
    submitName = "Опублікувати";
  }

  return (
    <div className={css.buttonsWrapper}>
      <Button
        type="submit"
        className={css.button}
        disabled={!isAllFieldsFilled}
      >
        {submitName}
      </Button>
      <Button
        type="button"
        variant="secondary"
        className={css.button}
        onClick={() => {
          onCancel();
          setFieldValue("image", initialImage);
        }}
        disabled={!isAllFieldsFilled || isSubmitting}
      >
        {cancelButtonName}
      </Button>
    </div>
  );
}

export default function LocationForm2({ location }: LocationFormProps) {
  const fieldId = useId();
  const { draft, setDraft, clearDraft } = useLocationDraftStore();
  const buttonSubmitName =
    location === undefined ? "Зберегти" : "Зберегти зміни";
  const buttonCancelName =
    location === undefined ? "Відмінити" : "Відмінити зміни";
  const [isMutating, setIsMutating] = useState<boolean>(false);
  const [locationTypes, setLocationTypes] = useState<LocationType[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const router = useRouter();

  const constantValues = structuredClone(initialValues);

  if (location !== undefined) {
    constantValues.image = location.image;
    constantValues.name = location.name;
    constantValues.description = location.description;
    constantValues.locationType = location.locationType;
    constantValues.region = location.region;
  }

  let constanImage: string = String(constantValues.image);
  if (constantValues.image !== undefined && constantValues.image !== null) {
    constanImage = String(constantValues.image);
  } else {
    constanImage = "";
  }

  const renderLocationTypeOptions = (locationTypes: LocationType[]) => {
    return locationTypes.map((locationType) => (
      <option key={locationType.id} value={locationType.slug}>
        {locationType.name}
      </option>
    ));
  };
  const renderRegionOptions = (regions: Region[]) => {
    return regions.map((region) => (
      <option key={region.id} value={region.slug}>
        {region.name}
      </option>
    ));
  };

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
    } else {
      setDraft({
        image: "",
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

  useEffect(() => {
    async function fetchTypes() {
      const response = await fetchLocationTypes();

      setLocationTypes(response);
    }

    async function getRegions() {
      const response = await fetchRegions();

      setRegions(response);
    }

    fetchTypes();
    getRegions();
  }, []);

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
              key={constanImage}
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
              placeholder="Введіть назву місця"
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
              <option key="locationTypeEmptykey" value="">
                Оберіть тип місця
              </option>
              {renderLocationTypeOptions(locationTypes)}
            </Field>
            <ErrorMessage
              name="locationType"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-region`} className={`${css.label}`}>
              Регіон
            </label>
            <Field
              as="select"
              name="region"
              id={`${fieldId}-region`}
              onChange={handleChange}
              className={css.select}
            >
              <option key="regionEmptykey" value="">
                Оберіть регіон
              </option>
              {renderRegionOptions(regions)}
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
              placeholder="Детальний опис локації"
            />
            <ErrorMessage
              name="description"
              component="span"
              className={css.error}
            />
          </div>
        </fieldset>

        <SetMap setValue={(value) => {}} />

        <FormButtons
          submitButtonName={buttonSubmitName}
          cancelButtonName={buttonCancelName}
          onCancel={handleCancel}
          initialImage={constanImage}
        />
      </Form>
    </Formik>
  );
}
