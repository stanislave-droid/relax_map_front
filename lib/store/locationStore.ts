import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NewLocationData {
  image: string;
  name: string;
  description: string;
  locationType: string;
  region: string;
}

interface LocationDraftStore {
  draft: NewLocationData;
  setDraft: (location: NewLocationData) => void;
  clearDraft: () => void;
}

const initialDraft: NewLocationData = {
  image: "",
  name: "",
  description: "",
  locationType: "istorychne-mistse",
  region: "podillya",
};

export const useLocationDraftStore = create<LocationDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (location) => set(() => ({ draft: location })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: "location-draft",
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
