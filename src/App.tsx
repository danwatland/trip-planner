import * as React from 'react'
import './App.css'
import Map from "./components/Map";
import DestinationList from './components/DestinationList';
import Box from '@mui/material/Box';
import { useLocationStore } from './state/LocationStore';
import DayFilter from './components/DayFilter';

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
        <DayFilter />
      </Box>
    </div>
  )
}

export default React.memo(App);
