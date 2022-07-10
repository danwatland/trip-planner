import * as React from 'react';
import { Box, Button, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useLocationStore } from '../state/LocationStore';

type DestinationDetailsProps = {
  location: TripLocation,
  handleClose: () => void
};

const DestinationDetails = (props: DestinationDetailsProps): React.ReactElement => {
  const updateLocation = useLocationStore((state) => state.updateLocation);
  const [location, setLocation] = React.useState<TripLocation>({} as TripLocation);

  React.useEffect(() => {
    setLocation(props.location);
  }, [props.location]);

  const handleSave = async () => {
    await updateLocation(location);
    props.handleClose();
  };

  const renderDate = (label: string, field: keyof TripLocation): React.ReactElement => (
    <Box display="flex" flexDirection="column" sx={{ mt: 2 }}>
      <DateTimePicker
        value={location[field] || ''}
        label={label}
        onChange={(newValue) => {
          setLocation({
            ...location,
            [field]: newValue
          })
        }}
        renderInput={(props) => <TextField {...props} />}
      />
    </Box>
  );

  return location ? (
    <>
      <DialogTitle>{location.label}</DialogTitle>
      <DialogContent>
        <Box sx={{ px: 3, pb: 2 }}>
          {renderDate('Start Date', 'startDate')}
          {renderDate('End Date', 'endDate')}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button variant='contained' onClick={handleSave}>Save</Button>
      </DialogActions>
    </>
  ) : <div/>;
};

export default DestinationDetails;