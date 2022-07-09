import axios from 'axios';

declare const TRIP_PLANNER_API: string;

const getSavedLocations = async () => {
  const { data } = await axios.get(`${TRIP_PLANNER_API}/locations`);

  return data;
};

export {
  getSavedLocations
};