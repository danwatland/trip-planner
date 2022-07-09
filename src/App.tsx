import * as React from 'react'
import './App.css'
import Map from "./components/Map";
import DestinationList from './components/DestinationList';
import Box from '@mui/material/Box';
import { useLocationStore } from './state/LocationStore';

function App() {
  const getSavedLocations = useLocationStore((state) => state.getSavedLocations);
  const [hoveredLocation, setHoveredLocation] = React.useState<TripLocation | null>(null);

  const handleLocationChange = (location: TripLocation | null) => { setHoveredLocation(location); };

  React.useEffect(() => {
    getSavedLocations();
  }, []);

  return (
    <div className="App">
      <Box display="flex" flexDirection="row">
        <Map focusedLocation={hoveredLocation} />
        <DestinationList onHover={handleLocationChange} />
      </Box>
    </div>
  )
}

export default React.memo(App);
