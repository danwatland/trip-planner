import axios from 'axios';

const getSavedLocations = async () => {
  const { data } = await axios.get('http://localhost:3001/locations');

  return data;
};

export {
  getSavedLocations
};