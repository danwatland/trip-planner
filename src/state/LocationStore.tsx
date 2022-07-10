import create from 'zustand';
import { getSavedLocations, updateLocation } from '../services/TripPlannerApiService';

type LocationStore = {
  locations: TripLocation[],
  locationFilter: (location: TripLocation) => boolean,
  setLocationFilter: (locationFilter: (location: TripLocation) => boolean) => void,
  getSavedLocations: () => void,
  updateLocation: (location: TripLocation) => void
};

const useLocationStore = create<LocationStore>((set, get) => ({
  locations: [],
  locationFilter: () => true,
  setLocationFilter: (locationFilter) => {
    set(() => ({ locationFilter }));
  },
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