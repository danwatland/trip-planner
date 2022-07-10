import create from 'zustand';
import { useLocationStore } from './LocationStore';

type MapStore = {
  map: google.maps.Map | null,
  directions: google.maps.DirectionsResult[],
  getDirections: (locations: TripLocation[]) => void,
  setMap: (map: google.maps.Map | null) => void,
};

const useMapStore = create<MapStore>((set, get) => ({
  map: null,
  directions: [],
  setMap: (map) => {
    set({ map })
  },
  getDirections: async (locations) => {
    if (locations.length <= 1 || locations.length === useLocationStore.getState().locations.length) {
      set({ directions: [] });
      return;
    }

    const directionService = new google.maps.DirectionsService();
    const directionRenderer = new google.maps.DirectionsRenderer();
    directionRenderer.setMap(get().map);

    const directions = [];
    for (let i = 0; i < locations.length - 1; i++) {
      const route: google.maps.DirectionsRequest = {
        destination: { lat: locations[i].lat, lng: locations[i].lng },
        origin: { lat: locations[i + 1].lat, lng: locations[i + 1].lng },

        travelMode: google.maps.TravelMode.WALKING
      };

      const result = await directionService.route(route);
      directions.push(result);
    }

    set({ directions });
  }
}));

export {
  useMapStore
};