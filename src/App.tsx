import * as React from 'react'
import './App.css'
import Map from "./components/Map";
import DestinationList from './components/DestinationList';
import Box from '@mui/material/Box';
import { useLocationStore } from './state/LocationStore';
import DayFilter from './components/DayFilter';
import { Typography } from '@mui/material';
import DayInfo from './components/DayInfo';

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
        <div style={{ display: 'inline-block' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="h3">Trip Planner</Typography>
            <DayFilter />
          </Box>
          <div className="trip-planner-divider" />
          <div>
            <Box display="flex" gap={2}>
              <DestinationList onHover={handleLocationChange} />
              <Map focusedLocation={hoveredLocation} />
            </Box>
          </div>
        </div>
        <DayInfo />
      </Box>
    </div>
  )
}

export default React.memo(App);
