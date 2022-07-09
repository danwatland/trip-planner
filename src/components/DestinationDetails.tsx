import * as React from 'react';
import { Box, Typography } from '@mui/material';

type DestinationDetailsProps = {
  location: TripLocation | null
};

const DestinationDetails = (props: DestinationDetailsProps): React.ReactElement => {
  const { location } = props;

  const renderLabelAndValue = (label: string, value?: string | Date): React.ReactElement => (
    <Box display="flex" flexDirection="row">
      <Typography variant="body1" fontWeight="bold">{label}</Typography>
      <Typography variant="body1">{value instanceof Date ? value.toLocaleDateString() : value}</Typography>
    </Box>
  );

  return location ? (
    <Box sx={{ px: 3, pb: 2 }}>
      {renderLabelAndValue('Label', location.label)}
      {renderLabelAndValue('Start Time', location.startDate)}
      {renderLabelAndValue('End Time', location.endDate)}
    </Box>
  ) : <div/>;
};

export default DestinationDetails;