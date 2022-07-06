import * as React from 'react'
import './App.css'
import {GoogleMap, useJsApiLoader} from "@react-google-maps/api";
import Map from "./components/Map";
import DestinationList from './components/DestinationList';
import { TripLocation } from './Data';
import Box from '@mui/material/Box';

function App() {
  const [hoveredLocation, setHoveredLocation] = React.useState<TripLocation | null>(null);

  const handleLocationChange = (location: TripLocation | null) => { setHoveredLocation(location); };

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
