import * as React from 'react';
import { DEFAULT_LOCATION_FILTER, useLocationStore } from '../state/LocationStore';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import getDay from 'date-fns/getDay';
import parseISO from 'date-fns/parseISO';

const DayFilter = () => {
  const setLocationFilter = useLocationStore((state) => state.setLocationFilter);
  const [days, setDays] = React.useState<number[]>([]);

  const handleChange = (event: React.MouseEvent<HTMLElement>, newDays: number[]) => {
    setDays(newDays);

    if (newDays.length === 0) {
      setLocationFilter(DEFAULT_LOCATION_FILTER);
    } else {
      setLocationFilter((location) =>
        Boolean(location.startDate && newDays.includes(getDay(parseISO(location.startDate.toString())))) ||
        Boolean(location.endDate && newDays.includes(getDay(parseISO(location.endDate.toString()))))
      );
    }
  };

  return (
    <ToggleButtonGroup value={days} onChange={handleChange} sx={{ height: 'fit-content', 'button': { backgroundColor: 'white' }, '.Mui-selected': { backgroundColor: '#34b', color: '#efc' } }}>
      <ToggleButton value={0}>Sun</ToggleButton>
      <ToggleButton value={1}>Mon</ToggleButton>
      <ToggleButton value={2}>Tue</ToggleButton>
      <ToggleButton value={3}>Wed</ToggleButton>
      <ToggleButton value={4}>Thu</ToggleButton>
      <ToggleButton value={5}>Fri</ToggleButton>
      <ToggleButton value={6}>Sat</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default DayFilter;