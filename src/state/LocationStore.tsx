import create from 'zustand';
import { getSavedLocations, updateLocation } from '../services/TripPlannerApiService';

type LocationStore = {
  locations: TripLocation[],
  locationFilter: (location: TripLocation) => boolean,
  setLocationFilter: (locationFilter: (location: TripLocation) => boolean) => void,
  getSavedLocations: () => void,
  updateLocation: (location: TripLocation) => void
};

const DEFAULT_LOCATION_FILTER = () => true;

const useLocationStore = create<LocationStore>((set, get) => ({
  locations: [],
  locationFilter: DEFAULT_LOCATION_FILTER,
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
  useLocationStore,
  DEFAULT_LOCATION_FILTER,
};