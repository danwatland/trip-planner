import create from 'zustand';
import { getSavedLocations } from '../services/TripPlannerApiService';

type LocationStore = {
  locations: TripLocation[],
  getSavedLocations: () => void,
};

const useLocationStore = create<LocationStore>((set, get) => ({
  locations: [],
  getSavedLocations: async () => {
    const locations = await getSavedLocations();

    set(() => ({ locations }));
  }
}));

export {
  useLocationStore
};