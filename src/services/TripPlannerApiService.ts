import axios from 'axios';

declare const TRIP_PLANNER_API: string;

const getSavedLocations = async (): Promise<TripLocation[]> => {
  const { data } = await axios.get(`${TRIP_PLANNER_API}/locations`);

  return data;
};

const updateLocation = async (location: TripLocation): Promise<void> => {
  await axios.put(`${TRIP_PLANNER_API}/locations`, location);
};

export {
  getSavedLocations,
  updateLocation

};