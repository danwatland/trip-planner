import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Dialog, DialogTitle, Paper } from '@mui/material';
import { useLocationStore } from '../state/LocationStore';
import DestinationDetails from './DestinationDetails';

type DestinationListProps = {
  onHover: (location: TripLocation | null) => void
};

const DestinationList = (props: DestinationListProps): React.ReactElement => {
  const locations = useLocationStore((state) => state.locations);
  const [selectedLocation, setSelectedLocation] = React.useState<TripLocation | null>(null);

  const renderDestination = (location: TripLocation): React.ReactElement => (
    <ListItem key={`destination-${location.label}`} className={'destination-list-entry'} onClick={() => setSelectedLocation(location)} selected={selectedLocation === location}>
      <ListItemText primary={location.label} onMouseEnter={() => props.onHover(location)} onMouseLeave={() => props.onHover(null)}/>
    </ListItem>
  );

  return (
    <Box sx={{ ml: 2 }} component={Paper}>
      <List>
        {locations.map(renderDestination)}
      </List>
      {selectedLocation &&
          <Dialog open={Boolean(selectedLocation)} onClose={() => setSelectedLocation(null)} maxWidth='xs'
                  fullWidth={true}>
              <DestinationDetails location={selectedLocation} handleClose={() => setSelectedLocation(null)}/>
          </Dialog>
      }
    </Box>
  );
};

export default DestinationList;