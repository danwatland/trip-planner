import * as React from 'react';
import { useLocationStore } from '../state/LocationStore';
import { useMapStore } from '../state/MapStore';
import { Button, List, ListItem, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';

const DayInfo = (): React.ReactElement => {
  const { locations, locationFilter } = useLocationStore();
  const { directions, getDirections } = useMapStore();
  const [selectedStep, setSelectedStep] = React.useState<number | null>(null);

  React.useEffect(() => {
    getDirections(locations.filter(locationFilter).sort((a, b) => a.startDate > b.startDate ? 1 : -1));
  }, [locationFilter]);

  const getTotalDistance = (): string => {
    const totalMeters = directions.reduce((total, routeLeg) => total + routeLeg.routes[0].legs[0].distance?.value, 0);

    return totalMeters > 1000 ? `${totalMeters / 1000} km` : `${totalMeters} m`;
  };

  const renderStepSelector = (): React.ReactElement => {
    return (
      <Box>
        <Button>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               className="bi bi-chevron-left" viewBox="0 0 16 16">
            <path fillRule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
          </svg>
        </Button>
        {directions.map((_, i) => <Button>{i + 1}</Button>)}
        <Button>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               className="bi bi-chevron-right" viewBox="0 0 16 16">
            <path fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </Button>
      </Box>
    );
  };

  const renderWalkingSteps = (): React.ReactElement => {
    const steps = directions.flatMap((routeLeg) => routeLeg.routes[0].legs[0].steps);

    return (
      <List>
        {steps.map((step, i) => (
          <ListItem key={step.instructions + i}>
            <span dangerouslySetInnerHTML={{ __html: step.instructions }} />
          </ListItem>
        ))}
      </List>
    );
  };

  return directions.length > 0 ? (
    <Paper sx={{ alignSelf: 'center', ml: 2, p: 2 }}>
      <Typography variant="body1">Total Distance</Typography>
      <Typography variant="body2">
        {directions.length > 0 && getTotalDistance()}
      </Typography>
      {renderStepSelector()}
      {renderWalkingSteps()}
    </Paper>
  ) : <div/>;
};

export default DayInfo;