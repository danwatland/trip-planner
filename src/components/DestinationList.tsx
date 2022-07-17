import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Button, Dialog, DialogTitle, Paper } from '@mui/material';
import { useLocationStore } from '../state/LocationStore';
import DestinationDetails from './DestinationDetails';

type DestinationListProps = {
  onHover: (location: TripLocation | null) => void
};

const DestinationList = (props: DestinationListProps): React.ReactElement => {
  const [locations, locationFilter] = useLocationStore((state) => [state.locations, state.locationFilter]);
  const [selectedLocation, setSelectedLocation] = React.useState<TripLocation | null>(null);

  const renderDestination = (location: TripLocation): React.ReactElement => (
    <ListItem key={`destination-${location.label}`} className={'destination-list-entry'} onClick={() => setSelectedLocation(location)} selected={selectedLocation === location}>
      <ListItemText primary={location.label} onMouseEnter={() => props.onHover(location)} onMouseLeave={() => props.onHover(null)}/>
    </ListItem>
  );

  return (
    <Box display="flex" flexDirection="column" sx={{ position: 'relative', width: 250, height: 600 }} component={Paper}>
      <Button sx={{ alignSelf: 'end', pb: 0, width: 50 }} onClick={() => setSelectedLocation({} as TripLocation)}>
        + Add
      </Button>
      <List sx={{ overflowY: 'auto' }}>
        {locations.filter(locationFilter).map(renderDestination)}
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