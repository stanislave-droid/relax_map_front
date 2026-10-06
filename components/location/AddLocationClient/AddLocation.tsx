"use client";

import AddAndEditLocationForm from "@/components/forms/AddAndEditLocationForm/AddAndEditLocationForm";
import { showError } from "@/components/ui/Toast/Toast";
import { createLocation } from "@/lib/api/clientApi";
import { LocationFormValues } from "@/types/locationForm/locationFormValues";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
const createLocationSchema = Yup.object().shape({
  image: Yup.mixed<File>()
    .required("Завантажте фото")
    .test("fileType", "Дозволені тільки JPG та PNG формати", (value) => {
      if (!value) return false;
      return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
    })
    .test("fileSize", "Розмір файлу має бути менше 1 MB", (value) => {
      if (!value) return false;
      return value.size < 1024 * 1024;
    }),
  name: Yup.string()
    .min(3, "Мінімум 3 символи")
    .max(96, "Максимум 96 символів")
    .required("Введіть назву"),
  locationType: Yup.string()
    .max(64, "Максимум 64 символи")
    .required("Оберіть тип місця"),
  region: Yup.string()
    .max(64, "Максимум 64 символи")
    .required("Оберіть регіон"),
  description: Yup.string()
    .min(20, "Мінімум 20 символів")
    .max(6000, "Максимум 6000 символів")
    .required("Введіть опис"),
  coordinates: Yup.object({
    lat: Yup.number().required(),
    lon: Yup.number().required(),
  }),
});

export default function AddLocation() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["location", "create"],
    mutationFn: async (values: LocationFormValues) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("locationType", values.locationType);
      formData.append("region", values.region);
      formData.append("description", values.description);
      if (values.coordinates?.lat != null && values.coordinates?.lon != null) {
        formData.append("coordinates", JSON.stringify(values.coordinates));
      }
      if (values.image instanceof File) {
        formData.append("image", values.image);
      }
      return createLocation(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["locations"],
      });
    },
  });
  const handleSubmit = async (values: LocationFormValues) => {
    try {
      const createdLocation = await mutateAsync(values);
      router.push(`/locations/${createdLocation._id}`);
    } catch {
      showError("Не вдалося створити локацію. Спробуйте ще раз.");
    }
  };

  return (
    <AddAndEditLocationForm
      onSubmit={handleSubmit}
      validationSchema={createLocationSchema}
      isLoading={isPending}
    />
  );
}
