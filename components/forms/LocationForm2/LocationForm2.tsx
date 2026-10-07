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
import { Coordinates, Location, UpdateLocationData } from "@/types/location";
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
import { PlacesResponse } from "@/app/api/map/route";

interface LocationFormProps {
  location?: Location;
}

interface CreateLocation {
  image: string | File | null;
  name: string;
  description: string;
  locationType: string;
  region: string;
  coordinates: Coordinates;
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
  coordinates: {
    lat: 0,
    lon: 0,
  },
};

const LocationFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Назва місця має бути не менше 3 символів")
    .max(96, "Назва місця не повинна перевищувати 96 символів")
    .matches(
      /^[^\s].*[^\s]$/,
      "Spaces at the beginning and end are not allowed",
    )
    .required("Потрібна назва місця"),
  description: Yup.string()
    .min(20, "Детальний опис має бути не менше 20 символів")
    .max(6000, "Детальний опис не повинен перевищувати 96 символів"),
  locationType: Yup.string().required("Виберіть тип місця"),
  region: Yup.string().required("Виберіть регіон"),
});

const ImagePreviewWithFileInput = () => {
  const { setFieldValue, values } = useFormikContext<CreateLocation>();
  const imageId = useId();

  const previewSrc = useMemo(() => {
    if (values.image instanceof File) {
      return URL.createObjectURL(values.image);
    }
    if (
      values.image !== "" &&
      values.image !== null &&
      values.image !== undefined
    ) {
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
  const { values, isSubmitting, setFieldValue } =
    useFormikContext<CreateLocation>();

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
    constantValues.coordinates = location.coordinates;
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

  const handleCoordinatesChange = (newValue: Coordinates) => {
    setDraft({
      ...draft,
      coordinates: { ...newValue },
    });
  };

  const handleSubmit = async (
    values: CreateLocation,
    actions: FormikHelpers<CreateLocation>,
  ) => {
    values.name = values.name.trim();
    values.description = values.description.trim();

    if (
      constantValues.coordinates.lat !== draft.coordinates.lat ||
      constantValues.coordinates.lon !== draft.coordinates.lon
    ) {
      values.coordinates = {
        lat: draft.coordinates.lat,
        lon: draft.coordinates.lon,
      };
    }

    console.log(values);

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
        coordinates: {
          lat: constantValues.coordinates.lat,
          lon: constantValues.coordinates.lon,
        },
      });
    } else {
      setDraft({
        image: "",
        name: constantValues.name,
        description: constantValues.description,
        locationType: constantValues.locationType,
        region: constantValues.region,
        coordinates: {
          lat: constantValues.coordinates.lat,
          lon: constantValues.coordinates.lon,
        },
      });
    }
    setClearMap(true);
  };

  useEffect(() => {
    if (location !== undefined) {
      setDraft({
        image: location.image,
        name: location.name,
        description: location.description,
        locationType: location.locationType,
        region: location.region,
        coordinates: location.coordinates,
      });
    } else {
      clearDraft();
    }
  }, [location]);

  useEffect(() => {
    async function fetchTypes() {
      const response = await fetchLocationTypes();
      const locationTypes = response as LocationType[];
      locationTypes.sort((a, b) => a.name.localeCompare(b.name, 'uk'));

      setLocationTypes(locationTypes);
    }

    async function getRegions() {
      const response = await fetchRegions();
      const regions = response as Region[];
      regions.sort((a, b) => a.name.localeCompare(b.name, 'uk'));

      setRegions(regions);
    }

    fetchTypes();
    getRegions();
  }, []);

  const [clearMap, setClearMap] = useState(false);

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
            <ImagePreviewWithFileInput key={constanImage} />
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

        <SetMap
          getValue={handleCoordinatesChange}
          previousPlace={clearMap ? { lat: 10, lon: 10, name: "" } : undefined}
          onSearch={() => setClearMap(false)}
        />

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
