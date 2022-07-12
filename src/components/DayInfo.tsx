import * as React from 'react';
import { useLocationStore } from '../state/LocationStore';
import { useMapStore } from '../state/MapStore';
import { Button, List, ListItem, Paper, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import parseISO from 'date-fns/parseISO';
import isBefore from 'date-fns/isBefore';
import format from 'date-fns/format';
import Box from '@mui/material/Box';

const DayInfo = (): React.ReactElement => {
  const { locations, locationFilter } = useLocationStore();
  const { directions, getDirections } = useMapStore();
  const [selectedStep, setSelectedStep] = React.useState<number>(0);

  React.useEffect(() => {
    getDirections(locations
      .filter(locationFilter)
      .filter((loc) => Boolean(loc.startDate))
      .sort((a, b) => isBefore(parseISO(a.startDate!.toString()), parseISO(b.startDate!.toString())) ? 1 : -1)
    );
  }, [locationFilter]);

  const getTotalDistance = (): string => {
    const totalMeters = directions!.routes[0].legs.reduce((total, routeLeg) => total + routeLeg.distance!.value, 0);

    return totalMeters > 1000 ? `${totalMeters / 1000} km` : `${totalMeters} m`;
  };

  const renderWalkingSteps = (): React.ReactElement => {
    const steps = directions?.routes[0].legs[selectedStep].steps;

    return (
      <List>
        {steps?.map((step, i) => (
          <ListItem key={step.instructions + i}>
            <span dangerouslySetInnerHTML={{ __html: step.instructions }} />
          </ListItem>
        ))}
      </List>
    );
  };

  const renderStepSelector = (): React.ReactElement => (
    <Box display="flex" flexDirection="column" className="step-selector">
      <Typography variant="subtitle1" fontWeight="bold">Steps</Typography>
      <ToggleButtonGroup exclusive onChange={(_, newValue) => setSelectedStep(Number(newValue))} value={selectedStep}>
        {directions?.routes[0].legs.map((leg, i) => (
          <ToggleButton key={leg.start_address} value={i}>
            {i + 1}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );

  const renderStepInfo = (): React.ReactElement => {
    const leg = directions!.routes[0].legs[selectedStep];
    const startLocation = locations.find((loc) => Math.abs(loc.lat - leg.start_location.lat()) < 0.001 && Math.abs(loc.lng - leg.start_location.lng()) < 0.001)!;
    const endLocation = locations.find((loc) => Math.abs(loc.lat - leg.end_location.lat()) < 0.001 && Math.abs(loc.lng - leg.end_location.lng()) < 0.001)!;

    return (
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="body1"><em>{startLocation.label}</em> to <em>{endLocation.label}</em></Typography>
        <Typography variant="body1">{`${format(parseISO(startLocation.startDate!.toString()), 'MM/dd/yy h:mm a')} - ${format(parseISO(startLocation.endDate!.toString()), 'MM/dd/yy h:mm a')}`}</Typography>
        <Typography variant="body1">{`${leg?.distance?.value} m`}</Typography>
      </Box>
    );
  };

  return directions ? (
    <Box display="flex" flexDirection="column" gap={2} sx={{ alignSelf: 'center', ml: 2, p: 2, height: 500, overflowY: 'auto' }} component={Paper}>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Typography variant="body1">Total Distance</Typography>
        <Typography variant="body2">
          {getTotalDistance()}
        </Typography>
      </Box>
      {renderStepSelector()}
      {renderStepInfo()}
      {renderWalkingSteps()}
    </Box>
  ) : <div/>;
};

export default DayInfo;