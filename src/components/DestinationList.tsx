import * as React from 'react';
import { TripLocation } from '../Data';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Paper } from '@mui/material';
import { useLocationStore } from '../state/LocationStore';

type DestinationListProps = {
  onHover: (location: TripLocation | null) => void
};

const DestinationList = (props: DestinationListProps): React.ReactElement => {
  const locations = useLocationStore((state) => state.locations);
  const renderDestination = (location: TripLocation): React.ReactElement => (
    <ListItem key={`destination-${location.label}`} className={'destination-list-entry'}>
      <ListItemText primary={location.label} onMouseEnter={() => props.onHover(location)} onMouseLeave={() => props.onHover(null)}/>
    </ListItem>
  );

  return (
    <Box sx={{ ml: 2 }} component={Paper}>
      <List>
        {locations.map(renderDestination)}
      </List>
    </Box>
  );
};

export default DestinationList;