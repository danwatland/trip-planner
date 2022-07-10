import create from 'zustand';
import { getSavedLocations, updateLocation } from '../services/TripPlannerApiService';

type LocationStore = {
  locations: TripLocation[],
  getSavedLocations: () => void,
  updateLocation: (location: TripLocation) => void
};

const useLocationStore = create<LocationStore>((set, get) => ({
  locations: [],
  getSavedLocations: async () => {
    const locations = await getSavedLocations();

    set(() => ({ locations }));
  },
  updateLocation: async (location) => {
    await updateLocation(location);
  }
}));

export {
  useLocationStore
};