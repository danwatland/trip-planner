import create from 'zustand';
import { DEFAULT_LOCATION_FILTER, useLocationStore } from './LocationStore';

type MapStore = {
  map: google.maps.Map | null,
  directions: google.maps.DirectionsResult | null,
  getDirections: (locations: TripLocation[]) => void,
  setMap: (map: google.maps.Map | null) => void,
};

const useMapStore = create<MapStore>((set, get) => ({
  map: null,
  directions: null,
  setMap: (map) => {
    set({ map })
  },
  getDirections: async (locations) => {
    if (locations.length <= 1 || useLocationStore.getState().locationFilter === DEFAULT_LOCATION_FILTER) {
      set({ directions: null });
      return;
    }

    const directionService = new google.maps.DirectionsService();
    const directionRenderer = new google.maps.DirectionsRenderer();
    directionRenderer.setMap(get().map);

    const route: google.maps.DirectionsRequest = {
      destination: { lat: locations[0].lat, lng: locations[0].lng },
      origin: { lat: locations[locations.length - 1].lat, lng: locations[locations.length - 1].lng },
      travelMode: google.maps.TravelMode.WALKING,
      waypoints: []
    };

    for (let i = 1; i < locations.length - 1; i++) {
      route.waypoints?.push({ location: { lat: locations[i].lat, lng: locations[i].lng } as unknown as google.maps.LatLng, stopover: true });
    }

    const directions = await directionService.route(route);

    set({ directions });
  }
}));

export {
  useMapStore
};