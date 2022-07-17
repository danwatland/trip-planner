import * as React from 'react';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography
} from '@mui/material';
import { ContentPasteGoOutlined } from '@mui/icons-material';
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

  const handleEdit = (field: keyof TripLocation, value: any): void => {
    setLocation({
      ...location,
      [field]: value
    })
  };

  const handlePasteClick = async () => {
    const contents = await navigator.clipboard.readText();

    const [lat, lng] = contents.replace(' ', '').split(',');
    if (lat && lng) {
      setLocation({
        ...location,
        lat: Number(lat),
        lng: Number(lng)
      });
    }
  };

  const renderDate = (label: string, field: keyof TripLocation): React.ReactElement => (
    <Box display="flex" flexDirection="column" sx={{ mt: 2 }}>
      <DateTimePicker
        value={location[field] || ''}
        label={label}
        onChange={(newValue) => handleEdit(field, newValue)}
        renderInput={(props) => <TextField {...props} />}
      />
    </Box>
  );

  return (
    <>
      <DialogTitle>
        <TextField
          label="Name"
          onChange={(event) => handleEdit('label', event.target.value)}
          value={location.label || ''}
          variant="standard"
          sx={{ input: { fontSize: 'x-large' } }}
        />
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="row" justifyContent="space-between" sx={{ pt: 1, px: 3, width: 348 }}>
          <TextField
            label="Latitude"
            onChange={(event) => handleEdit('lat', event.target.value)}
            type="number"
            sx={{ width: 125 }}
            value={location.lat || ''}
          />
          <TextField
            label="Longitude"
            onChange={(event) => handleEdit('lng', event.target.value)}
            type="number"
            sx={{ width: 125 }}
            value={location.lng || ''}
          />
          <IconButton onClick={handlePasteClick}>
            <ContentPasteGoOutlined />
          </IconButton>
        </Box>
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
  );
};

export default DestinationDetails;